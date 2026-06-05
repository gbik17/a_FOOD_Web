import { useState } from "react";
import "../../styles/heroSection.css";
import type { Menu } from "../../types/menu";

type HeroCardProps = {
  menu: Menu;
};

export default function HeroCard({ menu }: HeroCardProps) {
  return (
    <article className="hero-mid-card">
      <h3>{menu.name}</h3>
      <p>{menu.description}</p>
      <span>${menu.price}</span>
    </article>

    // <div className="hero-mid-card">
    //   {menus.map((menu) => (
    //     <article key={menu.id} className="card-1-api">
    //       <h3>{menu.name}</h3>
    //       <h3>{menu.description}</h3>
    //       <span>${menu.price}</span>
    //     </article>
    //   ))}
    // </div>
  );
}
