import { formatDate } from "../../utils/formatDate.js";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <header className="post-card__header">
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__meta">Posted on {formatDate(post.createdAt)}</p>
      </header>

      <div className="post-card__content">
        <p>{post.content}</p>
      </div>

      <footer className="post-card__footer">
        <button type="button" className="nav-button">
          Comments
        </button>
      </footer>
    </article>
  );
}

export default PostCard;
