import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";

export const metadata = {
  title: "StudyNook | Home",
  description:
    "Browse and book quiet, private study rooms in your library. List your own room and earn.",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  )
}
export default Home;