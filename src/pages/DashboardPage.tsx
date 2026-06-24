import HeroSection from "../sections/HeroSection";
import OurPopularMenu from "../sections/OurPopularMenu";
import OurStorySection from "../sections/OurStorySection";
import WhyChooseUs from "../sections/WhyChooseUs";

export default function DashboardPage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <OurPopularMenu />
      <WhyChooseUs />
    </>
  );
}
