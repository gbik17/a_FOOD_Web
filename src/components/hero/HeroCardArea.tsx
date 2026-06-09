import HeroCard from "./HeroCard";
import type { Menu } from "../../types/menu";

type HeroCardAreaProps = {
  menus: Menu[];
};

export default function HeroCardArea({ menus }: HeroCardAreaProps) {
  return (
    <div className="hero-mid-HeroCardArea">
      {menus.map((menu) => (
        <HeroCard key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
