# Content Management Guide

This directory contains all blog posts for the tech blog site. Posts are written in MDX format and automatically included in the site build.

## Adding New Posts

### 1. Create a New MDX File

Create a new file in the `posts/` directory with a descriptive filename:

```
content/posts/your-post-title.mdx
```

**Naming Convention:**
- Use lowercase letters
- Replace spaces with hyphens
- Use descriptive names (the filename becomes the URL slug)
- Examples: `getting-started-with-react.mdx`, `salesforce-integration-tips.mdx`

### 2. Required Frontmatter

Every post MUST include the following frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and post cards (150-160 characters recommended)"
date: "YYYY-MM-DD"
category: "ai" | "salesforce" | "builds" | "random"
tags: ["tag1", "tag2", "tag3"]
---
```

**Field Requirements:**
- `title`: String, required - The post title displayed on the site
- `description`: String, required - Used for SEO meta tags and post cards
- `date`: String, required - ISO date format (YYYY-MM-DD)
- `category`: String, required - Must be one of: `ai`, `salesforce`, `builds`, `random`
- `tags`: Array, optional - Array of strings for categorization

### 3. Content Guidelines

After the frontmatter, write your content using standard Markdown syntax with these enhancements:

#### Supported Elements

- **Headings**: Use `#`, `##`, `###` for structure
- **Code blocks**: Use triple backticks with language specification
- **Inline code**: Use single backticks
- **Images**: Use standard Markdown image syntax
- **Blockquotes**: Use `>` for quotes and callouts
- **Lists**: Both ordered and unordered lists
- **Links**: Standard Markdown link syntax

#### Example Structure

```markdown
---
title: "Your Amazing Post"
description: "Learn how to build amazing things with this comprehensive guide"
date: "2024-01-15"
category: "builds"
tags: ["tutorial", "javascript", "nextjs"]
---

# Your Amazing Post

Brief introduction paragraph that hooks the reader.

## Main Section

Content with **bold text**, *italic text*, and `inline code`.

### Subsection

More detailed content here.

```javascript
// Code example with syntax highlighting
function example() {
  return "Hello, World!";
}
```

> **Tip**: Use blockquotes for important callouts and tips.

## Conclusion

Wrap up your post with key takeaways.

---

*Optional footer note or call-to-action*
```

### 4. Categories Explained

- **ai**: Artificial Intelligence, Machine Learning, Data Science topics
- **salesforce**: Salesforce development, administration, integrations
- **builds**: Development projects, tutorials, technical builds
- **random**: Personal thoughts, career advice, industry observations

### 5. Best Practices

#### Content Quality
- Write clear, engaging introductions
- Use headings to structure your content
- Include code examples when relevant
- Add images to break up text (place in `/public/` directory)
- End with actionable takeaways

#### SEO Optimization
- Write descriptive titles (50-60 characters)
- Craft compelling descriptions (150-160 characters)
- Use relevant tags
- Include internal links to other posts when appropriate

#### Technical Writing
- Explain concepts clearly
- Provide context for code examples
- Use consistent terminology
- Include error handling in code samples

### 6. Deployment

Once you create or update a post:

1. **Commit your changes** to the repository
2. **Push to the main branch**
3. **Vercel automatically rebuilds** the site with your new content
4. **Your post is live** at `tech.jeetrathod.vercel.app`

### 7. Troubleshooting

If your post doesn't appear:

1. **Check frontmatter syntax** - Ensure all required fields are present
2. **Validate date format** - Use YYYY-MM-DD format
3. **Verify category** - Must be one of the four valid categories
4. **Check file extension** - Must be `.mdx`
5. **Review build logs** - Check Vercel deployment logs for errors

### 8. File Organization

```
content/
├── README.md          # This guide
└── posts/
    ├── post-1.mdx
    ├── post-2.mdx
    └── post-3.mdx
```

Keep all posts in the `posts/` directory. The system automatically discovers and processes all `.mdx` files in this location.

---

**Happy writing!** 🚀