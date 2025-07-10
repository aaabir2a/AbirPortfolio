"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./project-card";

gsap.registerPlugin(ScrollTrigger);

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

export default function ProjectGrid() {
  const gridRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
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
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
