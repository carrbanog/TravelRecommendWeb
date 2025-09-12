// features/auth/login/model/types.ts
import type { AuthCredentials } from "../../type";

export type LoginResponse = {
  message: string;
  userDoc: {
    id: string;
    username: string;
    email: string;
    password?: string;
  };
};

export type loginData = AuthCredentials;
