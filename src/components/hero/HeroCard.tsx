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
  );
}
