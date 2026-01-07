import Link from 'next/link';

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

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/${post.slug}`} className="block group">
      <article className="p-6 rounded-lg border border-gray-800/50 bg-gray-900/20 hover:bg-gray-900/40 transition-all duration-200 hover:border-gray-700/60">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
          <time className="text-sm text-gray-500">
            {formatDate(post.date)}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags and Reading Time */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="text-xs text-gray-500 bg-gray-800/40 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 2} more
              </span>
            )}
          </div>
          
          <span className="text-xs text-gray-500">
            {post.readingTime} min read
          </span>
        </div>

        {/* Read More Indicator */}
        <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
          <span>Read more</span>
          <svg 
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}