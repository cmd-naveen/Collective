import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

export function RelatedPosts({ currentPost }) {
  const related = posts
    .filter(p => p.category.slug === currentPost.category.slug && p.id !== currentPost.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="related-posts" data-testid="related-posts">
      <p className="related-posts__label">Related Articles</p>
      <ul className="related-posts__list">
        {related.map(p => (
          <li key={p.id}>
            <Link to={`/article/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AuthorBio({ author }) {
  return (
    <div className="author-bio" data-testid="author-bio">
      <img className="author-bio__avatar" src={author.avatar} alt={author.name} loading="lazy" />
      <div className="author-bio__content">
        <h3 className="author-bio__name">
          <a href={`/author/${author.slug}`}>{author.name}</a>
        </h3>
        <p className="author-bio__text">{author.bio}</p>
      </div>
    </div>
  );
}

export function ArticleContent({ post }) {
  return (
    <>
      {post.image && (
        <>
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
        </>
      )}

      <div className="article-categories" data-testid="article-category">
        <Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>
      </div>

      <h1 className="article-title" data-testid="article-title">{post.title}</h1>

      <div className="article-meta" data-testid="article-meta">
        <img className="author-avatar" src={post.author.avatar} alt={post.author.name} />
        <a className="author-name-link" href={`/author/${post.author.slug}`}>
          {post.author.name}
        </a>
        <span className="meta-sep" aria-hidden="true">&middot;</span>
        <time>{post.date}</time>
      </div>

      <div
        className="article-body"
        data-testid="article-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <RelatedPosts currentPost={post} />
      <AuthorBio author={post.author} />
    </>
  );
}
