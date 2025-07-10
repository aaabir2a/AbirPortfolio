"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  currentSection: number;
  goToSection: (index: number) => void;
}

export default function Navigation({
  currentSection,
  goToSection,
}: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: "Home", index: 0 },
    { name: "Projects", index: 1 },
    { name: "About", index: 2 },
    { name: "Contact", index: 3 },
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
    goToSection(index);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-sm"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => goToSection(0)}
          >
            Portfolio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.index}
                onClick={() => handleNavClick(section.index)}
                className={`transition-colors ${
                  currentSection === section.index
                    ? "text-purple-400"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {section.name}
              </button>
            ))}
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
        className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-sm z-40 md:hidden transform translate-x-full"
      >
        <div className="flex flex-col pt-20 px-6 space-y-6">
          {sections.map((section) => (
            <button
              key={section.index}
              onClick={() => handleNavClick(section.index)}
              className={`text-xl text-left transition-colors ${
                currentSection === section.index
                  ? "text-purple-400"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
