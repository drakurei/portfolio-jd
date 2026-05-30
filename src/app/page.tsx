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
      </main>
    </>
  );
}
