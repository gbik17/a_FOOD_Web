import { useEffect, useState } from "react";
import type { Staff } from "../types/staff";
import { getStaffs } from "../services/staffService";
import { chunkArray } from "../utils/chunkArray";
import TeamMemberCardArea from "../components/team/TeamMemberCardArea";
import TeamMemberCarousel from "../components/team/TeamMemberCarousel";
import { groupByDepartment } from "../utils/groupByDepartment";

export default function TeamMember() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [currentSlideStaff, setcurrentSlideStaff] = useState(0);

  // Get Data From Service
  useEffect(() => {
    async function loadStaff() {
      const data = await getStaffs();
      setStaff(data);
    }
    loadStaff();
  }, []);

  const groupedStaff = groupByDepartment(staff);

  const ITEM_PER_SLIDE = 4;

  const departmentSlides = Object.values(groupedStaff).flatMap((department) =>
    chunkArray(department, ITEM_PER_SLIDE),
  );

  // create auto slider for the category Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentSlideStaff((prev) => {
        return (prev + 1) % departmentSlides.length;
      });
    }, 100000);
    return () => clearInterval(interval);
  }, [departmentSlides.length]);

  const getNewStaffsSlide = departmentSlides[currentSlideStaff] ?? [];

  return (
    <section className="teamMember">
      {/* =============================== SECTION HEADER =============================== */}
      <header className="teamMember-header">
        <h3 className="teamMember-subtitle">Team Member</h3>

        <h2 className="teamMember-title">Meet Our Expert {}</h2>
      </header>

      {/* =============================== CARD AREA =============================== */}
      <div className="teamMember-content">
        <TeamMemberCardArea staff={getNewStaffsSlide} />
        <TeamMemberCarousel />
      </div>
    </section>
  );
}
