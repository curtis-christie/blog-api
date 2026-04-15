import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts.js";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setErrorMessage("");
        const data = await getAllPosts();

        const postsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.data?.posts)
              ? data.data.posts
              : Array.isArray(data.posts)
                ? data.posts
                : [];
        setPosts(postsArray);
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
        <p>No published posts yet.</p>
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
