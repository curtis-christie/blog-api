import { useAuth } from "../hooks/useAuth.js";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Profile</h1>
      <p>
        This is a protected page. In Phase 5, this will become the dashboard for the user’s posts.{" "}
        User:
        {user.username}
      </p>
    </section>
  );
}

export default ProfilePage;
