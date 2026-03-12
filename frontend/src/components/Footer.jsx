import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/posts';

export default function Footer() {
  return (
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
  );
}
