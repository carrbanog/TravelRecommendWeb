import type { AuthCredentials } from "../../type";

export type UserData = AuthCredentials & {
  name: string;
  passwordConfirm: string;
};

export type SignupResponse = {
  message: string;
  user: {
    email: string;
  };
};
