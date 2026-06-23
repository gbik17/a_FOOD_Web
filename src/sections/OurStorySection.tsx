import { useEffect, useState } from "react";
import type { Blog } from "../types/blogs";
import { getBlogs } from "../services/blogService";
import { chunkArray } from "../utils/chunkArray";
import "../styles/ourStory.css";

export default function OurStorySection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentSlideBlogs, setcurrentSlideBlogs] = useState(0);

  // Get Data from Service
  useEffect(() => {
    async function loadBlogs() {
      const data = await getBlogs();
      setBlogs(data);
    }

    loadBlogs();
  }, []);

  // Filter Blogs Category === Foods for OurStorySection
  const filterBlogsCategory = blogs.filter((blog) => blog.category === "Food");

  const ITEMS_PER_SLIDE = 1;
  const categorySlides = chunkArray(filterBlogsCategory, ITEMS_PER_SLIDE);

  // create auto slider for the Category Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentSlideBlogs((prev) => {
        return (prev + 1) % categorySlides.length;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [categorySlides.length]);

  const getBlogSlide = categorySlides[currentSlideBlogs]?.[0];

  return (
    <section className="ourStory">
      <div className="ourStory-image">
        <img src={getBlogSlide?.image} />
      </div>

      <div className="ourStory-content">
        <h3>Our Story</h3>

        <h2>{getBlogSlide?.title}</h2>

        <p>{getBlogSlide?.excerpt}</p>

        <hr />

        <div className="ourStory-footer">
          <button>Discover More</button>

          <div className="experience">
            <h1>24</h1>

            <div>
              <h3>Years Of</h3>
              <h2>Experience</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
