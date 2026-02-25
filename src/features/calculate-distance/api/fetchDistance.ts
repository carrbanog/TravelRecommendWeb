import { apiClient } from "@/shared/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchDistance = async () => {
  const res = await axios.get("http://localhost:5000/calculate-distance");
  return res;
};

export const useFetchDistanceQuery = () => {
  return useQuery({
    queryKey: ["distance"],
    queryFn: () => fetchDistance(),
  });
};
