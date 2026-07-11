import { useEffect, useState } from "react";
import type { Menu } from "../../types/menu";
import { getMenus } from "../../services/menuService";
import { chunkArray } from "../../utils/chunkArray";
import OurPopularCardArea from "../../components/popular/OurPopularCardArea";
import "../styles/ourPopularMenu.css";

export default function OurPopularMenu() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [currentSlideMenu, setCurrentSlideMenu] = useState(0);

  // Get Data From Service
  useEffect(() => {
    async function loadMenus() {
      const data = await getMenus();
      setMenus(data);
    }
    loadMenus();
  }, []);

  // Filter Menus Category === popular
  const filterMenusPopular = menus.filter((menu) => menu.tag === "popular");

  const ITEMS_PER_SLIDE = 4;
  const popularSlides = chunkArray(filterMenusPopular, ITEMS_PER_SLIDE);

  return (
    <section className="popularMenu">
      <div className="popularMenu-header">
        <h3>Our Popular Menu</h3>
        <h2>Want To Eat ?</h2>
      </div>

      <div className="popularCardArea">
        {/* buttom Previeous */}
        <button
          className="menuArrowPreviews"
          onClick={() =>
            setCurrentSlideMenu((prev) =>
              prev === 0 ? popularSlides.length - 1 : prev - 1,
            )
          }
        >
          ❮
        </button>

        <div className="menuCategory">
          <OurPopularCardArea menus={popularSlides[currentSlideMenu] ?? []} />
        </div>

        {/* Button Next */}
        <button
          className="menuArrowNext"
          onClick={() =>
            setCurrentSlideMenu((prev) => (prev + 1) % popularSlides.length)
          }
        >
          ❯
        </button>
      </div>
    </section>
  );
}
