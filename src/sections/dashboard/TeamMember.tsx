import { useEffect, useState } from "react";
import type { Staff } from "../../types/staff";
import { getStaffs } from "../../services/staffService";
import { chunkArray } from "../../utils/chunkArray";
import TeamMemberCardArea from "../../components/team/TeamMemberCardArea";
import TeamMemberCarousel from "../../components/team/TeamMemberCarousel";
import { groupByDepartment } from "../../utils/groupByDepartment";
import "../styles/teamMember.css";

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

  // Grouping Department to Show
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
    }, 5000);
    return () => clearInterval(interval);
  }, [departmentSlides.length]);

  const getNewStaffsSlide = departmentSlides[currentSlideStaff] ?? [];
  // const mapData = getNewStaffsSlide.map((department) => department.department);
  const mapData2 = getNewStaffsSlide[0]?.department ?? "";

  return (
    <section className="teamMember">
      <div className="teamMember-header">
        <h3 className="teamMember-subtitle">Team Member</h3>

        <h2 className="teamMember-title">
          Meet Our Expert {mapData2.charAt(0).toUpperCase() + mapData2.slice(1)}
        </h2>
      </div>

      {/* =============================== CARD AREA =============================== */}
      <div className="teamMember-content">
        <TeamMemberCardArea staff={getNewStaffsSlide} />
        <TeamMemberCarousel
          totalSlides={departmentSlides.length}
          currentSlide={currentSlideStaff}
          setCurrentSlide={setcurrentSlideStaff}
        />
      </div>
    </section>
  );
}
