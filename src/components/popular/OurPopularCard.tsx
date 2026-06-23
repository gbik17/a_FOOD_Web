import type { Menu } from "../../types/menu";
import "../../styles/ourPopularCard.css";

type OurPopularCard = {
  menu: Menu;
};

export default function OurPopularCard({ menu }: OurPopularCard) {
  return (
    <div className="ourPopularCard">
      <img src={menu.image} />
      <h3>{menu.name}</h3>
      <p>{menu.description}</p>
    </div>
  );
}
