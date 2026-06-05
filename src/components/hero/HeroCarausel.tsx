import { useState } from "react";
import "../../styles/heroSection.css";
import type { Menu } from "../../types/menu";
import { chunkArray } from "../../utils/chunkArray";
import HeroCard from "./HeroCard";

type HeroCarauselProps = {
  menus: Menu[];
};

export default function HeroCarausel({ menus }: HeroCarauselProps) {
  const ITEM_PER_SLIDE = 4;
  const [currentSLide, setCurrentSlide] = useState(0);
  const slides = chunkArray(menus, ITEM_PER_SLIDE);

  return (
    <>
      <div className="hero-mid-card">
        {slides[currentSLide]?.map((menu) => (
          <HeroCard key={menu.id} menu={menu} />
        ))}
      </div>

      <div className="hero-mid-carausel">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
