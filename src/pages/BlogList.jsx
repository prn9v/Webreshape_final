
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ThumbsUp, User, Search } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import '../styles/blog.css';

const BlogList = () => {
  const [animatedPosts, setAnimatedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on category and search query
  useEffect(() => {
    let result = [...blogPosts];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    
    // Animate posts appearing one by one
    setAnimatedPosts([]);
    result.forEach((post, index) => {
      setTimeout(() => {
        setAnimatedPosts(prev => [...prev, post]);
      }, index * 200);
    });
    
    setFilteredPosts(result);
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="blog-container page-transition">
      <header className="blog-header">
        <h1 className="blog-title">EchoVerse</h1><br/>
        <p className="blog-subtitle">
          Insights and stories about design, technology, and innovation
        </p>
        
        {/* Search and Filter Section */}
        <a href="/admin">
            <button className=' h-[200px] te'>Admin Panel</button>
        </a>
        <div className="blog-filters">
          <div className="blog-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {filteredPosts.length === 0 && animatedPosts.length === 0 ? (
        <div className="no-results">
          <h2>No posts found</h2>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="blog-grid">
          {animatedPosts.map((post, index) => (
            <Link to={`/blogs/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                className="blog-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="blog-card-image-container">
                  <img 
                    src={post.image === "/placeholder.svg" 
                      ? `https://images.unsplash.com/photo-${index % 2 === 0 ? '1486312338219-ce68d2c6f44d' : '1488590528505-98d2b5aba04b'}`
                      : post.image} 
                    alt={post.title} 
                    className="blog-card-image"
                  />
                  <div className="blog-card-category-badge">{post.category}</div>
                </div>
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-author">
                      <img 
                        src={post.author.image === "/placeholder.svg" 
                          ? `https://images.unsplash.com/photo-1649972904349-6e44c42644a7` 
                          : post.author.image} 
                        alt={post.author.name} 
                        className="blog-card-author-image"
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="blog-card-meta">
                      <div className="blog-card-meta-item">
                        <MessageSquare size={16} />
                        <span>{post.comments ? post.comments.length : 0}</span>
                      </div>
                      <div className="blog-card-meta-item">
                        <ThumbsUp size={16} />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;