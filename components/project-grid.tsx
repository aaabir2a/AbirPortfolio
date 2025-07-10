"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "SHINSEUNGBACK KIMYONGHUN",
    category: "INTERACTIVE INSTALLATION",
    image: "/images/project1.png",
    description: "Contemporary art installation exploring digital identity",
    year: "2024",
    client: "GALLERY MODERN",
  },
  {
    id: 2,
    title: "YANG ZZVOL ANABAILAT",
    category: "DIGITAL BRANDING",
    image: "/images/project2.png",
    description: "Brand identity for emerging fashion collective",
    year: "2024",
    client: "FASHION HOUSE",
  },
  {
    id: 3,
    title: "INTERNOSCIA KOLGEN KUROKAWA",
    category: "WEB EXPERIENCE",
    image: "/placeholder.svg?height=600&width=800",
    description: "Immersive web experience for music collective",
    year: "2023",
    client: "MUSIC LABEL",
  },
  {
    id: 4,
    title: "PHILIPPE INTERNOS TESFALDET",
    category: "MOTION GRAPHICS",
    image: "/placeholder.svg?height=600&width=800",
    description: "Motion identity for documentary film",
    year: "2023",
    client: "FILM STUDIO",
  },
  {
    id: 5,
    title: "SNELGROVE LIMBU YANG",
    category: "EDITORIAL DESIGN",
    image: "/placeholder.svg?height=600&width=800",
    description: "Art book design for contemporary artists",
    year: "2024",
    client: "PUBLISHING",
  },
  {
    id: 6,
    title: "Abir Ahmed",
    category: "INTERACTIVE INSTALLATION",
    image: "/images/project1.png",
    description: "Contemporary art installation exploring digital identity",
    year: "2024",
    client: "GALLERY MODERN",
  },
];

interface ProjectGridProps {
  isActive: boolean;
}

export default function ProjectGrid({ isActive }: ProjectGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slider functionality
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // Animation when section becomes active
  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.fromTo(
        ".project-text",
        { opacity: 0, y: 50, rotation: 0 },
        {
          opacity: 1,
          y: 0,
          rotation: (i) => (Math.random() - 0.5) * 10, // Random slight rotation
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.3,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  // Handle project hover
  const handleProjectHover = (projectId: number | null) => {
    setHoveredProject(projectId);

    if (projectId !== null) {
      // Pause auto-slider on hover
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentProject(projectId);
    } else {
      // Resume auto-slider when not hovering
      if (isActive) {
        intervalRef.current = setInterval(() => {
          setCurrentProject((prev) => (prev + 1) % projects.length);
        }, 4000);
      }
    }
  };

  const getTextPositions = (index: number) => {
    const positions = [
      { top: "15%", left: "10%", fontSize: "clamp(2rem, 4vw, 4rem)" },
      { top: "25%", right: "15%", fontSize: "clamp(1.5rem, 3vw, 3rem)" },
      { top: "45%", left: "5%", fontSize: "clamp(2.5rem, 5vw, 5rem)" },
      { top: "60%", right: "10%", fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" },
      { top: "80%", left: "20%", fontSize: "clamp(2rem, 4vw, 4rem)" },
    ];
    return positions[index] || positions[0];
  };

  return (
    <section className="h-screen relative bg-white text-black overflow-hidden">
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: hoveredProject !== null ? 0.15 : 0,
        }}
      >
        <Image
          src={projects[currentProject]?.image || "/placeholder.svg"}
          alt={projects[currentProject]?.title || "Project"}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Scattered Project Titles */}
      <div ref={containerRef} className="relative h-full w-full">
        {projects.map((project, index) => {
          const position = getTextPositions(index);
          const isActive = currentProject === index;
          const isHovered = hoveredProject === index;

          return (
            <div
              key={project.id}
              className="project-text absolute cursor-pointer select-none"
              style={{
                ...position,
                transform: `rotate(${(Math.random() - 0.5) * 15}deg)`,
              }}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <div
                className={`transition-all duration-500 ease-out ${
                  isActive || isHovered
                    ? "opacity-100 scale-110"
                    : "opacity-60 scale-100"
                }`}
              >
                <h3
                  className={`font-bold leading-none tracking-tight transition-all duration-300 ${
                    isHovered ? "text-gray-800" : "text-black"
                  }`}
                  style={{ fontSize: position.fontSize }}
                >
                  {project.title}
                </h3>

                {/* Project details that appear on hover */}
                <div
                  className={`mt-2 transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {project.category}
                  </p>
                  <p className="text-xs text-gray-500 max-w-xs">
                    {project.description}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>{project.year}</span>
                    <span>{project.client}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Counter */}
      <div className="absolute bottom-8 left-8 text-sm font-mono">
        <span className="text-2xl font-bold">
          {String(currentProject + 1).padStart(2, "0")}
        </span>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-gray-400">
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentProject(index);
              handleProjectHover(null);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentProject === index ? "bg-black scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Current Project Info */}
      <div className="absolute top-8 right-8 text-right">
        <div className="text-xs text-gray-400 mb-1">CURRENT PROJECT</div>
        <div className="text-sm font-medium">
          {projects[currentProject]?.category}
        </div>
      </div>
    </section>
  );
}
