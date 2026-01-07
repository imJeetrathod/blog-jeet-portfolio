import { getAllPosts } from '../../lib/posts';
import HomePage from '../../components/HomePage';

export const metadata = {
  title: "AI Experiments & Builds",
  description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
  keywords: ["AI tools", "Salesforce", "AI experiments", "vibe coding", "AI-powered solutions"],
  authors: [{ name: "Jeet Rathod", url: "https://jeetrathod.vercel.app" }],
  creator: "Jeet Rathod",
  publisher: "Jeet Rathod",
  openGraph: {
    title: "AI Experiments & Builds",
    description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
    url: "https://tech.jeetrathod.vercel.app",
    siteName: "AI Experiments & Builds",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Experiments & Builds",
    description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
    creator: "@jeet_rathod",
  },
  alternates: {
    canonical: "https://tech.jeetrathod.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Page() {
  const posts = await getAllPosts();

  // JSON-LD structured data for the homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: "AI Experiments & Builds",
    description: "A Salesforce developer exploring AI tools, building solutions with AI assistance, and documenting what actually works.",
    url: 'https://tech.jeetrathod.vercel.app',
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
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `https://tech.jeetrathod.vercel.app/${post.slug}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: 'Jeet Rathod',
      },
      keywords: post.tags?.join(', ') || '',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage posts={posts} />
    </>
  );
}