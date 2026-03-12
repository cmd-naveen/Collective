import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/posts';

// Leaderboard Ad Banner Component
function LeaderboardAd() {
  return (
    <div className="leaderboard-ad" data-testid="leaderboard-ad">
      <div className="leaderboard-ad__inner">
        <span className="leaderboard-ad__label">Advertisement</span>
        <div className="leaderboard-ad__placeholder">
          728 × 90 Leaderboard Ad
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setMenuOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const close = () => { setMenuOpen(false); setSearchOpen(false); };

  return (
    <>
      <header className="site-header" role="banner" data-testid="site-header">
        <div className="site-header__inner">
          {/* Logo - supports image or text */}
          <Link to="/" className="site-logo" data-testid="logo">
            {/* Placeholder for image logo - replace src when ready */}
            {/* <img src="/logo.png" alt="Collective" className="site-logo__image" /> */}
            <span className="site-logo__text">Collective</span>
          </Link>

          <div className="header-right">
            <button className="header-search-btn" onClick={() => setSearchOpen(true)}
              aria-label="Open search" data-testid="search-toggle">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Veggie Burger — always visible */}
            <button className="veggie-burger-btn" onClick={() => setMenuOpen(true)}
              aria-label="Open menu" aria-expanded={menuOpen} data-testid="veggie-burger">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Leaderboard Ad below header */}
      <LeaderboardAd />

      {/* ── Full-Screen Dark Menu ─────────────────────────────── */}
      {menuOpen && (
        <div className="fullscreen-menu" role="dialog" aria-modal="true"
          aria-label="Site navigation" data-testid="fullscreen-menu">

          {/* Top bar: X | COLLECTIVE */}
          <div className="fullscreen-menu__header">
            <button className="fullscreen-menu__close" onClick={close} aria-label="Close menu">&#x2715;</button>
            <span className="fullscreen-menu__logo">Collective</span>
          </div>

          {/* Body: 3 columns */}
          <div className="fullscreen-menu__body">

            {/* Left column */}
            <div className="fmenu-left">
              <p className="fmenu-section-label">Explore &#8595;</p>
              <Link to="/" onClick={close}>Latest</Link>
              <Link to="/authors" onClick={close}>Writers</Link>

              <p className="fmenu-section-label" style={{ marginTop: 28 }}>Legal</p>
              <Link to="/about" onClick={close}>About Us</Link>
              <Link to="/privacy" onClick={close}>Privacy Policy</Link>
              <Link to="/terms" onClick={close}>Terms of Use</Link>
              <Link to="/advertise" onClick={close}>Advertise</Link>
            </div>

            {/* Center: large category links */}
            <div className="fmenu-center">
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`}
                  className="fmenu-category-link" onClick={close}>
                  {cat.name}
                </Link>
              ))}
              <Link to="/" className="fmenu-category-link" onClick={close}>Home</Link>
            </div>

            {/* Right: social counts */}
            <div className="fmenu-right">
              {/* Instagram */}
              <div className="fmenu-social-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                <span className="fmenu-social-count">45k</span>
              </div>
              {/* Twitter/X */}
              <div className="fmenu-social-item">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="fmenu-social-count">28k</span>
              </div>
              {/* Facebook */}
              <div className="fmenu-social-item">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="fmenu-social-count">12k</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Search Overlay ───────────────────────────────────── */}
      <div className={`search-overlay${searchOpen ? ' is-open' : ''}`}
        role="dialog" aria-modal="true" aria-label="Search"
        onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        data-testid="search-overlay">
        <div className="search-overlay__inner">
          <form className="search-form" onSubmit={handleSearch}>
            <input type="search" placeholder="Search articles…"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off" data-testid="search-input" />
            <button type="submit" aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>
        <button className="search-overlay__close" onClick={() => setSearchOpen(false)}
          aria-label="Close search">&times;</button>
      </div>
    </>
  );
}
