import React from 'react';
import { Link } from 'react-router-dom';

function LegalPage({ title, children }) {
  return (
    <div className="site-content" data-testid="legal-page">
      <div className="site-container">
        <div className="legal-page">
          <div className="legal-page__header">
            <p className="archive-label">Collective</p>
            <h1 className="archive-title" data-testid="legal-title">{title}</h1>
          </div>
          <div className="legal-page__body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <LegalPage title="About Us">
      <p>Collective is an independent editorial platform for modern readers — a space for honest, thoughtful writing about self-discovery, relationships, culture, and mental health.</p>
      <p>We believe in the power of long-form writing to connect, challenge, and comfort. Every piece published here is chosen because it says something true.</p>
      <h2>Our Mission</h2>
      <p>To create a home for writing that feels human. We publish essays, personal narratives, and cultural criticism from writers who have something worth saying — and say it well.</p>
      <h2>Work With Us</h2>
      <p>We're always looking for new voices. If you write essays, personal narratives, or cultural commentary and would like to contribute, reach out at <strong>hello@collective.world</strong>.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </LegalPage>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p><em>Last updated: January 1, 2024</em></p>
      <p>Collective ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our website.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly, such as when you subscribe to our newsletter or contact us. We also automatically collect certain technical data including browser type, pages visited, and general location.</p>
      <h2>How We Use Information</h2>
      <p>We use your information to provide and improve our service, communicate with you, and comply with legal obligations. We do not sell your personal information to third parties.</p>
      <h2>Cookies</h2>
      <p>We use cookies to understand how our site is used and to improve your experience. You can disable cookies in your browser settings, though some features may not function properly.</p>
      <h2>Contact</h2>
      <p>Questions about this policy? Contact us at <strong>privacy@collective.world</strong>.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p><em>Last updated: January 1, 2024</em></p>
      <p>By accessing or using Collective, you agree to be bound by these Terms of Use. Please read them carefully.</p>
      <h2>Content</h2>
      <p>All content on this site is the property of Collective or its contributing writers and is protected by copyright. You may not reproduce, distribute, or create derivative works without prior written permission.</p>
      <h2>User Conduct</h2>
      <p>You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site.</p>
      <h2>Disclaimer</h2>
      <p>Content on this site is provided for informational and entertainment purposes only. It does not constitute professional advice of any kind.</p>
      <h2>Contact</h2>
      <p>Questions? Reach us at <strong>legal@collective.world</strong>.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </LegalPage>
  );
}

export function AdvertisePage() {
  return (
    <LegalPage title="Advertise">
      <p>Interested in reaching Collective's engaged readership? We offer a range of editorial sponsorship and advertising opportunities tailored to brands that align with our values.</p>
      <h2>Who Reads Collective</h2>
      <p>Our readers are thoughtful, curious, and culturally engaged. They're drawn to writing that's honest, personal, and beautifully made — and they respond to brands with the same qualities.</p>
      <h2>Opportunities</h2>
      <ul>
        <li>Sponsored editorial content</li>
        <li>Newsletter sponsorships</li>
        <li>Category partnerships</li>
        <li>Event collaborations</li>
      </ul>
      <h2>Get in Touch</h2>
      <p>Email us at <strong>advertising@collective.world</strong> to request a media kit.</p>
      <p><Link to="/">← Back to Home</Link></p>
    </LegalPage>
  );
}
