import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnPosts, deletePost, updatePost } from "../api/posts.js";
import { useAuth } from "../hooks/useAuth.js";
import DashboardPostCard from "../components/posts/DashboardPostCard.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [togglingPostId, setTogglingPostId] = useState(null);

  useEffect(() => {
    async function loadOwnPosts() {
      try {
        setErrorMessage("");
        const data = await getOwnPosts();
        setPosts(data.data.posts);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load your posts.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOwnPosts();
  }, []);

  function handleGoToCreatePost() {
    navigate("/posts/new");
  }

  function handleEdit(postId) {
    navigate(`/posts/${postId}/edit`);
  }

  async function handleDelete(postId) {
    try {
      setDeletingPostId(postId);
      await deletePost(postId);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete post.");
    } finally {
      setDeletingPostId(null);
    }
  }

  async function handleTogglePublish(post) {
    try {
      setTogglingPostId(post.id);

      const data = await updatePost(post.id, {
        isPublished: !post.isPublished,
      });

      const updatedPost = data.data.post;

      setPosts((prevPosts) =>
        prevPosts.map((currentPost) => (currentPost.id === post.id ? updatedPost : currentPost)),
      );
    } catch (error) {
      setErrorMessage(error.message || "Failed to update publish status.");
    } finally {
      setTogglingPostId(null);
    }
  }

  if (isLoading) {
    return (
      <section>
        <h1>Profile</h1>
        <p>Loading your posts...</p>
      </section>
    );
  }

  return (
    <section>
      <div className="profile-header">
        <div>
          <h1>Profile</h1>
          <p className="post-card__meta">Logged in as {user?.username}</p>
        </div>

        <button type="button" className="nav-button" onClick={handleGoToCreatePost}>
          Create New Post
        </button>
      </div>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      {posts.length === 0 ? (
        <p>You have not created any posts yet.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <DashboardPostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              isDeleting={deletingPostId === post.id}
              isTogglingPublish={togglingPostId === post.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfilePage;
