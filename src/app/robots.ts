import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'], // Keep your Command Center private
    },
    sitemap: 'https://portfolio-rahul-an.vercel.app/sitemap.xml',
  }
}