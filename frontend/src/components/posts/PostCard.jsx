import { useState } from "react";
import { formatDate } from "../../utils/formatDate.js";
import { getCommentsByPost, createComment } from "../../api/comments.js";
import { useAuth } from "../../hooks/useAuth.js";
import CommentList from "../comments/CommentList.jsx";
import CommentForm from "../comments/CommentForm.jsx";

function PostCard({ post }) {
  const { isAuthenticated } = useAuth();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  async function handleToggleComments() {
    const nextOpenState = !isCommentsOpen;
    setIsCommentsOpen(nextOpenState);

    if (nextOpenState && !commentsLoaded) {
      try {
        setCommentsError("");
        setIsLoadingComments(true);

        const data = await getCommentsByPost(post.id);

        setComments(data.comments);
        setCommentsLoaded(true);
      } catch (error) {
        setCommentsError(error.message || "Failed to load comments.");
      } finally {
        setIsLoadingComments(false);
      }
    }
  }

  async function handleCreateComment(commentData) {
    try {
      setIsSubmittingComment(true);
      setCommentsError("");

      const data = await createComment(post.id, commentData);

      const newComment = data.comment;

      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentsLoaded(true);

      return true;
    } catch (error) {
      setCommentsError(error.message || "Failed to create comment.");
      return false;
    } finally {
      setIsSubmittingComment(false);
    }
  }

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
        <button type="button" className="nav-button" onClick={handleToggleComments}>
          {isCommentsOpen ? "Hide Comments" : "Show Comments"}
        </button>
      </footer>

      {isCommentsOpen ? (
        <div className="post-card__comments">
          {isLoadingComments ? <p>Loading comments...</p> : null}

          {commentsError ? <p className="form-error">{commentsError}</p> : null}

          {!isLoadingComments && !commentsError ? <CommentList comments={comments} /> : null}

          {isAuthenticated ? (
            <CommentForm onSubmit={handleCreateComment} isSubmitting={isSubmittingComment} />
          ) : (
            <p className="comment-login-message">Log in to leave a comment.</p>
          )}
        </div>
      ) : null}
    </article>
  );
}

export default PostCard;
