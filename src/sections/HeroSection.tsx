import { useEffect, useState } from "react";
import HeroCarousel from "../components/hero/HeroCarousel";
import HeroDashboard from "../components/hero/HeroDashboard";
import type { Menu } from "../types/menu";
import { getMenus } from "../services/menuService";
import "../styles/heroSection.css";
import { chunkArray } from "../utils/chunkArray";
import HeroCardArea from "../components/hero/HeroCardArea";

export default function HeroSection() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [currentSLide, setCurrentSlide] = useState(0);

  // get getMenu() from ./service
  useEffect(() => {
    async function loadMenus() {
      const data = await getMenus();
      setMenus(data);
    }

    loadMenus();
  }, []);

  // Filter data tag : "recomend" for card dashboard
  const recommendMenus = menus.filter((menu) => menu.tag === "recommend");

  /* Split filtered menu data tag "recommend" into dynamic slide blocks 
  (4 items per slide) using utils chunkArray() */
  const ITEMS_PER_SLIDE = 4;
  const slides = chunkArray(recommendMenus, ITEMS_PER_SLIDE);

  return (
    <section className="hero-container">
      <aside className="hero-left-bar"></aside>

      <div className="hero-mid-bar">
        <HeroDashboard />
        <HeroCardArea menus={slides[currentSLide] ?? []} />
        <HeroCarousel
          totalSlides={slides.length}
          currentSlide={currentSLide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>
      <aside className="hero-right-bar"></aside>
    </section>
  );
}
