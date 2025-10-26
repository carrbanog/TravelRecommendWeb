import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useProfileQuery } from "../../entities/user/model/useProfileQuery";
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
  const { data, isError } = useProfileQuery();

  const login = (userData: User) => setUser(userData);

  const logout = () => setUser(null);

  useEffect(() => {
    if (data) {
      // console.log("Setting user from profile data:", data);
      setUser({ name: data.user.name, email: data.user.email });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.warn("❌ 사용자 인증 실패. 로그아웃 처리 중...");
      logout();
    }
  }, [isError]);
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
