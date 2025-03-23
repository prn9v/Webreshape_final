import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
//   const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
//   const [commentText, setCommentText] = useState("");

  //   useEffect(() => {
  //     // Simulate fetching data
  //     setIsLoading(true);
  //     window.scrollTo(0, 0);

  //     setTimeout(() => {
  //       if (slug) {
  //         const fetchedPost = getBlogPostBySlug(slug);
  //         if (fetchedPost) {
  //           setPost(fetchedPost);
  //           setRelatedPosts(getRecentPosts(3));
  //         }
  //       }
  //       setIsLoading(false);
  //     }, 500);
  //   }, [slug]);

  //   const handleLike = () => {
  //     setLiked(!liked);
  //   };

  //   const handleCommentSubmit = (e) => {
  //     e.preventDefault();
  //     if (commentText.trim() === "") return;

  //     // In a real app, you would send this to an API
  //     alert(`Comment submitted: ${commentText}`);
  //     setCommentText("");
  //   };

  const post = {
    title: "The Future of AI in Web Development",
    coverImage: "cover.jpg",
    author: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/50",
    },
    publishedAt: "March 23, 2025",
    content:
      `The Dangers of Artificial Intelligence: Is AI Harmful? Artificial Intelligence (AI) is transforming industries, improving efficiency, and enhancing human capabilities. However, despite its benefits, AI also poses significant risks that could negatively impact society. From ethical concerns to job displacement and security threats, the potential harms of AI should not be overlooked.
      1. Job Displacement and Economic DisruptionsAI-powered automation is replacing human jobs at an alarming rate. Many industries, including manufacturing, customer service, and even software development, are integrating AI tools that reduce the need for human workers. While AI creates new job opportunities, the transition is not always smooth, leaving many unemployed and struggling to adapt to the changing job market.
      2. Bias and Discrimination in AI SystemsAI models learn from vast datasets, but if these datasets contain biased information, AI systems can amplify discrimination. Biased hiring algorithms, racially insensitive facial recognition software, and prejudiced loan approval systems are some examples of AI reinforcing societal inequalities. Without proper regulation, AI could worsen existing social biases instead of eliminating them.3. Privacy Invasion and SurveillanceAI-driven surveillance systems track and analyze human behavior on an unprecedented scale. Governments and corporations use AI for facial recognition, tracking online activities, and monitoring citizens. This raises serious concerns about privacy and human rights, as individuals are increasingly being watched without their consent.4. Security Threats and AI in CybercrimeHackers are leveraging AI to create more sophisticated cyber-attacks, including AI-powered malware, deepfake scams, and automated phishing attempts. AI can also be weaponized in warfare, with autonomous drones and AI-controlled cyberweapons posing serious global threats.5. Lack of Accountability in AI Decision-MakingAI operates based on complex algorithms that are often difficult to interpret. When an AI system makes a mistake—such as misdiagnosing a patient or falsely convicting an individual—it is unclear who should be held responsible. The lack of accountability in AI decision-making makes it challenging to regulate and control its impact.6. Ethical Dilemmas in AI DevelopmentAI advancements bring up ethical concerns, such as the creation of artificial general intelligence (AGI) that could surpass human intelligence. If AI gains the ability to make autonomous decisions without human oversight, the consequences could be catastrophic, including unpredictable behavior and loss of human control.ConclusionWhile AI has the potential to revolutionize society for the better, its risks and ethical concerns cannot be ignored. Governments, researchers, and technology leaders must work together to establish regulations and ethical guidelines to ensure AI is developed responsibly. The future of AI should focus on augmenting human intelligence rather than replacing it, ensuring that technology serves humanity rather than endangering it.`,
    likes: 10,
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        content: "Great insights!",
        avatar: "https://via.placeholder.com/40",
      },
      {
        id: 2,
        author: "Mike Johnson",
        content: "Very informative post!",
        avatar: "https://via.placeholder.com/40",
      },
    ],
    tags: ["AI", "Web Development", "Future"],
  };

  const [likes, setLikes] = useState(post.likes);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    const newComment = {
      id: comments.length + 1,
      author: "Anonymous",
      content: commentText,
      avatar: "https://via.placeholder.com/40",
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading post...</p>
//       </div>
//     );
//   }

  if (!post) {
    return (
      <div className="not-found-container">
        <h2>Blog post not found</h2>
        <p>The post you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="back-button">
          Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <div className="blog-post-hero">
        <div className="hero-image-container">
          <img src={post.coverImage} alt={post.title} className="hero-image" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <Link to="/blog" className="back-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="back-icon"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>

          {/* <div className="post-categories">
            {post.map((category) => (
              <span key={category.title} className="post-category">
                {category.author}
              </span>
            ))}
          </div> */}

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <div className="post-author">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-name">{post.author.name}</div>
                <div className="author-role">{post.author.role}</div>
              </div>
            </div>

            <div className="post-details">
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="blog-post-content">
        <div className="content-container">
          {/* Sharing Sidebar */}
          <div className="sharing-sidebar">
            <button
              className={`share-button ${liked ? "liked" : ""}`}
              onClick={handleLike}
              aria-label="Like"
            >
              <svg
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="share-icon"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <button className="share-button" aria-label="Share to Facebook">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="share-icon"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>

            <button className="share-button" aria-label="Share to Twitter">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="share-icon"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </button>

            <button className="share-button" aria-label="Copy Link">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="share-icon"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
          </div>

          {/* Article Content */}
          <article className="article-body">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Author Bio */}
          <div className="author-bio">
            <h3>About the Author</h3>
            <div className="author-profile">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="author-image"
              />
              <div>
                <div className="author-name">{post.author.name}</div>
                <div className="author-role">{post.author.role}</div>
              </div>
            </div>
            <p className="author-description">
              An experienced writer focused on design, technology, and their
              intersection with business and culture.
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section" id="comments">
        <div className="comments-container">
          <h2>Comments ({post.comments.length})</h2>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              className="comment-textarea"
            />
            <button type="submit" className="comment-submit">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-author">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="comment-avatar"
                    />
                    <div>
                      <div className="comment-author-name">
                        {comment.author.name}
                      </div>
                      <div className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="comment-likes">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="like-icon"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span>{comment.likes}</span>
                  </div>
                </div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-actions">
                  <button className="action-button">Reply</button>
                  <button className="action-button">Like</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="related-posts">
        <div className="related-container">
          <h2>More Articles</h2>
          <div className="related-grid">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="related-card">
                <Link to={`/blog/${relatedPost.slug}`} className="related-link">
                  <div className="related-image-container">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="related-image"
                    />
                  </div>
                  <div className="related-content">
                    <h3 className="related-title">{relatedPost.title}</h3>
                    <p className="related-excerpt">{relatedPost.excerpt}</p>
                    <div className="related-meta">
                      <span>
                        {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      </span>
                      <span>·</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
