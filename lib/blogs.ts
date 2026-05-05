import blogsData from '@/content/blogs.json';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const posts: BlogPost[] = blogsData.posts;

export function getAllBlogsSorted(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
