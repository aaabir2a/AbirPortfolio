"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ProjectCard from "./project-card";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Design",
    image: "/placeholder.svg?height=400&width=600",
    description: "A modern e-commerce platform with seamless user experience",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "UI/UX Design",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Intuitive mobile banking application with advanced security features",
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    image: "/placeholder.svg?height=400&width=600",
    description: "Complete brand identity design for a tech startup",
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Web Design",
    image: "/placeholder.svg?height=400&width=600",
    description: "Data visualization dashboard for business analytics",
  },
  {
    id: 5,
    title: "Food Delivery App",
    category: "Mobile Design",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "User-friendly food delivery application with real-time tracking",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Web Design",
    image: "/placeholder.svg?height=400&width=600",
    description: "Creative portfolio website for a digital artist",
  },
];

interface ProjectGridProps {
  isActive: boolean;
}

export default function ProjectGrid({ isActive }: ProjectGridProps) {
  const gridRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      );

      // Animate project cards
      const cards = gridRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5 + index * 0.1,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={gridRef}
      className="h-screen py-20 px-6 overflow-y-auto bg-gray-900"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold text-center mb-8 flex-shrink-0"
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 content-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
