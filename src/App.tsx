import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CyberCat from "./components/CyberCat";
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const RobotCompanion = lazy(() => import("./components/RobotCompanion"));

function App() {
  return (
    <div className="bg-[#110524] min-h-screen text-white font-mono selection:bg-neon-magenta selection:text-white relative overflow-x-hidden">
      <CyberCat />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-20" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-20" />}>
          <Contact />
        </Suspense>
      </main>
      <div className="hidden lg:block">
        <Suspense fallback={null}>
          <RobotCompanion />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
