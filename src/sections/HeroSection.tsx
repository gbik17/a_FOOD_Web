import HeroCarausel from "../components/hero/HeroCarausel";
import HeroCard from "../components/hero/HeroCard";
import HeroDashboard from "../components/hero/HeroDashboard";
import "../styles/heroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-container">
      <aside className="hero-left-bar"></aside>
      <div className="hero-mid-bar">
        <HeroDashboard />
        <HeroCard />
        <HeroCarausel />
      </div>
      <aside className="hero-right-bar"></aside>
    </section>
  );
}
