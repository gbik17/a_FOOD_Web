import "../../styles/heroSection.css";
import type { Menu } from "../../types/menu";

type HeroCardProps = {
  menu: Menu;
};

export default function HeroCard({ menu }: HeroCardProps) {
  return (
    <article className="hero-mid-HeroCard">
      <div className="card-header">
        <img src={menu.image} />
        <span>${menu.price}</span>
      </div>

      <div className="card-body">
        <p>⭐ {menu.stars}</p>
        <h3>{menu.name}</h3>
        <p>{menu.description}</p>
      </div>
    </article>
  );
}
