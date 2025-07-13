// components/CVCarousel.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import CVCard from "./CVCard";

export default function CVCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = gsap.utils.toArray(track.children);
    const cardWidth = (track.children[0] as HTMLElement).offsetWidth;
    const totalWidth = cards.length * (cardWidth + 16); // 16 = gap-4

    // Clone cards for infinite loop illusion
    cards.forEach((card) => {
      const clone = (card as HTMLElement).cloneNode(true);
      track.appendChild(clone);
    });

    // Animate the track
    gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative overflow-hidden py-10 bg-white">
      <div className="w-full overflow-hidden">
        <div ref={trackRef} className="flex gap-4 w-max">
          {/* Cards */}
          <CVCard title="Experience" content={<p>5+ years in development</p>} />
          <CVCard
            title="Skills"
            content={
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Node.js", "GSAP"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            }
          />
          <CVCard title="Projects" content={<p>DreamTourism.IT</p>} />
          <CVCard title="Education" content={<p>BSc in Computer Science</p>} />
          <CVCard
            title="Certifications"
            content={<p>Google UX, Meta Frontend</p>}
          />
        </div>
      </div>
    </div>
  );
}
