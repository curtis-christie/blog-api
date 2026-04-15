import { useState } from "react";

function PostForm({
  initialValues = { title: "", content: "", isPublished: false },
  onSubmit,
  submitLabel,
}) {
  const [formData, setFormData] = useState({
    title: initialValues.title || "",
    content: initialValues.content || "",
    isPublished: initialValues.isPublished || false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrorMessage(error.message || "Failed to save post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label className="form-field">
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="form-field">
        <span>Content</span>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
        <span>Publish this post</span>
      </label>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <button type="submit" className="nav-button" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
