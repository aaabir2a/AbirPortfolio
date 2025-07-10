"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="About me"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate designer with over 5 years of experience creating
              digital experiences that combine aesthetic appeal with functional
              design. My work spans across web design, mobile applications, and
              brand identity.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I believe in the power of good design to solve problems and create
              meaningful connections between brands and their audiences. Every
              project is an opportunity to push creative boundaries while
              maintaining usability and accessibility.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Skills</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>UI/UX Design</li>
                  <li>Web Development</li>
                  <li>Brand Identity</li>
                  <li>Mobile Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Tools</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                  <li>React & Next.js</li>
                  <li>GSAP</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
