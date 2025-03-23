import React,{ useState, useEffect } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

// Mock Firebase functionality
const mockFirebase = {
  signInUserGoogle: () => new Promise(resolve => setTimeout(resolve, 1500)),
  signInUserGithub: () => new Promise(resolve => setTimeout(resolve, 1500)),
  signUpUser: () => new Promise(resolve => setTimeout(resolve, 1500)),
};

// Function to create default progress for a subject.
const createDefaultSubjectProgress = () => {
  const modules = [];
  for (let i = 1; i <= 10; i++) {
    modules.push({
      moduleId: i,
      completed: 0,
      total: 10,
    });
  }
  return modules;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryUsername = searchParams.get("username") || "";

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Helper function to show success message
  const displaySuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/Dashboard");
    }, 2000);
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await mockFirebase.signInUserGoogle();
      displaySuccess("Google sign-in successful!");
    } catch (err) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await mockFirebase.signInUserGithub();
      displaySuccess("GitHub sign-in successful!");
    } catch (err) {
      setError(err.message || "Failed to sign in with GitHub");
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign Up/Sign In
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (isSignUp && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    try {
      await mockFirebase.signUpUser();
      displaySuccess(isSignUp ? "Account created successfully!" : "Sign in successful!");
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // Animation classes for form elements
  const getAnimationClass = (index) => {
    return `fade-in-slide-up delay-${index}`;
  };

  return (
    <div className="login-container">
      {/* Background elements */}
      <div className="background-elements">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo">{isSignUp ? "✨" : "🔐"}</div>
          </div>
          <h1 className={getAnimationClass(1)}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className={getAnimationClass(2)}>
            {isSignUp 
              ? "Sign up to get started with our platform" 
              : "Sign in to continue to your account"}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        <div className={`oauth-buttons ${getAnimationClass(3)}`}>
          <button 
            className="oauth-button google-button" 
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FaGoogle className="btn-icon" />
            <span>Continue with Google</span>
          </button>
          
          <button 
            className="oauth-button github-button" 
            onClick={handleGithubSignIn}
            disabled={loading}
          >
            <FaGithub className="btn-icon" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className={`divider ${getAnimationClass(4)}`}>
          <span>or</span>
        </div>

        <form onSubmit={handleEmailSubmit} className={getAnimationClass(5)}>
          <div className="form-group">
            <div className="input-container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
              <label className={email ? "filled" : ""}>Email Address</label>
              <span className="input-focus-border"></span>
            </div>
          </div>

          <div className="form-group">
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <label className={password ? "filled" : ""}>Password</label>
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <span className="input-focus-border"></span>
            </div>
          </div>
          
          {!isSignUp && (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </button>
        </form>

        <div className={`toggle-mode ${getAnimationClass(6)}`}>
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

      {/* Success popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
