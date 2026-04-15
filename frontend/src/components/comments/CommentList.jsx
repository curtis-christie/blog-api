import { formatDate } from "../../utils/formatDate.js";

function CommentList({ comments }) {
  if (!comments.length) {
    return <p className="comment-empty">No comments yet.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <article key={comment.id} className="comment-card">
          <p className="comment-card__meta">
            {comment.author?.username || "Unknown user"} · {formatDate(comment.createdAt)}
          </p>

          <p className="comment-card__content">{comment.content}</p>
        </article>
      ))}
    </div>
  );
}

export default CommentList;
