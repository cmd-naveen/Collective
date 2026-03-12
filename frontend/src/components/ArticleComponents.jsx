import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

// ── Related Posts (6 items, grid layout with images) ────────────────────────────────
export function RelatedPosts({ currentPost }) {
  // Get 6 related posts from same category, then fill from other categories if needed
  let related = posts
    .filter(p => p.category.slug === currentPost.category.slug && p.id !== currentPost.id)
    .slice(0, 6);
  
  // If we don't have 6, fill with posts from other categories
  if (related.length < 6) {
    const otherPosts = posts
      .filter(p => p.id !== currentPost.id && !related.find(r => r.id === p.id))
      .slice(0, 6 - related.length);
    related = [...related, ...otherPosts];
  }

  if (related.length === 0) return null;
  
  return (
    <div className="related-articles" data-testid="related-articles">
      <h3 className="related-articles__title">Related Articles</h3>
      <div className="related-articles__grid">
        {related.map(p => (
          <Link key={p.id} to={`/article/${p.slug}`} className="related-card" data-testid={`related-card-${p.id}`}>
            <div className="related-card__image-wrap">
              <img src={p.image} alt={p.title} className="related-card__image" loading="lazy" />
            </div>
            <p className="related-card__category">{p.category.name}</p>
            <h4 className="related-card__title">{p.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Author Bio Box (bottom of article) ───────────────────────
export function AuthorBio({ author }) {
  return (
    <div className="author-bio" data-testid="author-bio">
      <img className="author-bio__avatar" src={author.avatar} alt={author.name} loading="lazy" />
      <div className="author-bio__content">
        <h3 className="author-bio__name">
          <Link to={`/author/${author.slug}`}>{author.name}</Link>
        </h3>
        <p className="author-bio__text">{author.bio}</p>
      </div>
    </div>
  );
}

// ── Author Inline (below title, replaces date meta) ──────────
function AuthorInline({ author }) {
  return (
    <div className="article-author-inline" data-testid="article-author-inline">
      <img className="article-author-inline__avatar" src={author.avatar} alt={author.name} />
      <div className="article-author-inline__info">
        <Link className="article-author-inline__name" to={`/author/${author.slug}`}>
          {author.name}
        </Link>
        <p className="article-author-inline__bio">{author.bio}</p>
      </div>
    </div>
  );
}

// ── Full Article Content ─────────────────────────────────────
export function ArticleContent({ post }) {
  return (
    <>
      {/* Featured image — 5:3 ratio, contained within content width */}
      {post.image && (
        <div className="article-featured-image-wrapper">
          <img
            className="article-featured-image"
            src={post.image}
            alt={post.title}
            loading="lazy"
            data-testid="article-featured-image"
          />
          {post.imageCaption && (
            <p className="article-photo-credit">{post.imageCaption}</p>
          )}
        </div>
      )}

      {/* Category */}
      <div className="article-categories" data-testid="article-category">
        <Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>
      </div>

      {/* H1 Title */}
      <h1 className="article-title" data-testid="article-title">{post.title}</h1>

      {/* Author inline bio — below title, NO date */}
      <AuthorInline author={post.author} />

      {/* Article body */}
      <div
        className="article-body"
        data-testid="article-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related posts */}
      <RelatedPosts currentPost={post} />

      {/* Author bio box at bottom */}
      <AuthorBio author={post.author} />
    </>
  );
}
