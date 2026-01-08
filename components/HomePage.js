'use client';

import { useState, useRef } from 'react';
import PostCard from './PostCard';
import PostFilter from './PostFilter';

export default function HomePage({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-10 h-10" role="img" aria-label="Tech tools blog logo">
              <rect width="32" height="32" rx="6" fill="#000"/>
              <rect x="10" y="10" width="12" height="12" fill="#fff"/>
              <rect x="18" y="10" width="4" height="4" fill="#000"/>
            </svg>
          </div>
          
          {/* Back to Portfolio */}
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
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="py-16 md:py-24 px-6 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-100 tracking-wide">
            Posts from a Salesforce developer experimenting with AI workflows, tools, and ideas
          </h1>
          <div className="mt-8 relative">
            {/* Interactive decorative line */}
            <div 
              className="w-24 h-px mx-auto relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(156, 163, 175, ${0.3 + (mousePosition.x / 100) * 0.4}) ${Math.max(0, mousePosition.x - 20)}%, 
                  rgba(59, 130, 246, ${0.6 + (mousePosition.y / 100) * 0.4}) ${mousePosition.x}%, 
                  rgba(156, 163, 175, ${0.3 + (mousePosition.x / 100) * 0.4}) ${Math.min(100, mousePosition.x + 20)}%, 
                  transparent 100%)`
              }}
            >
              {/* Animated glow effect */}
              <div 
                className="absolute top-0 w-2 h-full bg-blue-400/60 blur-sm transition-all duration-300 ease-out"
                style={{
                  left: `${mousePosition.x}%`,
                  transform: 'translateX(-50%)',
                  opacity: mousePosition.x > 0 ? 1 : 0
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Background interactive particles */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}
        />
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
          {/* Footer content removed for cleaner look */}
        </div>
      </footer>
    </div>
  );
}