
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { Search, Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  // Sample blog posts data with high-quality images
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Business",
      slug: "future-of-ai",
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Discover how AI is revolutionizing businesses and what to expect in the coming years as technology continues to evolve.",
      categories: [
        { id: "tech", slug: "tech", name: "Technology" },
        { id: "ai", slug: "ai", name: "AI" },
      ],
      featured: true,
      author: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      publishedAt: "2024-03-23T12:00:00Z",
      readTime: 5,
    },
    {
      id: 2,
      title: "Mastering React in 2024: Best Practices",
      slug: "mastering-react",
      coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "A complete guide to mastering React and its ecosystem with practical tips and real-world examples.",
      categories: [
        { id: "frontend", slug: "frontend", name: "Frontend" },
        { id: "react", slug: "react", name: "React" },
      ],
      author: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      publishedAt: "2024-03-20T09:30:00Z",
      readTime: 8,
    },
    {
      id: 3,
      title: "Designing for Accessibility: A Practical Guide",
      slug: "accessibility-guide",
      coverImage: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Learn how to create inclusive digital experiences that work for everyone, regardless of abilities.",
      categories: [
        { id: "design", slug: "design", name: "Design" },
        { id: "accessibility", slug: "accessibility", name: "Accessibility" },
      ],
      author: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      publishedAt: "2024-03-18T14:15:00Z",
      readTime: 6,
    },
    {
      id: 4,
      title: "The Ultimate Guide to CSS Grid Layout",
      slug: "css-grid-guide",
      coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Master CSS Grid Layout with practical examples and learn how to create complex layouts with ease.",
      categories: [
        { id: "frontend", slug: "frontend", name: "Frontend" },
        { id: "css", slug: "css", name: "CSS" },
      ],
      author: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      publishedAt: "2024-03-15T10:45:00Z",
      readTime: 7,
    },
    {
      id: 5,
      title: "Building Scalable Node.js Applications",
      slug: "scalable-nodejs",
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "Learn architecture patterns and best practices for building Node.js applications that can scale to millions of users.",
      categories: [
        { id: "backend", slug: "backend", name: "Backend" },
        { id: "nodejs", slug: "nodejs", name: "Node.js" },
      ],
      author: {
        name: "Sarah Lee",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      publishedAt: "2024-03-12T08:30:00Z",
      readTime: 9,
    },
    {
      id: 6,
      title: "Introduction to TypeScript for JavaScript Developers",
      slug: "typescript-intro",
      coverImage: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      excerpt: "A gentle introduction to TypeScript for JavaScript developers with practical code examples.",
      categories: [
        { id: "typescript", slug: "typescript", name: "TypeScript" },
        { id: "javascript", slug: "javascript", name: "JavaScript" },
      ],
      author: {
        name: "David Wilson",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
      publishedAt: "2024-03-10T11:20:00Z",
      readTime: 6,
    },
  ];

  // Extract unique categories from blog posts
  const uniqueCategories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories.map((cat) => JSON.stringify(cat))))
  ).map((cat) => JSON.parse(cat));

  const categories = [
    { id: "all", slug: null, name: "All" },
    ...uniqueCategories,
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on selected category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory
      ? post.categories.some(category => category.slug === selectedCategory)
      : true;
   
    const matchesSearch = searchQuery.trim() === ""
      ? true
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
       
    return matchesCategory && matchesSearch;
  });

  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="header-container">
          <h1>The Coding Chronicles</h1>
          <p>Exploring design, technology, and the spaces in between</p>
          <Link to="/" className="logo-link">Back to Home</Link>
        </div>
      </header>
     
      <main className="blog-content">
        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
         
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* Featured Post (if any) */}
        {!isLoading && featuredPost && (
          <article className="featured-post">
            <div className="featured-image-container">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="blog-image"
              />
            </div>
            <div className="featured-content">
              <div className="featured-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Featured Article
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="blog-excerpt">{featuredPost.excerpt}</p>
              <div className="blog-meta">
                <div className="blog-author">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="author-avatar"
                  />
                  <span className="author-name">{featuredPost.author.name}</span>
                </div>
                <div className="blog-details">
                  <span className="blog-date">
                    <Calendar size={14} />
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>·</span>
                  <span className="blog-read-time">
                    <Clock size={14} />
                    {featuredPost.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="blog-grid">
          {isLoading ? (
            // Skeleton loading UI
            Array(6).fill().map((_, index) => (
              <article key={index} className="blog-card skeleton">
                <div className="skeleton-image"></div>
                <div className="blog-card-content">
                  <div className="skeleton-category"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-excerpt"></div>
                  <div className="skeleton-meta"></div>
                </div>
              </article>
            ))
          ) : (
            filteredPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-link">
                  <div className="blog-image-container">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="blog-image"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-categories">
                      {post.categories.map((category) => (
                        <span key={category.id} className="blog-category">
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <div className="blog-author">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="author-avatar"
                        />
                        <span className="author-name">{post.author.name}</span>
                      </div>
                      <div className="blog-details">
                        <span className="blog-date">
                          <Calendar size={14} />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span>·</span>
                        <span className="blog-read-time">
                          <Clock size={14} />
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-description">Subscribe to our newsletter for the latest articles, tips, and insights delivered straight to your inbox.</p>
          
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Blog;