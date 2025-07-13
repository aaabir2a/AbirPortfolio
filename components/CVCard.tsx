// components/CVCard.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface CVCardProps {
  title: string;
  content: React.ReactNode;
  delay?: number;
}

export default function CVCard({ title, content, delay = 0 }: CVCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(cardRef.current, { opacity: 0, y: 50 });
    gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      delay,
      duration: 1,
      ease: "power3.out",
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative group transition-all duration-300 w-[260px] md:w-[300px] h-[380px] shrink-0 rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 hover:z-10 hover:scale-105 cursor-pointer"
    >
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-900">{title}</h4>
        <div className="text-sm text-gray-700">{content}</div>
      </div>
    </div>
  );
}
