import { useParams } from "react-router-dom";

function EditPostPage() {
  const { postId } = useParams();

  return (
    <section>
      <h1>Edit Post</h1>
      <p>This is a protected page for editing post #{postId}.</p>
    </section>
  );
}

export default EditPostPage;
