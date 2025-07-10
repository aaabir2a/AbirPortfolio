"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year?: string;
  client?: string;
}

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onHover?: (isHovered: boolean) => void;
}

export default function ProjectCard({
  project,
  isActive = false,
  onHover,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const image = imageRef.current;
      const text = textRef.current;

      if (!card || !image || !text) return;

      const handleMouseEnter = () => {
        onHover?.(true);
        gsap.to(image, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        gsap.to(text, { y: -10, duration: 0.3, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        onHover?.(false);
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(text, { y: 0, duration: 0.3, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [onHover]);

  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div ref={textRef} className="mt-4">
        <div className="text-xs text-gray-500 mb-1">{project.category}</div>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
        {project.year && project.client && (
          <div className="flex gap-4 text-xs text-gray-400">
            <span>{project.year}</span>
            <span>{project.client}</span>
          </div>
        )}
      </div>
    </div>
  );
}
