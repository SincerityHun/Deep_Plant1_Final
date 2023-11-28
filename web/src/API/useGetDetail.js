import { useEffect, useState } from "react";
import axios from "axios";
import { apiIP } from "../config";

export default function useGetDetail(id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://${apiIP}/meat/get?id=${id}`).then((res) => setData(res.data));
  }, [id]);

  return data;
}