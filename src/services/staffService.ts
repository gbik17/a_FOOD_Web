import staffs from "../mocks/staff.json";

export async function getMenus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(staffs);
    }, 500);
  });
}
