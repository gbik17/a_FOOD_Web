import { useEffect, useState } from "react";
import "../styles/whyChooseUs.css";
import type { Menu } from "../types/menu";
import { getMenus } from "../services/menuService";

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

  // Filter Menus Cat
  return (
    <section className="whyChooseUs">
      {/* ===================================================
      TOP CONTENT
      =================================================== */}
      <div className="whyChooseUs-content">
        {/* LEFT IMAGE */}
        <div className="whyChooseUs-image">{/* <img src={} /> */}</div>

        {/* RIGHT CONTENT */}
        <div className="whyChooseUs-details">
          {/* SECTION HEADER */}
          <header className="whyChooseUs-header">
            <h3 className="whyChooseUs-subtitle">Why Choose Us</h3>

            <h2 className="whyChooseUs-title">
              {/* We Provide Best {} From Our Kitchen */}
            </h2>
          </header>

          {/* FEATURE LIST */}
          <div className="whyChooseUs-features">
            {/* FEATURE 1 */}
            <article className="featureCard">
              <div className="featureIcon">🍗</div>

              <div className="featureContent">
                <h3>Fresh Chicken</h3>

                <p>
                  It is a long established fact that a reader will content
                  here', making English.
                </p>
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
          <img src="" alt="Food Dish" />
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
