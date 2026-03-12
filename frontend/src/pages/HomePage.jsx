import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

// Hero Post Component - Large featured article
function HeroPost({ post }) {
  return (
    <div className="hero-post" data-testid="hero-post">
      <Link to={`/article/${post.slug}`} className="hero-post__link">
        <div className="hero-post__image-wrap">
          <img 
            src={post.image} 
            alt={post.title} 
            className="hero-post__image"
            loading="eager"
          />
          <div className="hero-post__overlay">
            <span className="hero-post__category">{post.category.name}</span>
            <h2 className="hero-post__title">{post.title}</h2>
            {post.excerpt && (
              <p className="hero-post__excerpt">{post.excerpt}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

// Grid Post Card - No date shown
function PostCardGrid({ post }) {
  return (
    <li className="post-card-grid" data-testid={`post-card-${post.id}`}>
      {post.image && (
        <Link to={`/article/${post.slug}`} className="post-card-grid__image-link">
          <img 
            className="post-card-grid__image" 
            src={post.image} 
            alt={post.title} 
            loading="lazy" 
          />
        </Link>
      )}
      
      <div className="post-card-grid__meta">
        <span className="post-card-grid__categories">
          <Link to={`/category/${post.category.slug}`}>
            {post.category.name}
          </Link>
        </span>
      </div>
      
      <h2 className="post-card-grid__title">
        <Link to={`/article/${post.slug}`}>{post.title}</Link>
      </h2>
    </li>
  );
}

export default function HomePage() {
  // First post is the hero (latest)
  const heroPost = posts[0];
  // Rest go in the grid
  const gridPosts = posts.slice(1);

  return (
    <div className="site-content" data-testid="home-page">
      <div className="site-container">
        
        {/* Hero Post - Latest Article */}
        <HeroPost post={heroPost} />
        
        {/* Grid of remaining posts */}
        <ul className="posts-grid">
          {gridPosts.map(post => (
            <PostCardGrid key={post.id} post={post} />
          ))}
        </ul>
        
        <div className="section-more-link">
          <p>For more recently published writing and updates, visit our <a href="/">latest page</a>.</p>
        </div>
      </div>
    </div>
  );
}
