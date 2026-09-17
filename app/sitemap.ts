import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://blood-donation-platform-lyart.vercel.app"
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/donors`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/requests`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/donors/register`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faisalabad-blood-donors`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/volunteer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ]
}
