import { apiIP } from "../config";

//데이터 예측 버튼 
function HandlePredictClick(butcheryYmd, processed_data_seq_length, id){
    //로그인한 유저 정보
    const userId = JSON.parse(localStorage.getItem('UserInfo'))["userId"];

    // period 계산 
    //const butcheryYmd = api_data['butcheryYmd'];
    const year = butcheryYmd.slice(0,4);
    const month =  butcheryYmd.slice(4,6);
    const day = butcheryYmd.slice(6,);

    const butcheryDate = new Date(year, month, day, 0, 0, 0);
    const elapsedMSec = new Date().getTime() - butcheryDate.getTime();
    const elapsedHour = elapsedMSec / 1000 / 60 / 60;

    //const len = processed_data_seq.length;
    //seqno for loop
   // console.log('len',len);
    for (let i = 0; i < processed_data_seq_length; i++){
        let req = {
            ["id"]:id,
            ["seqno"]:i,
            ["userId"]:userId,
            ["period"]:Math.round(elapsedHour),
        };

        const res = JSON.stringify(req);
        try{
            fetch(`http://${apiIP}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: res,
            });
           console.log(res);
          //  getData(seqno);
                // 강제 새로고침
          //  window.location.reload();
            
        }catch(err){
            console.log('error')
            console.error(err);
        }
    }  
}

export default HandlePredictClick;