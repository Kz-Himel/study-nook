import Image from "next/image";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}
export default Home;