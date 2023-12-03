import { useState, useEffect , useRef} from "react";
// react-bootstrap
import {Card} from "react-bootstrap";
// icons
import {FaArrowLeft,FaArrowRight, FaUpload,} from  "react-icons/fa";
// mui 
import { IconButton, } from '@mui/material';
// 이미지 수정 api 호출 
import updateRawData from "../../../API/update/updateRawData";
import updateProcessedData from "../../../API/update/updateProcessedData";
import uploadNewImgToFirebase from "../../../API/firebase/uploadNewImgToFirebase";

import { TIME_ZONE } from "../../../config";
import { computePeriod } from "../computePeriod";

const navy =  '#0F3659';

const MeatImgsCard=(
    {edited, page, raw_img_path,processed_img_path, setIsUploadingDone, id,raw_data, setIsLimitedToChangeImage,butcheryYmd, processedInput, processed_data, processedMinute }
    )=>{
    // 1.이미지 파일 변경 
    const fileRef = useRef(null);
    // 이미지 미리보기 or 이미지 변경 될 때 마다 firebase 업로드 
    const [isImgChanged, setIsImgChanged] = useState(false);

    const updatePreviews = (reader)=>{
        let newImages = imgArr;
        newImages[currentIdx] = reader.result;
        setImgArr(newImages);
    }

    const handleImgChange =(newImgFile)=>{
        if (newImgFile){
            console.log('new img file', newImgFile)
            const fileName = id+'-'+currentIdx+'.png';
            const folderName = "sensory_evals";
            const reader = new FileReader();
            //로그인한 유저 정보 -> 임시로 저장
            const userId = JSON.parse(localStorage.getItem('UserInfo'))["userId"];
            // 수정 시간
            const createdDate = new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5);
            // period 계산 
            const elapsedHour = computePeriod(butcheryYmd);
            // 파일에서 이미지 선택 
            reader.onload = async() => {
                //업로드 중 메세지를 띄우기 위한 변수
                setIsUploadingDone(false);
                // firebase에 업로드
                await uploadNewImgToFirebase(newImgFile, folderName, fileName, setIsUploadingDone);

                // 원육 이미지 수정 api 호출 currentIdx == 0 
                if (currentIdx === 0){
                    const response = updateRawData(raw_data, id, userId, createdDate,elapsedHour, )
                    response.then((response)=>{
                        if (response.statusText === "NOT FOUND"){
                            setIsLimitedToChangeImage(true)//실패시
                        }else{
                            updatePreviews(reader);//성공시
                            setIsImgChanged(true);
                        }
                        setIsUploadingDone(true);// 업로드 중 화면 중지
                    });
                    //.then 문법 or await 사용 
                    // 실패 시 
                    console.log('limit to change',response.statusText); 

                }
                else{
                    // 처리육 수정 api 호출 이미지인 경우 0이상 
                    const i = currentIdx - 1;          
                    await updateProcessedData(
                        processedInput[i],processed_data[i],processedMinute[i],  i, id, userId, createdDate,elapsedHour)
                        .then((response) => {
                            console.log('처리육 이미지 수정 POST요청 성공:', response);
                            updatePreviews(reader);
                            setIsImgChanged(true);
                        })
                        .catch((error) => {
                            console.error('처리육 이미지 수정 POST 요청 오류:', error);
                            setIsLimitedToChangeImage(true)//실패시
                        })
                        setIsUploadingDone(true);// 업로드 중 화면 중지
                    ;
                }    
            };

            reader.readAsDataURL(newImgFile);
            
        }
    } 

    // 2.이미지 배열 만들기 
    const [imgArr,setImgArr] = useState([raw_img_path,]);
    useEffect(()=>{
        (processed_img_path.length !== 0)
        ? //{}이 아닌 경우 
        setImgArr([
            ...imgArr,
            ...processed_img_path,
        ])
        ://{}인 경우 -> 1회차 처리육 정보 입력을 위해 null 생성 
        setImgArr([
            ...imgArr,
            null,
        ])
    },[]);

    // 이미지 배열 페이지네이션 
    const [currentIdx, setCurrIdx] = useState(0);

    const handleNextClick = () => {setCurrIdx((prev)=> (prev+1) % imgArr.length);}

    const handlePrevClick = () =>{setCurrIdx((prev)=> (prev-1) % imgArr.length);}

    const handleNumClick = (e) => {setCurrIdx(e.target.outerText-1);}

    
    return(
        <Card style={{ width: "27vw", margin:'0px 10px',boxShadow: 24,}}>
            {/* 1.1. 이미지 */}
            <Card.Body>
                {/**이미지 제목 */}
                <Card.Text style={{display:'flex', justifyContent:'space-between', alignItems:'center',}}>
                    {// 이미지 제목 
                        currentIdx === 0
                        ?<div style={{color:'#002984', height:"40px", fontSize:'18px', fontWeight:'800'}}>원육이미지</div>
                        :<div style={{color:'#002984', height:"40px", fontSize:'18px', fontWeight:'800'}}>딥에이징 {currentIdx}회차 이미지</div>
                    }
                    <div style={{display:'flex'}}>            
                        {page === '수정및조회'
                        &&<div>
                            <input className="form-control" id="formFile" 
                                accept="image/jpg,impge/png,image/jpeg,image/gif" 
                                type="file" 
                                ref={fileRef}
                                onChange={(e) => {handleImgChange(e.target.files[0]); }} 
                                style={{ marginRight: "20px", display:'none' }}/>
                            {
                            edited
                            &&
                            <IconButton type="button" className="btn btn-success" style={{height:"40px", width:'160px',border:`1px solid ${navy}`, borderRadius:'5px'}} 
                                onClick={()=>{fileRef.current.click()}}>
                                <span style={{color:`${navy}`, fontSize:'16px', marginRight:'5px'}}>
                                    이미지 업로드
                                </span>
                                <FaUpload/>
                            </IconButton>
                            }
                        </div>
                        }
                    </div> 
                </Card.Text>
                {/**이미지 */}
                <Card.Text>  
                    <div style={{height:'350px',width:"100%",borderRadius:'10px'}}>
                        {// 실제 이미지 
                        imgArr[currentIdx]
                        ? isImgChanged === true 
                            ?/*이미지 미리 보기*/<img ng-src="data:image/jpeg;base64,{{image}}" src={imgArr[currentIdx]}  alt={`Image ${currentIdx + 1}`} style={{height:'350px',width:"400px",objectFit:'contain'}}/>
                            :<img ng-src="data:image/jpeg;base64,{{image}}" src={imgArr[currentIdx]+"?time=" + new Date() }  alt={`Image ${currentIdx + 1}`} style={{height:'350px',width:"400px",objectFit:'contain'}}/>
                        :<div style={{height:'350px',width:"400px", display:'flex', justifyContent:'center', alignItems:'center'}}>이미지가 존재하지 않습니다.</div>
                        }
                    </div>
                </Card.Text>
                {/**페이지네이션 */}
                <Card.Text style={{display:'flex', justifyContent:'center',alignItems:'center',}}>
                    <IconButton 
                        variant="contained" 
                        size="small" 
                        sx={{height:'35px', width:'35px', borderRadius:'10px', padding:'0', border:'1px solid black'}} 
                        onClick={handlePrevClick}
                        disabled={currentIdx === 0}
                    >
                        <FaArrowLeft/>
                    </IconButton>
                    <div style={{display:'flex',  justifyContent:'center', margin:'0px 5px',}}>
                    {// 페이지네이션 
                        Array.from({ length: imgArr.length }, (_, idx)=>(
                            <div 
                                value={idx} 
                                style={currentIdx === idx ? divStyle.currDiv : divStyle.notCurrDiv} 
                                onClick={(e)=>handleNumClick(e)}>
                                {idx + 1}
                            </div>
                        ))
                    } 
                    </div>
                    <IconButton 
                        variant="contained" 
                        size="small" 
                        sx={{height:'35px', width:'35px', borderRadius:'10px', padding:'0', border:'1px solid black'}} 
                        onClick={handleNextClick}
                        disabled={currentIdx === imgArr.length-1}
                    >
                        <FaArrowRight/>
                    </IconButton>
                </Card.Text>
            </Card.Body>
        </Card>
    );

}

export default MeatImgsCard;

const divStyle = {
    currDiv :{
        height:"fit-content", 
        width:"fit-content", 
        padding:'10px',
        borderRadius : '5px', 
        color:navy,
    },
    notCurrDiv :{
        height:"100%", 
        width:"fit-content", 
        borderRadius : '5px',
        padding:'10px', 
        color:'#b0bec5',
    },
}