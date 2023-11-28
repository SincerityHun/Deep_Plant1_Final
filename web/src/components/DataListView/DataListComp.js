import { useState, useEffect, } from "react";
import { Box, } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import DataList from "./DataList";
import Pagination from "./Pagination";
import { useMeatListFetch } from "../../API/getMeatListSWR";

const DataListComp=({startDate, endDate, pageOffset})=>{
  // 고기 데이터 목록
  const [meatList, setMeatList] = useState([]);
  // 데이터 전체 개수
  const [totalData, setTotalData] = useState(0);
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
    
  // 한페이지당 보여줄 개수 
  const count = 6; 

  // 데이터 가공
  const processMeatDatas = (data) =>{
      setTotalData(data["DB Total len"]);
      let meatData = [];
      data.id_list.map((m) => {
        meatData = [...meatData, data.meat_dict[m]];
      });
      setMeatList(meatData);
  }
  
  // API fetch
  const { data, isLoading, isError } = useMeatListFetch(currentPage-1, count, startDate, endDate) ;
  console.log('meat list:', data);
  
  // 데이터 가공 
  useEffect(() => {
    if (data !== null && data !== undefined) {
      processMeatDatas(data);
    }
  }, [data]);

  if (data === null) return null;
  if (isLoading) return ( // 데이터가 로드되지 않은 경우 로딩중 반환 
      <div >
        <div style={style.listContainer} >  
                <Spinner animation="border" />
        </div>
        <Box sx={style.paginationBar}>
          <Pagination totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </Box>
      </div>
  );
  if (isError) return null;//경고 컴포넌트
 
  
  return (
    <div >
      <div style={style.listContainer} >
        {
          meatList !== undefined
          &&
            <DataList
              meatList={meatList}
              pageProp={'list'}
              offset={currentPage-1}
              count={count}
              startDate={startDate}
              endDate={endDate}
              pageOffset={pageOffset}
            />
        }
      </div>
      <Box sx={style.paginationBar}>
        <Pagination totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Box>
    </div>
  );
      
}

export default DataListComp;


const style = {
  listContainer :{
    textAlign: "center",
    width: "100%",
    paddingRight:'0px',
    paddingBottom: "0",
    height:'400px',
  },
  paginationBar : {
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
   
  },
}