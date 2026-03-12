import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <li className="post-card" data-testid={`post-card-${post.id}`}>
      {post.image && (
        <Link className="post-card__image-link" to={`/article/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <img
            className="post-card__image"
            src={post.image}
            alt={post.title}
            loading="lazy"
          />
        </Link>
      )}

      <p className="post-card__meta">{post.date}</p>

      <p className="post-card__category">
        <Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>
      </p>

      <h2 className="post-card__title">
        <Link to={`/article/${post.slug}`}>{post.title}</Link>
      </h2>
    </li>
  );
}
