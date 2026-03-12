import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/posts';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Close overlays on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="site-header" role="banner" data-testid="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-logo__text" data-testid="logo">
            Collective
          </Link>

          <div className="header-right">
            <nav aria-label="Primary">
              <ul className="primary-nav">
                <li><Link to="/">Home</Link></li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              className="header-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              data-testid="search-toggle"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              data-testid="hamburger-btn"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={`mobile-nav-overlay${mobileOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        onClick={(e) => e.target === e.currentTarget && setMobileOpen(false)}
        data-testid="mobile-nav"
      >
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          &times;
        </button>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)}>
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Search Overlay */}
      <div
        className={`search-overlay${searchOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        data-testid="search-overlay"
      >
        <div className="search-overlay__inner">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              data-testid="search-input"
            />
            <button type="submit" aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>
        <button className="search-overlay__close" onClick={() => setSearchOpen(false)} aria-label="Close search">
          &times;
        </button>
      </div>
    </>
  );
}
