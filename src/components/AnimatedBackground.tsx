import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isInView = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Colors matching the reference image
    const bgColor = '#110524';
    const gridColor1 = '#25104a'; // dark purple for most grid
    const gridColor2 = '#3f187d'; // slightly lighter purple
    const blobColor = '#5e25b8';  // bright purple blob
    const cyan = '#42f5e8';
    const magenta = '#c724b1';
    const yellow = '#ffb300';

    const gridSize = 16; // Decreased size for smaller grid

    let grid: number[][] = [];
    let cols = 0;
    let rows = 0;

    let blobs: any[] = [];
    let elements: any[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      // Size to parent container instead of window
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      
      cols = Math.ceil(canvas.width / gridSize) + 2;
      rows = Math.ceil(canvas.height / gridSize) + 2;
      
      // Generate grid pattern
      grid = [];
      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          let type = 0;
          const r = Math.random();
          if (r > 0.5) {
            type = 1; // dot
          } else if (r > 0.4) {
            type = 2; // plus
          } else if (r > 0.35) {
            type = 3; // hdash
          } else if (r > 0.3) {
            type = 4; // vdash
          } else if (r > 0.28) {
            type = 5; // hollow square
          }
          grid[i][j] = type;
        }
      }

      // Generate large pixel blobs
      blobs = [
        { x: cols - 2, y: Math.floor(rows / 2), r: 12, color: blobColor, speed: 0.005 }, 
        { x: cols - 1, y: Math.floor(rows / 2) + 18, r: 8, color: gridColor2, speed: 0.003 },
        { x: 1, y: Math.floor(rows / 4), r: 6, color: gridColor2, speed: -0.004 },
        { x: Math.floor(cols / 2), y: rows - 2, r: 10, color: gridColor1, speed: 0.002 }
      ];

      // Generate floating cyan/magenta elements
      elements = [];
      const numElements = Math.floor((canvas.width * canvas.height) / 30000); 
      for (let i = 0; i < Math.max(3, numElements); i++) {
        elements.push({
          x: Math.random() * cols,
          y: Math.random() * rows,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          type: Math.floor(Math.random() * 4), 
          color: Math.random() > 0.7 ? magenta : (Math.random() > 0.8 ? yellow : cyan),
          blinkOffset: Math.random() * Math.PI * 2,
          blinkSpeed: Math.random() * 0.05 + 0.02
        });
      }
    };

    const drawPixelCircle = (cx: number, cy: number, r: number, color: string) => {
      ctx.fillStyle = color;
      for (let i = -r; i <= r; i++) {
        for (let j = -r; j <= r; j++) {
          if (i * i + j * j <= r * r + r * 0.5) {
            ctx.fillRect((cx + i) * gridSize, (cy + j) * gridSize, gridSize, gridSize);
          }
        }
      }
    };

    const drawElement = (el: any) => {
      ctx.fillStyle = el.color;
      const px = Math.floor(el.x) * gridSize;
      const py = Math.floor(el.y) * gridSize;

      const alpha = Math.sin(time * el.blinkSpeed + el.blinkOffset) * 0.4 + 0.6;
      ctx.globalAlpha = alpha;

      ctx.save();
      ctx.translate(px, py);

      const s = 4; // Decreased pixel size for shapes

      if (el.type === 0) {
        ctx.fillRect(-s, -s, s * 3, s * 3);
        ctx.fillRect(-s * 2, 0, s, s);
        ctx.fillRect(s * 2, 0, s, s);
      } else if (el.type === 1) {
        ctx.fillRect(-s, -s*2, s, s*5);
        ctx.fillRect(-s*3, 0, s*5, s);
      } else if (el.type === 2) {
        ctx.fillRect(0, 0, s*2, s*2);
      } else if (el.type === 3) {
        ctx.fillRect(-s*2, -s*2, s*3, s);
        ctx.fillRect(-s*2, -s*2, s, s*4);
        ctx.fillRect(-s*2, s*2, s*3, s);
      }
      
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (isInView.current) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        time++;

        blobs.forEach(blob => {
          const offset = Math.sin(time * blob.speed) * 2;
          drawPixelCircle(Math.floor(blob.x), Math.floor(blob.y + offset), blob.r, blob.color);
        });

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const type = grid[i][j];
            if (type === 0) continue;

            const x = i * gridSize;
            const y = j * gridSize;
            const cx = x + gridSize / 2;
            const cy = y + gridSize / 2;

            const isHighlight = Math.sin(i * 0.5 + j * 0.5 + time * 0.02) > 0.8;
            const isSuperHighlight = Math.sin(i * 1.2 - j * 0.8 - time * 0.05) > 0.95;
            
            if (isSuperHighlight) {
              ctx.fillStyle = gridColor2;
            } else if (isHighlight) {
              ctx.fillStyle = '#2e145c';
            } else {
              ctx.fillStyle = gridColor1;
            }

            const s = 2; // Decreased grid pixel size

            if (type === 1) {
              ctx.fillRect(cx - s/2, cy - s/2, s, s);
            } else if (type === 2) {
              ctx.fillRect(cx - s/2, cy - s*1.5, s, s*3);
              ctx.fillRect(cx - s*1.5, cy - s/2, s*3, s);
            } else if (type === 3) {
              ctx.fillRect(cx - s*1.5, cy - s/2, s*3, s);
            } else if (type === 4) {
              ctx.fillRect(cx - s/2, cy - s*1.5, s, s*3);
            } else if (type === 5) {
              ctx.fillRect(cx - s, cy - s, s*2, s);
              ctx.fillRect(cx - s, cy + s, s*2, s);
              ctx.fillRect(cx - s, cy - s, s, s*3);
              ctx.fillRect(cx + s, cy - s, s, s*3);
            }
          }
        }

        elements.forEach(el => {
          el.x += el.vx;
          el.y += el.vy;

          if (el.x < -5) el.x = cols + 5;
          if (el.x > cols + 5) el.x = -5;
          if (el.y < -5) el.y = rows + 5;
          if (el.y > rows + 5) el.y = -5;

          drawElement(el);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AnimatedBackground;
