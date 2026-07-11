import type { Staff } from "../../types/staff";
import TeamMemberCard from "./TeamMemberCard";
import "../../styles/teamMemberCardArea.css";

type TeamMemberCardArea = {
  staff: Staff[];
};

export default function TeamMemberCardArea({ staff }: TeamMemberCardArea) {
  return (
    <div className="teamMember-list">
      {staff.map((staff) => (
        <TeamMemberCard staff={staff} />
      ))}
    </div>
  );
}
