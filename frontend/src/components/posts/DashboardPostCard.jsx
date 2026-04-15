import { formatDate } from "../../utils/formatDate.js";

function DashboardPostCard({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
  isDeleting,
  isTogglingPublish,
}) {
  return (
    <article className="post-card">
      <header className="post-card__header">
        <div className="dashboard-post-header">
          <h2 className="post-card__title">{post.title}</h2>

          <span className={post.isPublished ? "status-badge published" : "status-badge draft"}>
            {post.isPublished ? "Published" : "Draft"}
          </span>
        </div>

        <p className="post-card__meta">Created {formatDate(post.createdAt)}</p>
      </header>

      <div className="post-card__content">
        <p>{post.content}</p>
      </div>

      <footer className="dashboard-post-actions">
        <button type="button" className="nav-button" onClick={() => onEdit(post.id)}>
          Edit
        </button>

        <button
          type="button"
          className="nav-button"
          onClick={() => onTogglePublish(post)}
          disabled={isTogglingPublish}
        >
          {isTogglingPublish ? "Saving..." : post.isPublished ? "Unpublish" : "Publish"}
        </button>

        <button
          type="button"
          className="nav-button danger-button"
          onClick={() => onDelete(post.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </footer>
    </article>
  );
}

export default DashboardPostCard;
