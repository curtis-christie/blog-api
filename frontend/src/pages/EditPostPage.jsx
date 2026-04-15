import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/posts.js";
import PostForm from "../components/posts/PostForm.jsx";

function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        setErrorMessage("");
        const data = await getPost(postId);
        setPost(data.data.post);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load post.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  async function handleUpdatePost(formData) {
    await updatePost(postId, formData);
    navigate("/profile");
  }

  if (isLoading) {
    return (
      <section>
        <h1>Edit Post</h1>
        <p>Loading post...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Edit Post</h1>
        <p className="form-error">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Edit Post</h1>

      <PostForm
        initialValues={{
          title: post.title,
          content: post.content,
          isPublished: post.isPublished,
        }}
        onSubmit={handleUpdatePost}
        submitLabel="Save Changes"
      />
    </section>
  );
}

export default EditPostPage;
