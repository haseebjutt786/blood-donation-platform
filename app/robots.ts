import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard", "/api/"] },
    sitemap: "https://blood-donation-platform-lyart.vercel.app/sitemap.xml",
  }
}
