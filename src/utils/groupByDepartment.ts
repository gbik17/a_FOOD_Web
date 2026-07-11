import type { Staff } from "../types/staff";

export function groupByDepartment(staffs: Staff[]) {
  return staffs.reduce<Record<string, Staff[]>>((groups, staff) => {
    const department = staff.department;

    if (!groups[department]) {
      groups[department] = [];
    }

    groups[department].push(staff);

    return groups;
  }, {});
}
