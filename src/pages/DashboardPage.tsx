import Footer from "../components/layout/Footer";
import HeroSection from "../sections/dashboard/HeroSection";
import OurPopularMenu from "../sections/dashboard/OurPopularMenu";
import OurStorySection from "../sections/dashboard/OurStorySection";
import TeamMember from "../sections/dashboard/TeamMember";
import WhyChooseUs from "../sections/dashboard/WhyChooseUs";

export default function DashboardPage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <OurPopularMenu />
      <WhyChooseUs />
      <TeamMember />
      <Footer />
    </>
  );
}
