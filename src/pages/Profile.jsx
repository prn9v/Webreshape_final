
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  BookOpen, 
  Heart, 
  Settings, 
  Edit3,
  ChevronRight
} from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('saved');

  const userData = {
    name: "Alex Morgan",
    username: "alexmorgan",
    bio: "Digital content creator and tech enthusiast. I write about emerging technologies and digital culture.",
    joinDate: "March 2022",
    email: "alex.morgan@example.com",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
  };

  const savedBlogs = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      excerpt: "Exploring how artificial intelligence is transforming the way we create and consume content online.",
      author: "Jamie Chen",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1677442135968-6b7d4b4d0fde?q=80&w=1932&auto=format&fit=crop",
      readTime: "8 min read",
      category: "Technology"
    },
    {
      id: 2,
      title: "Sustainable Web Design Practices",
      excerpt: "How to reduce your website's carbon footprint while maintaining stunning visuals and performance.",
      author: "Robin Taylor",
      date: "August 3, 2023",
      image: "https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?q=80&w=1770&auto=format&fit=crop",
      readTime: "6 min read",
      category: "Design"
    },
    {
      id: 3,
      title: "The Psychology Behind Viral Content",
      excerpt: "Understanding what makes content spread and how to apply these principles ethically.",
      author: "Jordan Smith",
      date: "September 12, 2023",
      image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1770&auto=format&fit=crop",
      readTime: "10 min read",
      category: "Psychology"
    }
  ];

  const readingHistory = [
    {
      id: 1,
      title: "Introduction to TypeScript and React",
      date: "2 days ago",
      progress: "100%",
      category: "Development"
    },
    {
      id: 2,
      title: "Building Micro-Animations with CSS",
      date: "Last week",
      progress: "100%",
      category: "Design"
    },
    {
      id: 3,
      title: "User Experience Design Principles",
      date: "2 weeks ago",
      progress: "75%",
      category: "UX"
    },
    {
      id: 4,
      title: "Content Strategy for Digital Products",
      date: "Last month",
      progress: "100%",
      category: "Content"
    }
  ];

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={userData.profileImage} alt={userData.name} />
        </div>
        <div className="profile-info">
          <div className="profile-name-container">
            <div>
              <h1 className="profile-name">{userData.name}</h1>
              <p className="profile-username">@{userData.username}</p>
            </div>
            <button className="edit-profile-button">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
          <p className="profile-bio">{userData.bio}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <Calendar size={16} />
              <span>Joined {userData.joinDate}</span>
            </div>
            <div className="stat-item">
              <BookOpen size={16} />
              <span>24 articles read</span>
            </div>
            <div className="stat-item">
              <Heart size={16} />
              <span>12 articles saved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-divider"></div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Blogs
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Reading History
          </button>
          <button 
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Saved Blogs Tab */}
        {activeTab === 'saved' && (
          <div className="saved-blogs-container">
            <div className="blog-grid">
              {savedBlogs.map((blog, index) => (
                <div key={blog.id} className="blog-card" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="blog-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                  <div className="blog-content">
                    <div className="blog-header">
                      <span className="blog-category">{blog.category}</span>
                      <span className="blog-read-time">{blog.readTime}</span>
                    </div>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-author">by {blog.author} · {blog.date}</p>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <div className="blog-actions">
                      <button className="read-button">Read Now</button>
                      <button className="like-button">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reading History Tab */}
        {activeTab === 'history' && (
          <div className="reading-history-container">
            {readingHistory.map((item, index) => (
              <div key={item.id} className="history-item" style={{animationDelay: `${index * 75}ms`}}>
                <div className="history-content">
                  <div className="history-title-row">
                    <h3 className="history-title">{item.title}</h3>
                    <span className="history-category">{item.category}</span>
                  </div>
                  <p className="history-date">Read {item.date}</p>
                </div>
                <div className="history-actions">
                  <span className="history-progress">{item.progress}</span>
                  <button className="continue-button">Continue Reading</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-container">
            <div className="settings-card">
              <div className="settings-header">
                <h2>Account Settings</h2>
                <p>Manage your account details and preferences</p>
              </div>
              <div className="settings-content">
                <div className="settings-section">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" defaultValue={userData.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" id="username" defaultValue={userData.username} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" defaultValue={userData.email} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" defaultValue="********" />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" rows={4} defaultValue={userData.bio} />
                  </div>
                </div>

                <div className="settings-divider"></div>

                <div className="settings-section">
                  <h3>Notification Settings</h3>
                  <div className="notification-option">
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive updates about new content and activity</p>
                    </div>
                    <button className="settings-button">Manage</button>
                  </div>
                  <div className="notification-option">
                    <div>
                      <h4>Newsletter</h4>
                      <p>Subscribe to our weekly newsletter</p>
                    </div>
                    <button className="settings-button">Subscribe</button>
                  </div>
                </div>
              </div>
              <div className="settings-footer">
                <button className="cancel-button">Cancel</button>
                <button className="save-button">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;