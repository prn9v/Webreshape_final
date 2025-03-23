import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Sample blog posts data
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      excerpt: "Exploring how artificial intelligence is transforming the way we create and consume content.",
      category: "Technology",
      author: "Alex Morgan",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt: "Discover how minor adjustments to your daily routine can contribute to a healthier planet.",
      category: "Lifestyle",
      author: "Jamie Chen",
      date: "June 3, 2023",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "The Psychology of Productivity",
      excerpt: "Understanding the mental factors that influence how we work and how to optimize them.",
      category: "Psychology",
      author: "Sam Wilson",
      date: "April 22, 2023",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "EchoVerse has completely transformed how I consume content. The personalized recommendations are spot on!",
      author: "Michelle K.",
      role: "Marketing Director",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      quote: "As a writer, I've found my audience through EchoVerse. The community engagement is unlike any other platform.",
      author: "David Chen",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      quote: "The depth and variety of topics covered on EchoVerse keeps me coming back daily. A true knowledge treasure.",
      author: "Sarah Williams",
      role: "University Professor",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  // Categories
  const categories = [
    { name: "Technology", icon: "💻", color: "#6A11CB" },
    { name: "Health", icon: "🌿", color: "#48BB78" },
    { name: "Business", icon: "📊", color: "#4299E1" },
    { name: "Art", icon: "🎨", color: "#ED8936" },
    { name: "Science", icon: "🔬", color: "#805AD5" },
    { name: "Travel", icon: "✈️", color: "#38B2AC" },
    { name: "Food", icon: "🍲", color: "#F56565" },
    { name: "Fashion", icon: "👗", color: "#D53F8C" },
    { name: "Education", icon: "📚", color: "#3182CE" },
    { name: "Environment", icon: "🌎", color: "#2F855A" }
  ];

  // Latest posts
  const latestPosts = [
    {
      id: 1,
      title: "The Art of Mindful Writing",
      excerpt: "How mindfulness practices can enhance your creative writing process.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3",
      category: "Creativity",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Data Privacy in the Digital Age",
      excerpt: "Understanding the importance of protecting your personal information online.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3",
      category: "Technology",
      date: "4 days ago"
    },
    {
      id: 3,
      title: "Remote Work Culture",
      excerpt: "Building effective team dynamics in distributed work environments.",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3",
      category: "Business",
      date: "1 week ago"
    },
    {
      id: 4,
      title: "Sustainable Fashion Trends",
      excerpt: "Exploring eco-friendly approaches to style and fashion consumption.",
      image: "https://images.unsplash.com/photo-1538331269258-6c97a6bdeae0?ixlib=rb-4.0.3",
      category: "Fashion",
      date: "1 week ago"
    }
  ];

  const checkScrollPosition = () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Check which section is in view
    const sections = [
      { ref: heroRef, id: 'hero' },
      { ref: featuredRef, id: 'featured' },
      { ref: categoriesRef, id: 'categories' },
      { ref: aboutRef, id: 'about' },
      { ref: testimonialsRef, id: 'testimonials' }
    ];

    sections.forEach(section => {
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          highlightNavItem(section.id);
        }
      }
    });
  };

  const highlightNavItem = (id) => {
    const navItems = document.querySelectorAll('.navigation a');
    navItems.forEach(item => {
      if (item.getAttribute('href') === `#${id}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  useEffect(() => {
    // Set loaded state after a short delay for animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Auto rotation for category showcase
    const categoryInterval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % categories.length);
    }, 3000);

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    // Scroll event listener
    window.addEventListener('scroll', checkScrollPosition);

    // Typing effect for hero text
    const text = "Where ideas find their voice";
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          typingElement.textContent += text.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }

    // Add parallax effect
    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(categoryInterval);
      window.removeEventListener('scroll', checkScrollPosition);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [categories.length, testimonials.length]);

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Header */}
      <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-container">
            <div className="logo">
              <span className="echo">Echo</span>
              <span className="verse">Verse</span>
            </div>
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#featured">Featured</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li>
                <Link to="/login" className="cta-button">Login</Link>
              </li>
            </ul>
          </nav>
          <div className={`mobile-menu-button ${showMobileMenu ? 'active' : ''}`} onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}>
          <ul>
            <li><a href="#hero" onClick={() => setShowMobileMenu(false)}>Home</a></li>
            <li><a href="#featured" onClick={() => setShowMobileMenu(false)}>Featured</a></li>
            <li><a href="#categories" onClick={() => setShowMobileMenu(false)}>Categories</a></li>
            <li><a href="#about" onClick={() => setShowMobileMenu(false)}>About</a></li>
            <li><a href="#testimonials" onClick={() => setShowMobileMenu(false)}>Testimonials</a></li>
            <li>
              <Link to="/login" className="mobile-cta" onClick={() => setShowMobileMenu(false)}>Login</Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="hero-section">
        <div className="animated-background">
          <div className="shape shape-1 parallax" data-speed="2"></div>
          <div className="shape shape-2 parallax" data-speed="5"></div>
          <div className="shape shape-3 parallax" data-speed="3"></div>
          <div className="shape shape-4 parallax" data-speed="4"></div>
          <div className="particles">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="particle"></div>
            ))}
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="animate-in delay-1">Discover.</span>
            <span className="animate-in delay-2">Connect.</span>
            <span className="animate-in delay-3">Inspire.</span>
          </h1>
          <div className="typing-container">
            <p className="hero-subtitle animate-in delay-4">
              <span className="typing-text"></span>
              <span className="cursor">|</span>
            </p>
          </div>
          <div className="hero-buttons animate-in delay-5">
            <Link to="/login" className="primary-button">Get Started</Link>
            <a href="#featured" className="secondary-button">Explore Articles</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow"></div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section id="featured" ref={featuredRef} className="featured-section">
        <div className="section-header">
          <h2 className="gradient-text">Featured Articles</h2>
          <p>Discover our top picks from across the platform</p>
        </div>
        <div className="featured-posts">
          {featuredPosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`featured-post animate-in delay-${index + 1}`}
              style={{ backgroundImage: `url(${post.image})` }}
            >
              <div className="post-overlay"></div>
              <div className="post-content">
                <span className="post-category">{post.category}</span>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span className="post-author">{post.author}</span>
                  <span className="post-date">{post.date}</span>
                </div>
                <Link to="/login" className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="latest-posts-section">
        <div className="section-header">
          <h2 className="gradient-text">Latest Stories</h2>
          <p>Fresh content from our community of writers</p>
        </div>
        <div className="latest-posts-grid">
          {latestPosts.map((post, index) => (
            <Link to="/login" key={post.id} className="latest-post-card">
              <div className="card-image" style={{ backgroundImage: `url(${post.image})` }}>
                <span className="card-category">{post.category}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-footer">
                  <span className="card-date">{post.date}</span>
                  <span className="read-more-link">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" ref={categoriesRef} className="categories-section">
        <div className="section-header">
          <h2 className="gradient-text">Explore Categories</h2>
          <p>Find content that matches your interests</p>
        </div>

        <div className="category-showcase">
          <div className="category-highlight" style={{ backgroundColor: categories[activeCategory].color + '10' }}>
            <div className="category-icon" style={{ backgroundColor: categories[activeCategory].color }}>
              {categories[activeCategory].icon}
            </div>
            <h3>{categories[activeCategory].name}</h3>
            <p>Discover the latest trends, insights, and stories in {categories[activeCategory].name}</p>
            <Link to="/login" className="category-explore-btn" style={{ borderColor: categories[activeCategory].color, color: categories[activeCategory].color }}>
              Explore {categories[activeCategory].name}
            </Link>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to="/login" 
              key={index} 
              className={`category-card animate-in delay-${(index % 5) + 1} ${index === activeCategory ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory(index);
              }}
              style={{ 
                borderColor: index === activeCategory ? category.color : 'transparent',
                boxShadow: index === activeCategory ? `0 5px 15px ${category.color}30` : 'none'
              }}
            >
              <div className="category-card-icon" style={{ backgroundColor: category.color }}>{category.icon}</div>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="gradient-text">About EchoVerse</h2>
            <p>EchoVerse is a dynamic blogging platform designed to amplify voices and ideas across the digital landscape. Our mission is to create a space where thoughts echo, stories resonate, and knowledge flows freely.</p>
            <p>We believe in the power of words to transform perspectives, spark conversations, and build communities. Whether you're a seasoned writer or just starting your journey, EchoVerse provides the tools and audience to make your voice heard.</p>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">✍️</div>
                <h3>Writer-Friendly Tools</h3>
                <p>Advanced editor with SEO tools and analytics to help your content succeed</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔍</div>
                <h3>Smart Discovery</h3>
                <p>AI-powered content recommendations tailored to your interests</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💬</div>
                <h3>Engaged Community</h3>
                <p>Connect with readers and writers who share your passions</p>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Writers</span>
              </div>
              <div className="stat">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Readers</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-container">
              <div className="floating-element pen parallax" data-speed="3"></div>
              <div className="floating-element coffee parallax" data-speed="2"></div>
              <div className="floating-element notes parallax" data-speed="4"></div>
              <div className="main-image"></div>
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="testimonials-section">
        <div className="section-header">
          <h2 className="gradient-text">What Our Community Says</h2>
          <p>Hear from the writers and readers who make EchoVerse special</p>
        </div>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`testimonial ${index === activeTestimonial ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <div className="quote-mark">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.author} className="author-avatar" />
                  <div className="author-info">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-role">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="carousel-controls">
            <button 
              className="carousel-control prev"
              onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
            >
              ←
            </button>
            <div className="carousel-indicators">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                ></button>
              ))}
            </div>
            <button 
              className="carousel-control next"
              onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-shape cta-shape-1 parallax" data-speed="2"></div>
          <div className="cta-shape cta-shape-2 parallax" data-speed="4"></div>
          <div className="cta-shape cta-shape-3 parallax" data-speed="3"></div>
        </div>
        <div className="cta-content">
          <h2>Ready to Share Your Story?</h2>
          <p>Join EchoVerse today and become part of a global community of writers and readers.</p>
          <Link to="/login" className="primary-button large">Get Started Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">
              <span className="echo">Echo</span>
              <span className="verse">Verse</span>
            </div>
            <p>Where ideas find their voice.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h3>Platform</h3>
              <ul>
                <li><a href="#featured">Featured</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Writing Guide</a></li>
                <li><a href="#">Community Guidelines</a></li>
                <li><a href="#">API Documentation</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 EchoVerse. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
