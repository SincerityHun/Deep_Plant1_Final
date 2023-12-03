import useSWR from "swr";
import { apiIP } from "../config";

const fetcher = (...args) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No Rejected Datas Found");
      default:
        return res.json();
    }
});

export const useRejectedMeatListFetch = (offset, count, startDate, endDate) => {
    const {data, error} = useSWR(`http://${apiIP}/meat/status?statusType=1&offset=${offset}&count=${count}&start=${startDate}&end=${endDate}`, fetcher);
    console.log('rejected', data);
    return {
        data,
        isLoading: !error && !data,
        error,
    };
  };