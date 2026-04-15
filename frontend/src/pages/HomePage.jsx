import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts.js";
import PostCard from "../components/posts/PostCard.jsx";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setErrorMessage("");
        const data = await getAllPosts();

        setPosts(data.posts);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Home</h1>
        <p>Loading posts...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Home</h1>
        <p className="form-error">{errorMessage}</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section>
        <h1>Home</h1>
        <p>No posts yet. Be the first to publish something.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Latest Posts</h1>

      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
