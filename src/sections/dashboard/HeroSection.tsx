import { useEffect, useState } from "react";
import HeroCarousel from "../../components/hero/HeroCarousel";
import HeroDashboard from "../../components/hero/HeroDashboard";
import { Link } from "react-router";
import type { Menu } from "../../types/menu";
import { getMenus } from "../../services/menuService";
import "../styles/heroSection.css";
import { chunkArray } from "../../utils/chunkArray";
import HeroCardArea from "../../components/hero/HeroCardArea";

export default function HeroSection() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [currentSLide, setCurrentSlide] = useState(0);
  const [currentSLideFeatured, setCurrentSlideFeatured] = useState(0);

  // get getMenu() from ./service
  useEffect(() => {
    async function loadMenus() {
      const data = await getMenus();
      setMenus(data);
    }

    loadMenus();
  }, []);

  // Filter data tag : "recomend" for card area
  const recommendMenus = menus.filter((menu) => menu.tag === "recommend");

  // Filter data tag : "recomend" for card area
  const featuredMenus = menus.filter((menu) => menu.tag === "featured");

  /* Split filtered menu data tag "recommend" into dynamic slide blocks 
  (4 items per slide) using utils chunkArray() */
  const ITEMS_PER_SLIDE = 4;
  const slides = chunkArray(recommendMenus, ITEMS_PER_SLIDE);

  /* Split filtered menu data tag "recommend" into dynamic slide blocks 
  (1 items per slide) using utils chunkArray() */
  const ITEMS_PER_SLIDE_2 = 1;
  const slides2 = chunkArray(featuredMenus, ITEMS_PER_SLIDE_2);

  // create auto slider for the slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideFeatured((prev) => {
        return (prev + 1) % slides2.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [slides2.length]);

  return (
    <section className="hero-container">
      <aside className="hero-left-bar">
        <div className="socialSideBar">
          <Link to={""}>facebook</Link>
          <Link to={""}>instagram</Link>
          <Link to={""}>linkedin</Link>
        </div>
      </aside>

      <div className="hero-mid-bar">
        <HeroDashboard menu={slides2[currentSLideFeatured]?.[0]} />
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
