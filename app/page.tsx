"use client";

import { useState, useCallback } from "react";
import FullpageScroll from "@/components/fullpage-scroll";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import About from "@/components/about";
import Contact from "@/components/contact";
import CVPreview from "@/components/cv-preview";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleSectionChange = useCallback((index: number) => {
    setCurrentSection(index);
  }, []);

  const goToSection = useCallback((index: number) => {
    if ((window as any).goToSection) {
      (window as any).goToSection(index);
    }
  }, []);

  const sections = [
    <Hero key="hero" goToSection={goToSection} />,
    <ProjectGrid key="project-grid" isActive={currentSection === 1} />,
    <About key="about" isActive={currentSection === 2} />,
    <CVPreview key="cv-preview" isActive={currentSection === 3} />,
    <Contact key="contact" isActive={currentSection === 4} />,
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation currentSection={currentSection} goToSection={goToSection} />
      <FullpageScroll onSectionChange={handleSectionChange}>
        {sections}
      </FullpageScroll>
    </main>
  );
}
