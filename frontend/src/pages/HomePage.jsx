import React from 'react';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

export default function HomePage() {
  return (
    <div className="site-content" data-testid="home-page">
      <div className="site-container">
        <div className="page-header">
          <p className="page-header__title">Latest Articles</p>
        </div>
        <ul className="posts-list">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}
