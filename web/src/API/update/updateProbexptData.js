import { apiIP } from "../../config";
export default async function updateProbexptData(data,i, id, createdDate, userId, elapsedHour,){
      //request body에 보낼 데이터 가공    
        let req = {
            ...data,
        }
        req = {
            ...req,
            ['id'] : id,
            ['updatedAt'] : createdDate,
            ['userId'] :  userId,
            ['seqno'] : i,
            ['period'] :  Math.round(elapsedHour),
        }
        // /meat/add/probexpt_data로 실험 수정 데이터 전송 
        const res = JSON.stringify(req);
        try{
            const response = await fetch(`http://${apiIP}/meat/add/probexpt_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: res,
            });
            if (!response.ok) {
                throw new Error('probexpt_data 서버에서 응답 코드가 성공(2xx)이 아닙니다.');
            }
            // 서버에서 받은 JSON 응답 데이터를 해석
            const responseData = await response.json(); 
            return responseData;
        }catch(err){
            console.log('error')
            console.error(err);
        }
}