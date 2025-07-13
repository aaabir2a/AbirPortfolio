"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Download, Menu, X } from "lucide-react";

interface NavigationProps {
  currentSection: number;
  goToSection: (index: number) => void;
}

export default function Navigation({ currentSection }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: "Home", index: 0 },
    { name: "Projects", index: 1 },
    { name: "About", index: 2 },
    { name: "CV", index: 3 },
    { name: "Contact", index: 4 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  const handleNavClick = (index: number) => {
    // Use the global goToSection function
    if ((window as any).goToSection) {
      (window as any).goToSection(index);
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleDownloadCV = () => {
    // Create a temporary link to download CV
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // You would place your actual CV PDF in the public folder
    link.download = "AbirAhmed.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] p-6 bg-black/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => handleNavClick(0)}
          >
            Abir Ahmed
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.index}
                onClick={() => handleNavClick(section.index)}
                className={`transition-colors duration-300 ${
                  currentSection === section.index
                    ? "text-purple-400 font-semibold"
                    : "text-white hover:text-purple-300"
                }`}
              >
                {section.name}
              </button>
            ))}

            {/* Download CV Button */}
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
            >
              <Download size={16} />
              Download CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-sm z-[90] md:hidden transform translate-x-full"
      >
        <div className="flex flex-col pt-20 px-6 space-y-6">
          {sections.map((section) => (
            <button
              key={section.index}
              onClick={() => handleNavClick(section.index)}
              className={`text-xl text-left transition-colors duration-300 ${
                currentSection === section.index
                  ? "text-purple-400 font-semibold"
                  : "text-white hover:text-purple-300"
              }`}
            >
              {section.name}
            </button>
          ))}

          {/* Mobile Download CV Button */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-4 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium text-left"
          >
            <Download size={16} />
            Download CV
          </button>
        </div>
      </div>
    </>
  );
}
