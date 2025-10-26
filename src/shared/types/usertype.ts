export type UserData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginData = Pick<UserData, "email" | "password">;

export type ProfileData = { user: Pick<UserData, "name" | "email"> };
