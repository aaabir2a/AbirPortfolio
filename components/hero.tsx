"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  goToSection: (index: number) => void;
}

export default function Hero({ goToSection }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const blackSectionRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const titleY = gsap.quickTo(titleRef.current, "y", {
    duration: 0.4,
    ease: "power2.out",
  });
  const subtitleY = gsap.quickTo(subtitleRef.current, "y", {
    duration: 0.4,
    ease: "power2.out",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: 120, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 60, opacity: 0 });
      gsap.set(scrollRef.current, { y: 40, opacity: 0 });
      gsap.set(blackSectionRef.current, { x: "100%" }); // Start off-screen

      // Create main timeline for initial load only
      const tl = gsap.timeline({ delay: 0.8 });

      // Title reveal animation
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Subtitle reveal
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Scroll indicator
      tl.to(
        scrollRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Floating animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: 15,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Handle wheel events on hero section only
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      const momentum = delta * 0.1; // scale it for better feel
      const newProgress = Math.max(0, Math.min(100, scrollProgress + momentum));
      titleY(120 - scrollProgress * 1.2); // parallax: scroll moves title up
      subtitleY(60 - scrollProgress * 0.6); // subtitle moves slower

      setScrollProgress(newProgress);

      // Animate black section based on progress
      gsap.to(blackSectionRef.current, {
        x: `${100 - newProgress}%`,
        duration: 0.15,
        ease: "power2.out",
      });

      // If we've scrolled enough, go to next section
      if (newProgress >= 100 && delta > 0) {
        setTimeout(() => goToSection(1), 500);
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        heroElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [scrollProgress, goToSection]);

  return (
    <section
      ref={heroRef}
      className="h-screen relative overflow-hidden bg-white"
    >
      {/* White Section */}
      <div ref={whiteSectionRef} className="absolute inset-0 bg-white">
        <div className="h-full flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Main Title */}
          <div className="flex-1">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-none tracking-tight text-black"
              >
                Abir Ahmed
              </h1>
            </div>
          </div>

          {/* Description Text */}
          <div className="flex-1 max-w-lg ml-8 md:ml-16">
            <div className="overflow-hidden">
              <p
                ref={subtitleRef}
                className="text-base md:text-lg leading-relaxed text-black font-light"
              >
                We are active across the entire spectrum of creative design and
                digital innovation, from concept to execution, with a focus on
                user experience and visual storytelling. Each of our projects is
                a manifestation of our ability to recognize opportunity and
                unlock its potential with a dedicated approach and tailored
                creative strategy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Black Section - Slides based on scroll only */}
      <div ref={blackSectionRef} className="absolute inset-0 bg-black">
        <div className="h-full flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Main Title - White text on black background */}
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-none tracking-tight text-white">
              full stack software developer
            </h1>
          </div>

          {/* Description Text - White text on black background */}
          <div className="flex-1 max-w-lg ml-8 md:ml-16">
            <p className="text-base md:text-lg leading-relaxed text-white font-light">
              We are active across the entire spectrum of creative design and
              digital innovation, from concept to execution, with a focus on
              user experience and visual storytelling. Each of our projects is a
              manifestation of our ability to recognize opportunity and unlock
              its potential with a dedicated approach and tailored creative
              strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={() => goToSection(1)}
      >
        <div className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors duration-300">
          <span className="text-sm mb-3 font-light tracking-wide">
            SCROLL TO EXPLORE
          </span>
          <div className="w-px h-12 bg-gray-400 mb-3"></div>
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span>SCROLL INTERACTIVE</span>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full z-20">
        <div
          className="h-full bg-black rounded-full transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
}
