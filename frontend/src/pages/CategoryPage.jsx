import React from 'react';
import { useParams, Link } from 'react-router-dom';
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

        {/* Large category title — TC-style */}
        <h1 className="category-page-title" data-testid="category-title">
          {category.name}
        </h1>

        {filtered.length > 0 ? (
          <div className="cat-articles-list" data-testid="category-articles-list">
            {filtered.map(post => (
              <div className="cat-article-row" key={post.id} data-testid={`cat-article-${post.id}`}>

                {/* Left: image */}
                <Link to={`/article/${post.slug}`} className="cat-article-row__image-wrap">
                  <img
                    className="cat-article-row__image"
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                </Link>

                {/* Right: title + author */}
                <div className="cat-article-row__content">
                  <h2 className="cat-article-row__title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="cat-article-row__author">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="cat-author-avatar"
                    />
                    <Link to={`/author/${post.author.slug}`} className="cat-author-name">
                      {post.author.name}
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-meta)', fontSize: 15 }}>
            No posts in this category yet.
          </p>
        )}

      </div>
    </div>
  );
}
