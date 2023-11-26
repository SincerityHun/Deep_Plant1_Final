import { apiIP } from "../config";

export default async function getPredictedMeatList (offset, count, startDate, endDate) {
    // 나중에 토글 기능 추가
    const json = await (
        await fetch(
          `http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=true`
        )
      ).json();
   
    console.log("predicted fetch done!", json);

    return json;
  };