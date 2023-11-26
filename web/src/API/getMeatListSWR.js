import useSWR from "swr"
import { apiIP } from "../config";

const fetcher = (...args) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No Meat Datas Found");
      default:
        return res.json();
    }
  });

export const useMeatListFetch = (offset, count, startDate, endDate) => {
    const { data, error } = useSWR(`http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=true`, fetcher);
    
    return {
      data,
      isLoading: !error && !data,
      error,
    };
  };