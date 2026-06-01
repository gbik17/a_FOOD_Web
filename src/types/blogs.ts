export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  authorId: number;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  views: number;
};
