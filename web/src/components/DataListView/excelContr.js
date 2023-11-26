import { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ExcelRenderer,  } from "react-excel-renderer";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button,SvgIcon,} from "@mui/material";
import {getDataListJSON, downloadExcel} from "./excelExport";
import { apiIP } from "../../config";
import ExcelImportAlertModal from "../DataDetailPage/excelImportAlertModal";

const navy =  '#0F3659';

function ExcelController(){
    //엑셀 업로드 성공 여부
    const [isImportSuccessed, setIsImportSuccessed] = useState(true);
    //엑셀 업로드 완료
    const [alertDone, setAlertDone] = useState(false);

    const fileRef = useRef(null);

    // 파일 선택 함수 
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        await handleExcelFile(file);
        setAlertDone(true);
    };

    // 선택한 엑셀 파일을 json으로 변환한 뒤 추가 API로 전송 
    const handleExcelFile = async(file) => {
        ExcelRenderer(file, (err, resp) => {
        if (err) {
            console.log(err);
        } else {
          for (let index = 1; index < resp.rows.length; index++){
          //let index = 1;
          const id =  resp.rows[index][0];
          // 파일 최종 수정 시간
          const lastModified = file.lastModified;
          console.log("cols", resp.cols ,"rows", resp.rows);
          //const sensory_eval = {};
          const heatedmeat_eval = {};
          const probexpt_data = {};
          // 엑셀 파일 값 -> JSON으로 변환 
          /*for (let i = 1; i < 6; i++) {
            resp.rows[index][i]
            ? sensory_eval[resp.rows[0][i]] = resp.rows[index][i]
            : sensory_eval[resp.rows[0][i]] = null
            ;
          }*/
          for (let i = 1; i < 6; i++) {
            resp.rows[index][i]
            ? heatedmeat_eval[resp.rows[0][i]] = resp.rows[index][i]
            : heatedmeat_eval[resp.rows[0][i]] = null
            ;
          }
          for (let i = 6; i<  resp.rows[0].length; i++) {
            resp.rows[index][i]
            ? probexpt_data[resp.rows[0][i]] = resp.rows[index][i]
            : probexpt_data[resp.rows[0][i]] = null
            ;
          }
          
         // 수정 api 전송을 위한 데이터 다듬기 
          // 수정 시간
          const lastModifiedDate = file.lastModifiedDate.toISOString().slice(0, -5);
          // period 계산  -> API 육류 데이터를 받아올 수 없음 ! 
          //const butcheryYmd = createdDate;//apiInput['butcheryYmd'];2023-10-04T20:44:40 
          /*const butcheryYmd = apiInput['butcheryYmd'];
          const year = butcheryYmd.slice(0,4);
          const month =  butcheryYmd.slice(4,6);
          const day = butcheryYmd.slice(6,);*/
          const butcheryDate = new Date(2023, 1, 1, 0, 0, 0);
        

          // period 계산 
          const elapsedMSec = lastModified - butcheryDate.getTime();
          const elapsedHour = elapsedMSec / 1000 / 60 / 60;
          console.log('elapsedHour', elapsedHour);

          //로그인한 유저 정보
          const userId = JSON.parse(localStorage.getItem('UserInfo'))["userId"];
          //const tempUserID = 'junsu0573@naver.com';
          // 1. 신선육 관능평가
          /*let rawMeatEvalReq = sensory_eval;
          rawMeatEvalReq = {
            ...rawMeatEvalReq,
            ['id'] : id,
            ["createdAt"] : lastModifiedDate,
            ["userId"] : tempUserID,//userData["userId"],
            ["seqno"] : 0,
            ["period"] : Math.round(elapsedHour),
          }

          console.log('raw eval', rawMeatEvalReq);
          
          const rawMeatEvalRes = JSON.stringify(rawMeatEvalReq);
    
*/
          // 2. 가열육 관능평가 데이터 
          // 데이터 수정 
          let heatedmeatEvalReq = heatedmeat_eval;
          //데이터 추가
          heatedmeatEvalReq = {
              ...heatedmeatEvalReq,
              ['id'] : id,
              ["createdAt"] : lastModifiedDate,
              ["userId"] : userId ,
              ["seqno"] : 0,
              ["period"] : Math.round(elapsedHour),
          }
          
          ///meat/add/heatedmeat_eval
          const heatedmeatEvalRes = JSON.stringify(heatedmeatEvalReq);
          console.log('heated eval:',heatedmeatEvalRes)
         try{
              const response  = fetch(`http://${apiIP}/meat/add/heatedmeat_eval`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: heatedmeatEvalRes,
              });
              //업로드에 실패한 경우
              response.then((res)=>{
                if (res.status === 404) {
                  setIsImportSuccessed(false);
                }
              });
          }catch(err){
              console.log('error')
              console.error(err);
              //업로드에 실패한 경우
              setIsImportSuccessed(false);
          }

          // 3. 실험실 데이터 

          let probexptReq = probexpt_data;
          probexptReq = {
              ...probexptReq,
              ['id'] : id,
              ['updatedAt'] : lastModifiedDate,
              ['userId'] :   userId ,
              ['seqno'] : 0,
              ['period'] :  Math.round(elapsedHour),
          }
          console.log('probexptReq:', probexptReq);
          //}
          // api 연결 /meat/add/probexpt_data
          const probexptRes = JSON.stringify(probexptReq);
          try{
              const response = fetch(`http://${apiIP}/meat/add/probexpt_data`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: probexptRes,
              });
              //업로드에 실패한 경우
              response.then((res)=>{
                if (res.status === 404) {
                  setIsImportSuccessed(false);
                }
              });
          }catch(err){
              console.log('error')
              console.error(err);
              //업로드에 실패한 경우
              setIsImportSuccessed(false);
          }
            
        } 
      }

        });
    };

    const [excelData ,setExcelData] = useState();
    const handleExcelExport = () => {
      downloadExcel(excelData);
    }
    useEffect(()=>{
      getDataListJSON().then((data)=>{
        setExcelData(data);
      });
    },[])
   
    return(
        <Box>
          {
            alertDone
            && <ExcelImportAlertModal setAlertDone={setAlertDone} isImportSuccessed={isImportSuccessed} setIsImportSuccessed={setIsImportSuccessed}/>
          }
          <input 
            class="form-control" 
            accept=".csv,.xlsx,.xls" 
            type="file" 
            id="formFile" 
            ref={fileRef}
            onChange={(e) => {handleFileChange(e);}} 
            style={{display:'none' }}
          />

          <Button 
            style={{color:navy, marginRight:'10px', backgroundColor:'white', border:`1px solid ${navy}`, height:'35px', borderRadius:'10px'}} 
            onClick={()=>{fileRef.current.click();}}
          >
            <div style={{display:'flex'}}>
              <SvgIcon fontSize="small">
                <ArrowUpOnSquareIcon />
              </SvgIcon>
            <span>Import</span>
            </div>  
          </Button>

          <Button 
            style={{color:navy , backgroundColor:'white', border:`1px solid ${navy}`, height:'35px', borderRadius:'10px'}} 
            onClick={handleExcelExport}
          >
            <div style={{display:'flex'}}>
              <SvgIcon fontSize="small">
                  <ArrowDownOnSquareIcon />
              </SvgIcon>
            <span>Export</span>
            </div>
          </Button>
        </Box>
    );
}

export default ExcelController;

const months =  {
  'Jan' : 1,
  'Feb' : 2,
  'Mar' : 3,
  'Apr' : 4,
  'May' : 5,
  'Jun' : 6,
  'Jul' : 7,
  'Aug' : 8,
  'Sep' : 9,
  'Oct' : 10,
  'Nov' : 11,
  'Dec' : 12,
};