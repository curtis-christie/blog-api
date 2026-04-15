import { useState } from "react";

function CommentForm({ onSubmit, isSubmitting }) {
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    const success = await onSubmit({ content: content.trim() });

    if (success) {
      setContent("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label className="form-field">
        <span>Leave a comment</span>
        <textarea
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="3"
          required
          disabled={isSubmitting}
        />
      </label>

      <button type="submit" className="nav-button" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
