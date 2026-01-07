import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

export default async function sitemap() {
  const posts = await getAllPosts();
  const baseUrl = 'https://tech.jeetrathod.vercel.app';

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postUrls,
  ];
}