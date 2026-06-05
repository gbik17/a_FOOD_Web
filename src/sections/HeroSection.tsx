import { useEffect, useState } from "react";
import HeroCarausel from "../components/hero/HeroCarausel";
import HeroCard from "../components/hero/HeroCard";
import HeroDashboard from "../components/hero/HeroDashboard";
import type { Menu } from "../types/menu";
import { getMenus } from "../services/menuService";
import "../styles/heroSection.css";

export default function HeroSection() {
  const [menus, setMenus] = useState<Menu[]>([]);

  // get data from service
  useEffect(() => {
    async function loadMenus() {
      const data = await getMenus();

      setMenus(data);
    }

    loadMenus();
  }, []);

  // Filter data tag : "recomend" for card dashboard
  const recommendMenus = menus.filter((menu) => menu.tag === "recommend");

  return (
    <section className="hero-container">
      <aside className="hero-left-bar"></aside>
      <div className="hero-mid-bar">
        <HeroDashboard />
        {/* <HeroCard  /> */}
        <HeroCarausel menus={recommendMenus} />
      </div>
      <aside className="hero-right-bar"></aside>
    </section>
  );
}
