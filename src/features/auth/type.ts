export type AuthCredentials = {
  email: string;
  password: string;
};

export type UserData = AuthCredentials & {
  name: string;
  passwordConfirm: string;
};

export type loginData = AuthCredentials;
