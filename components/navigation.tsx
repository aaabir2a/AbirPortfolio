"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import type { HTMLNavElement, HTMLDivElement } from "react";

export default function Navigation() {
  const navRef = useRef<HTMLNavElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-sm"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold">Portfolio</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a
              href="#projects"
              className="hover:text-gray-300 transition-colors"
            >
              Projects
            </a>
            <a href="#about" className="hover:text-gray-300 transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
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
          <a
            href="#home"
            onClick={toggleMenu}
            className="text-xl hover:text-gray-300 transition-colors"
          >
            Home
          </a>
          <a
            href="#projects"
            onClick={toggleMenu}
            className="text-xl hover:text-gray-300 transition-colors"
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={toggleMenu}
            className="text-xl hover:text-gray-300 transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={toggleMenu}
            className="text-xl hover:text-gray-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
