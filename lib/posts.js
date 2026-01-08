import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Valid categories as defined in requirements
const VALID_CATEGORIES = ['ai', 'salesforce', 'builds', 'random'];

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Validates frontmatter data
 * @param {Object} data - Frontmatter data
 * @param {string} filename - File name for error context
 * @returns {Object} Validation result with isValid and errors
 */
function validateFrontmatter(data, filename) {
  const errors = [];
  
  // Required fields validation
  if (!data.title || typeof data.title !== 'string') {
    errors.push(`Missing or invalid title in ${filename}`);
  }
  
  if (!data.description || typeof data.description !== 'string') {
    errors.push(`Missing or invalid description in ${filename}`);
  }
  
  if (!data.date) {
    errors.push(`Missing date in ${filename}`);
  } else {
    // Validate date format
    const dateObj = new Date(data.date);
    if (isNaN(dateObj.getTime())) {
      errors.push(`Invalid date format in ${filename}. Use YYYY-MM-DD format.`);
    }
  }
  
  if (!data.category) {
    errors.push(`Missing category in ${filename}`);
  } else if (!VALID_CATEGORIES.includes(data.category)) {
    errors.push(`Invalid category "${data.category}" in ${filename}. Valid categories: ${VALID_CATEGORIES.join(', ')}`);
  }
  
  // Tags are optional but should be an array if provided
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push(`Tags must be an array in ${filename}`);
  }
  
  // Author is optional but should have name if provided
  if (data.author && (!data.author.name || typeof data.author.name !== 'string')) {
    errors.push(`Author must have a name field in ${filename}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Gets all MDX files from the posts directory
 * @returns {string[]} Array of filenames
 */
function getPostFilenames() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Parses a single MDX file and returns post data
 * @param {string} filename - The MDX filename
 * @param {boolean} includeContent - Whether to include parsed content
 * @returns {Object|null} Post object or null if invalid
 */
async function parsePost(filename, includeContent = false) {
  try {
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate frontmatter
    const validation = validateFrontmatter(data, filename);
    if (!validation.isValid) {
      console.error('Frontmatter validation errors:', validation.errors);
      return null;
    }
    
    // Generate slug from filename
    const slug = filename.replace(/\.mdx$/, '');
    
    // Calculate reading time
    const stats = readingTime(content);
    
    const postData = {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      readingTime: Math.ceil(stats.minutes),
      author: data.author || {
        name: 'Jeet Rathod',
        url: 'https://jeetrathod.vercel.app'
      }
    };

    // Only parse content if requested (for individual post pages)
    if (includeContent) {
      const htmlContent = marked(content);
      postData.content = htmlContent;
    }
    
    return postData;
  } catch (error) {
    console.error(`Error parsing ${filename}:`, error);
    return null;
  }
}

/**
 * Gets all posts, sorted by date (newest first)
 * @returns {Object[]} Array of post objects
 */
export async function getAllPosts() {
  const filenames = getPostFilenames();
  const posts = [];
  
  for (const filename of filenames) {
    const post = await parsePost(filename, false);
    if (post) {
      posts.push(post);
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Gets a single post by slug with full content
 * @param {string} slug - Post slug
 * @returns {Object|null} Post object or null if not found
 */
export async function getPostBySlug(slug) {
  const filename = `${slug}.mdx`;
  return await parsePost(filename, true);
}

/**
 * Gets posts filtered by category
 * @param {string} category - Category to filter by
 * @returns {Object[]} Array of post objects
 */
export async function getPostsByCategory(category) {
  const allPosts = await getAllPosts();
  
  if (category === 'all') {
    return allPosts;
  }
  
  if (!VALID_CATEGORIES.includes(category)) {
    console.warn(`Invalid category: ${category}`);
    return [];
  }
  
  return allPosts.filter(post => post.category === category);
}

/**
 * Gets all unique categories from posts
 * @returns {string[]} Array of category strings
 */
export function getCategories() {
  return VALID_CATEGORIES;
}

/**
 * Gets post slugs for static generation
 * @returns {string[]} Array of slugs
 */
export async function getPostSlugs() {
  const posts = await getAllPosts();
  return posts.map(post => post.slug);
}

/**
 * Gets related posts based on tags and category similarity
 * @param {Object} currentPost - The current post object
 * @param {number} limit - Maximum number of related posts to return (default: 2)
 * @returns {Object[]} Array of related post objects
 */
export async function getRelatedPosts(currentPost, limit = 2) {
  const allPosts = await getAllPosts();
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  if (otherPosts.length === 0) {
    return [];
  }
  
  // Calculate similarity scores for each post
  const postsWithScores = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets high score
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Count matching tags
    const currentTags = currentPost.tags || [];
    const postTags = post.tags || [];
    const matchingTags = currentTags.filter(tag => postTags.includes(tag));
    score += matchingTags.length * 3;
    
    // Slight preference for newer posts (recency bonus)
    const daysDiff = Math.abs(new Date(currentPost.date) - new Date(post.date)) / (1000 * 60 * 60 * 24);
    if (daysDiff < 30) {
      score += 1;
    }
    
    return { ...post, similarityScore: score };
  });
  
  // Sort by similarity score (highest first) and return top results
  return postsWithScores
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit)
    .filter(post => post.similarityScore > 0); // Only return posts with some similarity
}