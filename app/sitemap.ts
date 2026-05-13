import type { MetadataRoute } from 'next';
import { getAllBlogsSorted } from '@/lib/blogs';

const BASE = 'https://www.duckbookwriters.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/book-to-video`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/books`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/authors`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/news`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/careers`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/terms`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/privacy`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/cancellation`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllBlogsSorted().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
