import { apiIP } from "../../config";

export default async function updateRawData(raw_data, id, userId, createdDate,elapsedHour, ){

    //request body에 보낼 데이터 가공
    let req = {
        ...raw_data,
    }
    req = {
        ...req,
        ['id'] : id,
        ["createdAt"] : createdDate,
        ["userId"] : userId,
        ["seqno"] : 0,
        ["period"] : Math.round(elapsedHour),
    }
    
    // /meat/add/sensory_eval로 원육 수정 데이터 API 전송 
    try{
        const response  = await fetch(`http://${apiIP}/meat/add/sensory_eval`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
        });
        /*if (!response.ok) {
            throw new Error('sensory_eval 서버에서 응답 코드가 성공(2xx)이 아닙니다.');
        }
        // 서버에서 받은 JSON 응답 데이터를 해석*/
        
        //const responseData = await response.json(); 
        return response;
    }catch(err){
        console.log('error')
        console.error(err);
    }
}