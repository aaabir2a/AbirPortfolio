"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Download, Eye, FileText } from "lucide-react";
import CVCarousel from "./CVCarousel";

interface CVPreviewProps {
  isActive: boolean;
}

export default function CVPreview({ isActive }: CVPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const blackSectionRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { y: 120, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 60, opacity: 0 });
      gsap.set(previewRef.current, { y: 100, opacity: 0 });
      gsap.set(buttonsRef.current, { y: 40, opacity: 0 });

      // Create timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Title reveal animation
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.4,
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

      // Preview section
      tl.to(
        previewRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Buttons
      tl.to(
        buttonsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Sliding animation between black and white sections
      const slideAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
      slideAnimation
        .to(blackSectionRef.current, {
          x: "0%",
          duration: 3,
          ease: "power2.inOut",
        })
        .to(blackSectionRef.current, {
          x: "100%",
          duration: 3,
          ease: "power2.inOut",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "AbirAhmed.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewCV = () => {
    window.open("/cv.pdf", "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden bg-white"
    >
      {/* White Section */}
      <div ref={whiteSectionRef} className="absolute inset-0 bg-white">
        <div className="h-full flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Main Content */}
          <div className="flex-1">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-[8rem] font-bold leading-none tracking-tight text-black"
              >
                My Resume
              </h1>
            </div>

            <div className="overflow-hidden mt-8">
              <p
                ref={subtitleRef}
                className="text-base md:text-lg leading-relaxed text-black font-light max-w-2xl"
              >
                Explore my professional journey, skills, and achievements.
                Download or preview my comprehensive CV to learn more about my
                experience in design and development.
              </p>
            </div>

            {/* Action Buttons */}
            <div ref={buttonsRef} className="mt-12 flex flex-wrap gap-6">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-medium text-lg group"
              >
                <Download
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Download CV
              </button>

              <button
                onClick={handlePreviewCV}
                className="flex items-center gap-3 px-8 py-4 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 font-medium text-lg group"
              >
                <Eye
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Preview CV
              </button>
            </div>
          </div>

          {/* CV Preview Card */}
          <div ref={previewRef} className="flex-1 max-w-lg ml-8 md:ml-16">
            <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              {/* Carousel Section */}
              <div className="w-full mt-12">
                <CVCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Section - Slides over white section */}
      <div
        ref={blackSectionRef}
        className="absolute inset-0 bg-black transform translate-x-full"
      >
        <div className="h-full flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Main Content - White text on black background */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-none tracking-tight text-white">
              My Resume
            </h3>

            <p className="text-base md:text-lg leading-relaxed text-white font-light max-w-2xl mt-8">
              Explore my professional journey, skills, and achievements.
              Download or preview my comprehensive CV to learn more about my
              experience in design and development.
            </p>

            {/* Action Buttons - Inverted colors */}
            <div className="mt-12 flex flex-wrap gap-6">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-medium text-lg group"
              >
                <Download
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Download CV
              </button>

              <button
                onClick={handlePreviewCV}
                className="flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium text-lg group"
              >
                <Eye
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Preview CV
              </button>
            </div>
          </div>

          {/* CV Preview Card - Dark version */}
          <div className="flex-1 max-w-lg ml-8 md:ml-16">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 border border-gray-700">
              {/* Carousel Section */}
              <div className="w-full mt-12">
                <CVCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span>CV PREVIEW</span>
        </div>
      </div>
    </section>
  );
}
