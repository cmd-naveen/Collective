import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { posts, authors } from '../data/posts';

// Search Result Card - No date shown
function SearchResultCard({ post }) {
  return (
    <li className="search-result-card" data-testid={`search-result-${post.id}`}>
      <Link to={`/article/${post.slug}`} className="search-result-card__link">
        {post.image && (
          <div className="search-result-card__image-wrap">
            <img 
              className="search-result-card__image" 
              src={post.image} 
              alt={post.title} 
              loading="lazy" 
            />
          </div>
        )}
        <div className="search-result-card__content">
          <span className="search-result-card__category">{post.category.name}</span>
          <h3 className="search-result-card__title">{post.title}</h3>
          {post.excerpt && (
            <p className="search-result-card__excerpt">{post.excerpt}</p>
          )}
          <span className="search-result-card__author">By {post.author.name}</span>
        </div>
      </Link>
    </li>
  );
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Enhanced search - search in title, content, category, and author
  const results = query
    ? posts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase()) ||
        p.category.name.toLowerCase().includes(query.toLowerCase()) ||
        p.author.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  return (
    <div className="site-content" data-testid="search-page">
      <div className="site-container site-container--narrow">
        
        {/* Search Form */}
        <div className="search-page-form">
          <form onSubmit={handleSearch} className="search-page-input-wrap">
            <input
              type="search"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search articles..."
              className="search-page-input"
              autoFocus
              data-testid="search-input"
            />
            <button type="submit" className="search-page-btn" data-testid="search-submit">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Results Header */}
        {query && (
          <div className="search-results-header">
            <p className="search-results-count" data-testid="search-results-count">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "<strong>{query}</strong>"
            </p>
          </div>
        )}

        {/* No Results */}
        {query && results.length === 0 && (
          <div className="search-no-results">
            <p>No articles found matching your search.</p>
            <p>Try different keywords or browse our <Link to="/">latest articles</Link>.</p>
          </div>
        )}

        {/* Results List */}
        {results.length > 0 && (
          <ul className="search-results-list">
            {results.map(post => (
              <SearchResultCard key={post.id} post={post} />
            ))}
          </ul>
        )}

        {/* No Query */}
        {!query && (
          <div className="search-suggestions">
            <p className="search-suggestions__label">Popular topics:</p>
            <div className="search-suggestions__tags">
              <Link to="/search?q=self-discovery" className="search-tag">Self-Discovery</Link>
              <Link to="/search?q=relationships" className="search-tag">Relationships</Link>
              <Link to="/search?q=culture" className="search-tag">Culture</Link>
              <Link to="/search?q=mental health" className="search-tag">Mental Health</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
