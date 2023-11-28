import { useState, useEffect } from "react";
import { Box, } from "@mui/material";
// 데이터 목록 컴포넌트
import DataList from "./DataList";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "./Pagination";
import './DataListComp.module.css'
import getRejectedMeatList from "../../API/getRejectedMeatList";
const navy =  '#0F3659';

const RejectedDataListComp=({startDate, endDate, pageOffset})=>{
    const [isLoaded, setIsLoaded] = useState(true);

    const [meatList, setMeatList] = useState([]);
    //현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 전체 데이터 
    const [totalData, setTotalData] = useState(0);
    const offset = 0; // 현재 로드하는 페이지의 인덱스
    const count = 6; // 한페이지당 보여줄 개수 
    const totalPages = Math.ceil(totalData / count);

    //api fetch
    const handleRejectedMeatListLoad = async() => { 
      const json = await getRejectedMeatList(offset, count, startDate, endDate);
      // 전체 데이터 수
      setTotalData(json["DB Total len"]);
      // 반려데이터
      setMeatList(json['반려']);
      // 데이터 로드 성공
      setIsLoaded(true);
    };
  
    //데이터 api 로 부터 fetch
    useEffect(() => {
      handleRejectedMeatListLoad(currentPage - 1);
    }, [startDate, endDate, currentPage]);

    return(
        <div>
          <div style={style.listContainer}>
            {isLoaded ? (
              //데이터가 로드된 경우 데이터 목록 반환
              <DataList meatList={meatList} pageProp={'reject'} offset={offset} count={count} totalPages={totalPages} pageOffset={pageOffset}/>
            ) : (
              // 데이터가 로드되지 않은 경우 로딩중 반환
              <Spinner animation="border"/>
            )}
          </div>
          <Box sx={style.paginationBar}>
            <Pagination totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </Box>
      </div>
    );
}

export default RejectedDataListComp;
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
  deletBtnContainer : {
    display:'flex', 
    margin:'20px 0', 
    padding:'0px 100px', 
    width:'100%', 
    justifyContent:'start'
  },
  deleteBtn :{
    backgroundColor:"transparent",
    color : navy,
    fontWeight : '600',
  }
}