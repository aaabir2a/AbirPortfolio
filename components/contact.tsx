"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

interface ContactProps {
  isActive: boolean;
}

export default function Contact({ isActive }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={sectionRef}
      className="h-screen py-20 px-6 bg-black flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-12">
          Let's Work Together
        </h2>

        <div ref={contentRef} className="space-y-8">
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm always excited to work on new
            projects and collaborate with creative minds. Let's create something
            amazing together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-400">hello@portfolio.com</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-400">New York, NY</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-12">
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
