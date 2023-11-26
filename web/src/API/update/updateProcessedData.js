import { computeCurrentDate } from "../../components/DataDetailPage/computePeriod";
import { apiIP } from "../../config";
export default async function updateProcessedData(processedInput,processed_data,processedMinute, i, id, userId, createdDate,elapsedHour ){
    
        const [yy,mm,dd] = computeCurrentDate();
        // 수정된 게 있는 경우 (input 만 비교 )

        //request body에 보낼 데이터 가공  
        let req = (processedInput);
        req = {
            ...req,
            ['id']: id,
            ['createdAt'] : createdDate,
            ['userId'] : userId,
            ['seqno'] : i+1,
            ['period'] : Math.round(elapsedHour),
            ['deepAging'] : {
                ['date'] : processed_data?processed_data['deepaging_data']['date']: yy+mm+dd,
                ['minute'] : Number(processedMinute?processedMinute:0),
            },
            
        }
        req && delete req['deepaging_data']
        

        ///meat/add/deep_aging_data로 처리육 수정 데이터 API 전송 
        const res = JSON.stringify(req);
        console.log("send img path", res);

        try{
            const response = await fetch(`http://${apiIP}/meat/add/sensory_eval`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: res,
            });
            if (!response.ok) {
                throw new Error('sensory_eval 서버에서 응답 코드가 성공(2xx)이 아닙니다.');
            }
            // 서버에서 받은 JSON 응답 데이터를 해석
            const responseData = await response.json(); 
            return responseData;
        }catch(err){
            console.log('error')
            console.error(err);
        }
}