import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Layout from "../components/layout/Layout.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProtectedRoute from "../components/routing/ProtectedRoutes.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import CreatePostPage from "../pages/CreatePostPage.jsx";
import EditPostPage from "../pages/EditPostPage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="posts/new" element={<CreatePostPage />} />
            <Route path="posts/:postId/edit" element={<EditPostPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
