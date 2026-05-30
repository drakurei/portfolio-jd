import Loader from "@/components/intro/Loader";
import Hero from "@/components/Hero";
import RoleMarquee from "@/components/RoleMarquee";
import StrategyBento from "@/components/sections/StrategyBento";
import WorkTeaser from "@/components/sections/WorkTeaser";
import FinaleCTA from "@/components/FinaleCTA";
import ContactConsulting from "@/components/ContactConsulting";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <RoleMarquee />
        <StrategyBento />
        <WorkTeaser />
        <FinaleCTA />
        <ContactConsulting />
        <footer className="border-t border-foreground/5 px-6 py-10 text-center font-mono text-xs text-foreground/30">
          © {new Date().getFullYear()} Jonathan Davy · Built with Next.js, GSAP &amp; Lenis
        </footer>
      </main>
    </>
  );
}
