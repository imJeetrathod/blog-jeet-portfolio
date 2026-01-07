'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Post Not Found
        </h2>
        <p className="mb-8 text-gray-400">
          The post you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            ← Back to Posts
          </Link>
          <a 
            href="https://jeetrathod.vercel.app"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}