import Link from 'next/link';

const categoryColors = {
  ai: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  salesforce: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  builds: 'bg-green-500/10 text-green-400 border-green-500/20',
  random: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const categoryLabels = {
  ai: 'AI',
  salesforce: 'Salesforce',
  builds: 'Builds',
  random: 'Random',
};

export default function PostContent({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post || !post.content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/70 backdrop-blur">
        <div className="max-w-4xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Posts
            </Link>
            <a 
              href="https://jeetrathod.vercel.app" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[720px] mx-auto px-5 py-8">
        {/* Post Header */}
        <header className="mb-8">
          {/* Category and Date */}
          <div className="flex items-center gap-4 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <time className="text-sm text-gray-500">
              {formatDate(post.date)}
            </time>
            <span className="text-sm text-gray-500">
              {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-400">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-gray-800/50 text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Posts
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Jeet Rathod</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}