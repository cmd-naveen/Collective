import React from 'react';
import PostCardGrid from '../components/PostCardGrid';
import { posts } from '../data/posts';

export default function HomePage() {
  return (
    <div className="site-content" data-testid="home-page">
      <div className="site-container">
        <ul className="posts-grid">
          {posts.map(post => (
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
