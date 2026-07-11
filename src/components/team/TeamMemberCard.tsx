import type { Staff } from "../../types/staff";
import "../../styles/teamMemberCard.css";

type TeamMemberCardProps = {
  staff: Staff;
};

export default function TeamMemberCard({ staff }: TeamMemberCardProps) {
  return (
    <article className="teamCard">
      {/* Photo */}
      <div className="teamCard-image">
        <img src="" />
      </div>

      {/* Content */}
      <div className="teamCard-content">
        <h3 className="teamCard-name">{staff.name}</h3>

        <p className="teamCard-role">{staff.position}</p>
      </div>

      {/* Social */}
      <footer className="teamCard-social">
        <button aria-label="Facebook">FB</button>

        <button aria-label="Twitter">TW</button>

        <button aria-label="Instagram">IG</button>

        <button aria-label="Whatsapp">WA</button>
      </footer>
    </article>
  );
}
