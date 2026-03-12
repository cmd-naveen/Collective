import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/posts';

export default function Footer() {
  return (
    <>
      {/* Download Theme Banner */}
      <div className="download-banner" data-testid="download-banner">
        <div className="download-banner__inner">
          <div className="download-banner__content">
            <h3 className="download-banner__title">Download the WordPress Theme</h3>
            <p className="download-banner__text">
              Get the complete Collective WordPress theme with infinite scroll, 
              leaderboard ads, related articles grid, and all the features you see here.
            </p>
          </div>
          <a 
            href="/collective.zip" 
            download="collective.zip"
            className="download-banner__btn"
            data-testid="download-theme-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Theme (ZIP)
          </a>
        </div>
      </div>

      <footer className="site-footer" role="contentinfo" data-testid="site-footer">
        <div className="site-footer__inner">
          <Link to="/" className="footer-logo">Collective</Link>

          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
            <li><a href="#about">About</a></li>
          </ul>

          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} &mdash; Collective. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
