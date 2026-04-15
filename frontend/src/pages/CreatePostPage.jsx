import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts.js";
import PostForm from "../components/posts/PostForm.jsx";

function CreatePostPage() {
  const navigate = useNavigate();

  async function handleCreatePost(formData) {
    await createPost(formData);
    navigate("/profile");
  }

  return (
    <section>
      <h1>Create Post</h1>
      <PostForm
        initialValues={{ title: "", content: "", isPublished: false }}
        onSubmit={handleCreatePost}
        submitLabel="Create Post"
      />
    </section>
  );
}

export default CreatePostPage;
