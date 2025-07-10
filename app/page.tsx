import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import About from "@/components/about";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <ProjectGrid />
      <About />
    </main>
  );
}
