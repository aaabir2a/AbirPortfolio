"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import type React from "react";

interface FullpageScrollProps {
  children: React.ReactNode[];
  onSectionChange: (index: number) => void;
}

export default function FullpageScroll({
  children,
  onSectionChange,
}: FullpageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const totalSections = children.length;

  const goToSection = useCallback(
    (index: number) => {
      if (
        isAnimating ||
        index < 0 ||
        index >= totalSections ||
        index === currentSection
      )
        return;

      setIsAnimating(true);
      const container = containerRef.current;
      const currentSectionEl = sectionsRef.current[currentSection];
      const nextSectionEl = sectionsRef.current[index];

      if (!container || !currentSectionEl || !nextSectionEl) return;

      // Create timeline for smooth transition with fade effects
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSection(index);
          onSectionChange(index);
          setIsAnimating(false);
        },
      });

      // Fade out current section
      tl.to(currentSectionEl, {
        opacity: 0.3,
        duration: 0.4,
        ease: "power2.out",
      });

      // Move container and fade in new section
      tl.to(
        container,
        {
          y: -index * window.innerHeight,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.2"
      ).to(
        nextSectionEl,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Fade back current section to full opacity if needed
      tl.to(currentSectionEl, {
        opacity: 1,
        duration: 0.1,
      });
    },
    [currentSection, isAnimating, totalSections, onSectionChange]
  );

  // Expose goToSection function to parent
  useEffect(() => {
    (window as any).goToSection = goToSection;
    return () => {
      delete (window as any).goToSection;
    };
  }, [goToSection]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      if (e.deltaY > 0) {
        // Scroll down
        goToSection(currentSection + 1);
      } else {
        // Scroll up
        goToSection(currentSection - 1);
      }
    },
    [currentSection, goToSection, isAnimating]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (isAnimating) return;

      touchEndY.current = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY.current;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swipe up - go to next section
          goToSection(currentSection + 1);
        } else {
          // Swipe down - go to previous section
          goToSection(currentSection - 1);
        }
      }
    },
    [currentSection, goToSection, isAnimating]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isAnimating) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          goToSection(currentSection + 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goToSection(currentSection - 1);
          break;
        case "Home":
          e.preventDefault();
          goToSection(0);
          break;
        case "End":
          e.preventDefault();
          goToSection(totalSections - 1);
          break;
      }
    },
    [currentSection, goToSection, isAnimating, totalSections]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent default scrolling
    document.body.style.overflow = "hidden";

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    // Initialize first section
    onSectionChange(0);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
    handleKeyDown,
    onSectionChange,
  ]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div ref={containerRef} className="w-full">
        {children.map((child, index) => (
          <div
            key={`section-${index}`}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className="w-full h-screen flex-shrink-0"
            style={{ opacity: index === 0 ? 1 : 0.3 }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-transparent hover:bg-white/50"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Section Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white/70 text-sm">
        {currentSection + 1} / {totalSections}
      </div>
    </div>
  );
}
