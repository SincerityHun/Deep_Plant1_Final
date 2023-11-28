import { useState, useEffect } from "react";
import DataView from "./DataView";
import DataPAView from "./DataPAView";
import dataProcessing from "./dataProcessing";
import Spinner from "react-bootstrap/Spinner";
import { useDetailMeatDataFetch } from "../../API/getDetailMeatDataSWR";

//하나의 관리번호에 대한 고기 데이터를 API에서 GET해서 json 객체로 넘겨줌 
const DataLoad = ({id, page, currentUser}) => {
  const [detailData, setDetailData] = useState();
  // API fetch
  const { data, isLoading, isError } = useDetailMeatDataFetch(id) ;
  
  //데이터 가공 
  useEffect(()=>{
    if (data !== null && data !== undefined){
      setDetailData(dataProcessing(data));//
    }
  },[data]); 

  if (data === null) 
    return null;
  if (isLoading) 
    return ( // 데이터가 로드되지 않은 경우 로딩중 반환 
      <div>
        <Spinner animation="border" />
      </div>
  );
  if (isError) 
    return null;//경고 컴포넌트

  return(
    <>
      {
      detailData !== undefined 
      && ( page === "예측"
          ?<DataPAView currentUser={currentUser} dataProps={detailData}/>
          :<DataView page={page} currentUser={currentUser} dataProps={detailData}/>
      )
    }
    </>)

}

export default DataLoad;