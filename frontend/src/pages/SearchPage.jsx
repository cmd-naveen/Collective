import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const results = query
    ? posts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase()) ||
        p.category.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="site-content" data-testid="search-page">
      <div className="site-container">
        <div className="archive-header">
          <p className="archive-label">Search</p>
          <h1 className="archive-title" data-testid="search-title">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
        </div>

        {query && results.length === 0 && (
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-meta)', fontSize: 15 }}>
            No results found for <strong>"{query}"</strong>. Try a different term.
          </p>
        )}

        {results.length > 0 && (
          <ul className="posts-list">
            {results.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        )}

        {!query && (
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-meta)', fontSize: 15 }}>
            Enter a search term to find articles.
          </p>
        )}
      </div>
    </div>
  );
}
