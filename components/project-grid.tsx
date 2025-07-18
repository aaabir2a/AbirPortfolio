"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Dream Tourism IT",
    category: "Tourism Platform",
    image: "/project1.png",
    description:
      "Explore, Experience, Wander with Dream Tourism SRLS. Book your dream tours and activities worldwide with Dream Tourism SRLS. Your adventure awaits!",
    year: "2025",
    client: "Dream Tourism SRLS",
    link: "https://dreamtourism.it",
  },
  {
    id: 2,
    title: "Dream Tourism UK",
    category: "Tourism Platform",
    image: "/project2.png",
    description:
      "Welcome to Dream Tourism Limited, registered in England & Wales (Company Number: 14801990).Registered office: 72 Linsdell Road, Barking, England, IG11 7LJ Trading address: Unit 7, 736–740 Romford Road, London, E12 6BT Explore our tours where European elegance meets British charm. Let’s turn your travel dreams into reality. ",
    client: "Dream Tourism SRLS",
    link: "https://dreamtourism.co.uk",
  },
  {
    id: 3,
    title: "Dream Prospects",
    category: "WEB EXPERIENCE",
    image: "/project3.png?height=600&width=800",
    description:
      "Dream Prospects is a leading educational consulting company based in the UK, dedicated to guiding students through their journey from admission to settlement in the world’s most popular study destinations, including the UK, USA, Canada, Australia, China, Malaysia, Denmark, and more.",
    year: "2025",
    client: "Dream Prospects",
    link: "https://dreamprospects.co.uk",
  },
  {
    id: 4,
    title: "BLUEBAY IT",
    category: "Software Firm",
    image: "/project4.png?height=600&width=800",
    description: "Motion identity for documentary film",
    year: "2025",
    client: "BLUEBAYIT",
    link: "https://bluebayit.com",
  },
  {
    id: 5,
    title: "Welcome Diagnostic & Medical Centre",
    category: "EDITORIAL DESIGN",
    image: "/project5.png?height=600&width=800",
    description:
      "Welcome Diagnostic & Medical Center Services with its facilities and services is capable of screening migrant/guest workers and other international travelers from infectious and ...",
    year: "2024",
    client: "PUBLISHING",
    link: "https://welcome-dmc.com/",
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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  // Auto-scroll GSAP loop
  useEffect(() => {
    if (!isActive || !scrollWrapperRef.current) return;

    const wrapper = scrollWrapperRef.current;
    const totalHeight = wrapper.scrollHeight / 2; // Only half because of duplicate

    scrollTween.current = gsap.to(wrapper, {
      y: `-=${totalHeight}`,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      if (scrollTween.current) {
        scrollTween.current.kill();
        scrollTween.current = null;
      }
    };
  }, [isActive]);

  // Mouse follower for floating preview
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!floatingRef.current) return;

      gsap.to(floatingRef.current, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

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

  useEffect(() => {
    const moveImage = (e: MouseEvent) => {
      if (!imageRef.current) return;

      gsap.to(imageRef.current, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, []);

  // Handle project hover
  const handleProjectHover = (projectId: number | null) => {
    setHoveredProject(projectId);

    if (projectId !== null && imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power3.inOut",
      });
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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imagePreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveImage = (e: MouseEvent) => {
      const el = imageRef.current;
      if (!el) return;

      const cardWidth = 600; // You use w-[600px] in the hover card
      const cardHeight = 220; // Approximate height with padding

      const padding = 20;
      let x = e.clientX + padding;
      let y = e.clientY + padding;

      // Clamp to prevent overflow
      if (x + cardWidth > window.innerWidth) {
        x = window.innerWidth - cardWidth - padding;
      }
      if (y + cardHeight > window.innerHeight) {
        y = window.innerHeight - cardHeight - padding;
      }

      gsap.to(el, {
        x,
        y,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, []);

  return (
    <section className="h-screen relative bg-white text-black overflow-hidden">
      {/* Background Image */}
      {/* <div
        ref={imageRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: hoveredProject !== null ? 0.5 : 0,
        }}
      >
        <Image
          src={projects[currentProject]?.image || "/placeholder.svg"}
          alt={projects[currentProject]?.title || "Project"}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div> */}

      {/* Scattered Project Titles */}
      <div ref={containerRef} className="relative h-full w-full">
        {/* {hoveredProject !== null && (
          <div
            ref={imagePreviewRef}
            className="pointer-events-none fixed z-50 transition-opacity duration-300 ease-out"
            style={{
              top: mousePos.y + 20,
              left: mousePos.x + 20,
              opacity: 1,
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "200px",
            }}
          >
            <Image
              src={projects[hoveredProject].image}
              alt={projects[hoveredProject].title}
              fill
              className="object-cover rounded-md shadow-lg"
              sizes="300px"
            />
            <h1>Abir ahmed</h1>
          </div>
        )} */}

        {projects.map((project, index) => {
          const position = getTextPositions(index);
          const isActiveProject = currentProject === index;
          const isHovered = hoveredProject === index;

          return (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-text absolute cursor-pointer select-none"
              style={{
                ...position,
                zIndex: isHovered ? 20 : 10,
                transition: "z-index 0.2s",
              }}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <div
                className={`transition-all duration-500 ease-out ${
                  isActiveProject || isHovered
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
                    <span>{project.link}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div
        ref={imageRef}
        className="fixed z-50 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          transform: "translate(0, 0)",
          opacity: 0,
          scale: 0.95,
        }}
      >
        {hoveredProject !== null && (
          <div className="flex gap-6 bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-gray-200 w-[600px] max-w-[95vw] p-6">
            {/* Larger image section */}
            <div className="relative w-[220px] h-[220px] flex-shrink-0 rounded-xl overflow-hidden">
              <Image
                src={projects[hoveredProject].image}
                alt={projects[hoveredProject].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Slightly narrower text content */}
            <div className="text-[13px] text-black space-y-2 flex flex-col justify-center max-w-[320px]">
              <h4 className="text-xl font-bold leading-tight">
                {projects[hoveredProject].title}
              </h4>
              <p className="text-gray-600 font-medium">
                {projects[hoveredProject].category}
              </p>
              <p className="text-gray-500 leading-snug line-clamp-4 text-sm">
                {projects[hoveredProject].description}
              </p>
              <div className="pt-2 text-xs text-gray-400 font-mono">
                {projects[hoveredProject].year} &nbsp;·&nbsp;{" "}
                {projects[hoveredProject].client} &nbsp;·&nbsp;{" "}
                {projects[hoveredProject].link}
              </div>
            </div>
          </div>
        )}
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
