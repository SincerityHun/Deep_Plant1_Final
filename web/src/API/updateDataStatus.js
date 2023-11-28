import { apiIP } from "../config";

export default async function updateDataStatus(confirmVal, id, setStateChanged){

    try{
        const response = await fetch(`http://${apiIP}/meat/${confirmVal}?id=${id}`);
        setStateChanged(true);
        if (!response.ok) {
            throw new Error('서버에서 응답 코드가 성공(2xx)이 아닙니다.');
        }
        const responseData = await response.json(); 
        return responseData;
    }catch(err){
        console.error(err);
    }
}