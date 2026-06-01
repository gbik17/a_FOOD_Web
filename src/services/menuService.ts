import menus from "../mocks/menu.json";
import type { Menu } from "../types/menu";

export async function getMenus(): Promise<Menu[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menus as Menu[]);
    }, 500);
  });
}
