"use client";

import { useState } from "react";
import FullpageScroll from "@/components/fullpage-scroll";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  const goToSection = (index: number) => {
    setCurrentSection(index);
  };

  const sections = [
    <Hero key="hero" goToSection={goToSection} />,
    <ProjectGrid key="project-grid" isActive={currentSection === 1} />,
    <About key="about" isActive={currentSection === 2} />,
    <Contact key="contact" isActive={currentSection === 3} />,
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentSection={currentSection} goToSection={goToSection} />
      <FullpageScroll>{sections}</FullpageScroll>
    </main>
  );
}
