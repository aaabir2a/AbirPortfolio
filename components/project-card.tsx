"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;

      if (!card || !image || !overlay || !content) return;

      // Set initial states
      gsap.set(overlay, { opacity: 0 });
      gsap.set(content, { y: 20, opacity: 0 });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(content, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="project-card group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/3]">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/70 flex items-center justify-center"
        >
          <div ref={contentRef} className="text-center px-6">
            <span className="text-sm text-purple-400 font-medium">
              {project.category}
            </span>
            <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex items-center justify-center text-purple-400">
              <span className="mr-2">View Project</span>
              <ExternalLink size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
