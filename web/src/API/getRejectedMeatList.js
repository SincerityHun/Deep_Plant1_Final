import { apiIP } from "../config";

export default async function getRejectedMeatList (offset, count, startDate, endDate) {
    const json = await (
        await fetch(`http://${apiIP}/meat/status?statusType=1&offset=${offset}&count=${count}&start=${startDate}&end=${endDate}`)
    ).json();
   
    console.log("rejected fetch done!", json);

    return json;
  };