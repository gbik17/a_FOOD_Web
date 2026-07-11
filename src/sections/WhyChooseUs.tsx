import { useEffect, useState } from "react";
import "../styles/whyChooseUs.css";
import type { Menu } from "../types/menu";
import { getMenus } from "../services/menuService";
import { chunkArray } from "../utils/chunkArray";

export default function WhyChooseUs() {
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

  // Filter Menus Category === new-menu
  const filterMenusNew = menus.filter((menu) => menu.tag === "new-menu");

  const ITEM_PER_SLIDE = 1;
  const newSlides = chunkArray(filterMenusNew, ITEM_PER_SLIDE);

  // create auto slider for the Category Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideMenu((prev) => {
        return (prev + 1) % newSlides.length;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [newSlides.length]);

  const getNewMenusSlide = newSlides[currentSlideMenu]?.[0];

  return (
    <section className="whyChooseUs">
      {/* ===================================================
      TOP CONTENT
      =================================================== */}
      <div className="whyChooseUs-content">
        {/* LEFT IMAGE */}
        <div className="whyChooseUs-image">
          <img src={getNewMenusSlide?.image} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="whyChooseUs-details">
          {/* SECTION HEADER */}
          <header className="whyChooseUs-header">
            <h3 className="whyChooseUs-subtitle">Why Choose Us</h3>

            <h2 className="whyChooseUs-title">
              We Provide Best {getNewMenusSlide?.name} From Our Kitchen
            </h2>
          </header>

          {/* FEATURE LIST */}
          <div className="whyChooseUs-features">
            {/* FEATURE 1 */}
            <article className="featureCard">
              <div className="featureIcon">🍽</div>

              <div className="featureContent">
                <h3>{getNewMenusSlide?.name}</h3>

                <p>{getNewMenusSlide?.description}</p>
              </div>
            </article>

            {/* FEATURE 2 */}
            <article className="featureCard">
              <div className="featureIcon">🕒</div>

              <div className="featureContent">
                <h3>24 Hours Open</h3>

                <p>
                  It is a long established fact that a reader will content
                  here', making English.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ===================================================
      EXPERIENCE BANNER
      =================================================== */}

      <aside className="experienceBanner">
        <div className="experienceBanner-image">
          <img src={getNewMenusSlide?.image} />
        </div>

        <div className="experienceBanner-content">
          <h2>We Have 25+ Year Of Experience, Give Better Quality Results</h2>

          <p>
            It is a long established fact that a reader will be distracted by
            the readable content.
          </p>
        </div>

        <button className="experienceBanner-button">Contact Us</button>
      </aside>
    </section>
  );
}
