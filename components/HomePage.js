'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import PostFilter from './PostFilter';

export default function HomePage({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <a 
            href="https://jeetrathod.vercel.app"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-lg md:text-xl text-gray-400">
            Notes from a Salesforce developer experimenting with AI workflows, tools, and ideas
          </h1>
        </div>
      </section>

      {/* Posts Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8 md:mb-12">
            <PostFilter 
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Posts List */}
          <div className="space-y-6 md:space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No posts found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>Built with Next.js and MDX • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}