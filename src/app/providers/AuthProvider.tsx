import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import api from "../../shared/api/axiosInstance";
type User = {
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => setUser(userData);

  const logout = () => setUser(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getprofile", {
          withCredentials: true,
        });
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
        })
        console.log("User profile response:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
