import Navbar from "../layout/Navbar";
import type { Menu } from "../../types/menu";
import "../../styles/heroDashboard.css";

type HeroDashboardProps = {
  menu: Menu | undefined;
};

export default function HeroDashboard({ menu }: HeroDashboardProps) {
  return (
    <div className="hero-mid-dashboard">
      <article className="mainTitleandImage">
        <div className="blockArea">
          <h3>Food Heaven</h3>
          <img src={menu?.image} />
        </div>
      </article>
      <article className="navBar">
        <Navbar />
      </article>
      <article className="heroDashboard">
        <h3 className="hero-subtitle">Welcome</h3>
        <h2 className="hero-title">Taste our Tasty and Juicy {menu?.name}</h2>
        <p className="hero-description">{menu?.description}</p>
        <div className="hero-action">
          <span className="hero-price">${menu?.price}</span>
          <button className="hero-button">Order Now</button>
        </div>
      </article>
    </div>
  );
}
