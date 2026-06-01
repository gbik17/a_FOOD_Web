import staffs from "../mocks/staff.json";
import type { Staff } from "../types/staff";

export async function getStaffs(): Promise<Staff[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staffs as Staff[]);
    }, 500);
  });
}
