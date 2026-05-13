// Auto-generates robots.txt at https://www.duckbookwriters.com/robots.txt

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: "https://www.duckbookwriters.com/sitemap.xml",
    host: "https://www.duckbookwriters.com",
  };
}
