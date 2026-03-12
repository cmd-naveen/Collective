import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts, categories, authors } from '../data/posts';

// ── Author Page ─────────────────────────────────────────────
export default function AuthorPage() {
  const { slug } = useParams();
  const author = authors.find(a => a.slug === slug);

  if (!author) {
    return (
      <div className="site-content">
        <div className="site-container not-found-page">
          <p className="error-code">404</p>
          <h2>Author Not Found</h2>
          <Link to="/" className="btn-home">Go Back Home</Link>
        </div>
      </div>
    );
  }

  const authorPosts = posts.filter(p => p.author.slug === slug);

  return (
    <div className="site-content" data-testid="author-page">
      {/* ── Author Header (centered) ── */}
      <div className="author-page-header">
        <img
          className="author-page__avatar"
          src={author.avatar}
          alt={author.name}
          loading="lazy"
          data-testid="author-page-avatar"
        />
        <h1 className="author-page__name" data-testid="author-page-name">
          {author.name}
        </h1>
        <p className="author-page__bio" data-testid="author-page-bio">
          {author.bio}
        </p>

        {/* Social icons */}
        <div className="author-page__social">
          {author.instagram && (
            <a href={author.instagram} target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="author-page__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          )}
          {author.twitter && (
            <a href={author.twitter} target="_blank" rel="noopener noreferrer"
              aria-label="Twitter" className="author-page__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {/* Default social placeholders */}
          {!author.instagram && (
            <a href="#social" aria-label="Instagram" className="author-page__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          )}
          {!author.twitter && (
            <a href="#social" aria-label="Twitter" className="author-page__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ── Articles list ── */}
      <div className="site-container">
        <h2 className="author-articles-heading" data-testid="author-articles-heading">
          Articles by<br />{author.name}
        </h2>

        <div className="author-articles-list" data-testid="author-articles-list">
          {authorPosts.map(post => (
            <div className="author-article-row" key={post.id} data-testid={`author-article-${post.id}`}>
              <Link to={`/article/${post.slug}`} className="author-article-row__image-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="author-article-row__image"
                  loading="lazy"
                />
              </Link>
              <div className="author-article-row__content">
                <h3 className="author-article-row__title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="author-article-row__category">{post.category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
