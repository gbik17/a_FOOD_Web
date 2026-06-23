import type { Menu } from "../../types/menu";
import OurPopularCard from "./OurPopularCard";
import "../../styles/ourPopularCardArea.css";

type OurPopularCardArea = {
  menus: Menu[];
};

export default function OurPopularCardArea({ menus }: OurPopularCardArea) {
  return (
    <div className="ourPopularCardArea">
      {menus.map((menu) => (
        <OurPopularCard key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
