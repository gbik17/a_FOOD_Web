import { useState } from "react";
import "../../styles/heroSection.css";
import type { Menu } from "../../types/menu";

export default function HeroCard() {
  const [card, setCard] = useState<Menu[]>([]);

  return (
    <div className="hero-mid-card">
      <article className="card-1-api"></article>

      {/* MULAI CODING  DARI SINI, CEK CHAT GPT, SEKARANG INTINYA AMBIL DATA MENUS UNTUK DITAMPILKAN MENJADI CARD DI DASHBOARD HERO SECTION */}
    </div>
  );
}
