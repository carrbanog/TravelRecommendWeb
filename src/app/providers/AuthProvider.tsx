import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import api from "../../shared/api/axiosInstance";
import { useProfileQuery } from '../../entities/user/model/useProfileQuery';
import { set } from 'date-fns';
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
  const {data, isError} = useProfileQuery();

  const login = (userData: User) => setUser(userData);

  const logout = () => setUser(null);

  useEffect(() => {
    if(data){
      console.log("Setting user from profile data:", data);
      setUser({ name: data.user.name, email: data.user.email });
    }
  }, [data])
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
