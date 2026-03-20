import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://outlawcode.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/sign-in', '/sign-up'], // Keep the "Command Center" private
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}