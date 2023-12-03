import useSWR from "swr";
import { apiIP } from "../config";

const fetcher = (...args) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No Meat Data Found");
      default:
        return res.json();
    }
  }
);

export const useDetailMeatDataFetch = (id) => {
  const { data, error } = useSWR(`http://${apiIP}/meat/get?id=${id}`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};