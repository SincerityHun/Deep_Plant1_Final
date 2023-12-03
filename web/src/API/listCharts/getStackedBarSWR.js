import useSWR from "swr";
import { apiIP } from "../../config";

const fetcher = (...args) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No StackedBar Data Found");
      default:
        return res.json();
    }
  }
);

export const useStackedBarFetch = (startDate, endDate) => {
    const { data, error } = useSWR(`http://${apiIP}/meat/statistic?type=2&start=${startDate}&end=${endDate}`, fetcher);
    return {
      data,
      isLoading: !error && !data,
      error,
    };
  };