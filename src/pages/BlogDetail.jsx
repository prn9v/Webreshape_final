
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ThumbsUp, Share2, Facebook, Twitter, Linkedin, User } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import '../styles/blog.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Simulating data loading
  useEffect(() => {
    // Find the post with the matching id
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      if (foundPost) {
        setPost(foundPost);
        setComments(foundPost.comments || []);
        setLikeCount(foundPost.likes || 0);
      }
      setLoading(false);
    }, 500);
    
    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment = {
      id: comments.length + 1,
      author: {
        name: 'You',
        image: '/placeholder.svg',
      },
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      content: comment,
      likes: 0,
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  if (loading) {
    return (
      <div className="blog-detail-container">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              margin: '0 auto', 
              border: '3px solid #f3f3f3', 
              borderTop: '3px solid #06c', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} 
          />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-container">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Blog post not found</h2>
          <Link to="/blogs" className="back-button">
            <ArrowLeft size={20} />
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  // Determine the proper image URL to display
  const imageUrl = post.image === "/placeholder.svg" 
    ? `https://images.unsplash.com/photo-${parseInt(id) % 2 === 0 ? '1486312338219-ce68d2c6f44d' : '1488590528505-98d2b5aba04b'}`
    : post.image;

  return (
    <div className="blog-detail-container page-transition">
      <Link to="/blogs" className="back-button">
        <ArrowLeft size={20} />
        Back to all posts
      </Link>
      
      <article>
        <header className="blog-detail-header">
          <div className="blog-detail-category">{post.category}</div>
          <h1 className="blog-detail-title">{post.title}</h1>
          
          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <img 
                src={post.author.image === "/placeholder.svg" 
                  ? `https://images.unsplash.com/photo-1649972904349-6e44c42644a7` 
                  : post.author.image} 
                alt={post.author.name} 
                className="blog-detail-author-image"
              />
              <div className="blog-detail-author-info">
                <div className="blog-detail-author-name">{post.author.name}</div>
                <div className="blog-detail-date">{post.date} · {post.readTime}</div>
              </div>
            </div>
            
            <div className="blog-detail-stats">
              <div className="blog-detail-stat">
                <MessageSquare size={18} />
                <span>{comments.length}</span>
              </div>
              <div className="blog-detail-stat">
                <ThumbsUp size={18} />
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="blog-detail-image-container">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="blog-detail-image"
          />
        </div>
        
        <div 
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="blog-detail-actions">
          <div 
            className={`blog-detail-likes ${liked ? 'active' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp size={20} />
            <span>{liked ? 'Liked' : 'Like'}</span>
          </div>
          
          <div className="blog-detail-share">
            <div className="blog-detail-share-button">
              <Facebook size={18} />
            </div>
            <div className="blog-detail-share-button">
              <Twitter size={18} />
            </div>
            <div className="blog-detail-share-button">
              <Linkedin size={18} />
            </div>
            <div className="blog-detail-share-button">
              <Share2 size={18} />
            </div>
          </div>
        </div>
      </article>
      
      <section className="blog-comments">
        <div className="blog-comments-header">
          <h2 className="blog-comments-title">Comments</h2>
          <div className="blog-comments-count">{comments.length} comments</div>
        </div>
        
        <form className="blog-comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="blog-comment-input"
            placeholder="Add a comment..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button 
            type="submit" 
            className="blog-comment-button"
            disabled={!comment.trim()}
          >
            Post Comment
          </button>
        </form>
        
        {comments.map((comment) => (
          <div key={comment.id} className="blog-comment">
            <div className="blog-comment-header">
              <div className="blog-comment-author">
                <img 
                  src={comment.author.image === "/placeholder.svg" 
                    ? `https://images.unsplash.com/photo-1649972904349-6e44c42644a7` 
                    : comment.author.image} 
                  alt={comment.author.name} 
                  className="blog-comment-author-image"
                />
                <span className="blog-comment-author-name">{comment.author.name}</span>
              </div>
              <div className="blog-comment-date">{comment.date}</div>
            </div>
            <div className="blog-comment-content">{comment.content}</div>
            <div className="blog-comment-actions">
              <div className="blog-comment-action">
                <ThumbsUp size={16} />
                <span>{comment.likes}</span>
              </div>
              <div className="blog-comment-action">Reply</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogDetail;