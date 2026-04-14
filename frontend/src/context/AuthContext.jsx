import { useMemo, useState } from "react";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("demoUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading] = useState(false);

  function demoLogin() {
    const fakeUser = {
      id: 1,
      username: "demoUser",
      email: "demo@example.com",
    };

    localStorage.setItem("demoUser", JSON.stringify(fakeUser));
    setUser(fakeUser);
  }

  function logout() {
    localStorage.removeItem("demoUser");
    setUser(null);
  }

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      demoLogin,
      logout,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
