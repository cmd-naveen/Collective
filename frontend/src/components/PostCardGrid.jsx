import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCardGrid({ post }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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
        <span className="post-card-grid__date">{formatDate(post.date)}</span>
      </div>
      
      <h2 className="post-card-grid__title">
        <Link to={`/article/${post.slug}`}>{post.title}</Link>
      </h2>
    </li>
  );
}
