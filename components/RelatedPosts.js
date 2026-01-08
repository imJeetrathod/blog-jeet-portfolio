import Link from 'next/link';
import { formatRelativeTime } from '../lib/dateUtils';

const categoryColors = {
  ai: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  salesforce: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  builds: 'bg-green-500/20 text-green-300 border-green-500/30',
  random: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const categoryLabels = {
  ai: 'AI',
  salesforce: 'Salesforce',
  builds: 'Builds',
  random: 'Random',
};

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const mainPost = posts[0]; // Show only the first (most related) post
  const hasMorePosts = posts.length > 1;

  return (
    <section className="mt-16 pt-8 border-t border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Related Post</h3>
      
      {/* Main Related Post */}
      <Link 
        href={`/${mainPost.slug}`}
        className="block group"
      >
        <article className="p-4 rounded-lg border border-gray-800/50 bg-gray-900/20 hover:bg-gray-900/40 transition-all duration-200 hover:border-gray-700/60">
          {/* Category and Date */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[mainPost.category]}`}>
              {categoryLabels[mainPost.category]}
            </span>
            <time className="text-xs text-gray-500">
              {formatRelativeTime(mainPost.date)}
            </time>
            <span className="text-xs text-gray-500">
              {mainPost.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-medium text-white mb-2 group-hover:text-gray-100 transition-colors line-clamp-2">
            {mainPost.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {mainPost.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {mainPost.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="text-xs text-gray-500 bg-gray-800/40 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {mainPost.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{mainPost.tags.length - 3}
              </span>
            )}
          </div>

          {/* Read More Indicator */}
          <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
            <span>Read more</span>
            <svg 
              className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </article>
      </Link>

      {/* View More Indicator */}
      {hasMorePosts && (
        <div className="mt-4 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-300 transition-colors group"
          >
            <span>View more posts</span>
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}