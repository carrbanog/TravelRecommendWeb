import axios from "axios";
import type { UserData } from "./type";

export const signUp = async (data: UserData) => {
  const response = await axios.post("http://localhost:5000/signup", data);
  return response;
};
