import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts, categories } from '../data/posts';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const filtered = posts.filter(p => p.category.slug === slug);

  if (!category) {
    return (
      <div className="site-content">
        <div className="site-container not-found-page">
          <p className="error-code">404</p>
          <h2>Category Not Found</h2>
          <Link to="/" className="btn-home">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-content" data-testid="category-page">
      <div className="site-container">
        <header className="archive-header">
          <p className="archive-label">Category</p>
          <h1 className="archive-title" data-testid="category-title">{category.name}</h1>
        </header>

        {filtered.length > 0 ? (
          <ul className="posts-list">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        ) : (
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-meta)', fontSize: 15 }}>
            No posts in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
