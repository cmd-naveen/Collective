import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArticleContent } from '../components/ArticleComponents';

function ArticleDivider() {
  return (
    <div className="article-divider" aria-hidden="true">
      <div className="article-divider__line" />
      <span className="article-divider__logo">Collective</span>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const sentinelRef = useRef(null);
  const loadedIdsRef = useRef(new Set());
  // Track article refs for URL update
  const articleRefs = useRef({});

  // Reset and load initial post whenever slug changes
  useEffect(() => {
    const initial = posts.find(p => p.slug === slug);
    if (initial) {
      setLoadedPosts([initial]);
      loadedIdsRef.current = new Set([initial.id]);
      setFinished(false);
      setLoading(false);
    }
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Update URL + title as user scrolls into each article
  useEffect(() => {
    if (loadedPosts.length === 0) return;

    const observers = [];
    loadedPosts.forEach(post => {
      const el = articleRefs.current[post.id];
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              window.history.replaceState({}, post.title, `/article/${post.slug}`);
              document.title = `${post.title} — Collective`;
            }
          });
        },
        { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach(io => io.disconnect());
  }, [loadedPosts]);

  const loadNext = useCallback(() => {
    if (loading || finished || loadedPosts.length === 0) return;

    const lastPost = loadedPosts[loadedPosts.length - 1];
    const next = posts.find(
      p => p.category.slug === lastPost.category.slug && !loadedIdsRef.current.has(p.id)
    );

    if (!next) {
      setFinished(true);
      return;
    }

    setLoading(true);
    // Simulate async fetch (600ms like a real API call)
    setTimeout(() => {
      loadedIdsRef.current.add(next.id);
      setLoadedPosts(prev => [...prev, next]);
      setLoading(false);
    }, 700);
  }, [loading, finished, loadedPosts]);

  // IntersectionObserver on the sentinel
  useEffect(() => {
    if (!sentinelRef.current || finished) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !finished) {
          loadNext();
        }
      },
      { rootMargin: '0px 0px 500px 0px', threshold: 0 }
    );

    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [loadNext, loading, finished]);

  const currentPost = loadedPosts[0];
  if (!currentPost) {
    return (
      <div className="site-content">
        <div className="site-container not-found-page">
          <p className="error-code">404</p>
          <h2>Article Not Found</h2>
          <p>This article doesn't exist or has been removed.</p>
          <Link to="/" className="btn-home">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div id="infinite-scroll-container" data-testid="infinite-scroll-container">
      {loadedPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          {index > 0 && <ArticleDivider />}
          <article
            className="site-container site-content"
            data-post-id={post.id}
            ref={el => { articleRefs.current[post.id] = el; }}
            data-testid={index === 0 ? 'article-main' : `article-infinite-${index}`}
          >
            <ArticleContent post={post} />
          </article>
        </React.Fragment>
      ))}

      {/* Sentinel — watched by IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1, margin: 0 }} aria-hidden="true" data-testid="scroll-sentinel" />

      {loading && (
        <div className="scroll-loader" role="status" aria-live="polite" data-testid="scroll-loader">
          <span className="scroll-loader__spinner" aria-hidden="true" />
          Loading next article…
        </div>
      )}

      {finished && (
        <div className="scroll-end" data-testid="scroll-end">
          You've reached the end.
          <Link to="/">Go back home &rarr;</Link>
        </div>
      )}
    </div>
  );
}
