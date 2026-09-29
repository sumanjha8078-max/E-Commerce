import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/out/', '/alerts', '/search'],
    },
    sitemap: 'https://greedycart.vercel.app/sitemap.xml',
  };
}
