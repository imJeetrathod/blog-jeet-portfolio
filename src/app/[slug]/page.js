import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../../lib/posts';
import PostContent from '../../../components/PostContent';
import { notFound } from 'next/navigation';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://tech.jeetrathod.vercel.app';

  return {
    title: `${post.title} | AI Experiments & Builds`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: 'Jeet Rathod', url: 'https://jeetrathod.vercel.app' }],
    creator: 'Jeet Rathod',
    publisher: 'Jeet Rathod',
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${post.slug}`,
      siteName: "AI Experiments & Builds",
      type: 'article',
      publishedTime: post.date,
      authors: ['Jeet Rathod'],
      tags: post.tags,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@jeet_rathod',
    },
    alternates: {
      canonical: `${baseUrl}/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (fetch more to show "view more" indicator)
  const relatedPosts = await getRelatedPosts(post, 3);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://tech.jeetrathod.vercel.app/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Jeet Rathod',
      url: 'https://jeetrathod.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: 'Jeet Rathod',
      url: 'https://jeetrathod.vercel.app',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tech.jeetrathod.vercel.app/${post.slug}`,
    },
    keywords: post.tags?.join(', ') || '',
    articleSection: post.category,
    wordCount: 0, // We'll calculate this differently since content is now MDX
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}