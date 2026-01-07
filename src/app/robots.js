export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://tech.jeetrathod.vercel.app/sitemap.xml',
  };
}