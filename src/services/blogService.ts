import blogs from "../mocks/blogs.json";
import type { Blog } from "../types/blogs";

export async function getBlogs(): Promise<Blog[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blogs as Blog[]);
    }, 500);
  });
}
