import axios from "axios";
import type { loginData } from "../type";

export const loginApi = async (data: loginData) => {
  const response = await axios.post("http://localhost:5000/login", data);
  return response;
};
