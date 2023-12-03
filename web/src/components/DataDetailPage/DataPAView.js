import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
//mui
import './imgRot.css';
import { TextField, Autocomplete} from '@mui/material';
// import tables
import RawTable from "./tablesComps/rawTable";
import PredictedRawTable from "./tablesComps/predictedRawTable";
import ProcessedTablePA from "./tablesComps/processedTablePA";
import PredictedProcessedTablePA from "./tablesComps/predictedProcessedTablePA";

import { computePeriod } from "./computePeriod";
import { apiIP } from "../../config";

function DataPAView({ currentUser ,dataProps}){
    //데이터 받아오기 -> props 로 전달로 변경
    const { id, userId, createdAt,qrImagePath,raw_img_path, raw_data,processed_data,api_data, processed_data_seq, processed_minute , processed_img_path } = dataProps;

    // 처리육 및 실험 회차 토글  
    useEffect(()=>{
        options = processed_data_seq;
    },[])
    const [processed_toggle, setProcessedToggle] = useState('1회');
    const [processedToggleValue, setProcessedToggleValue] = useState('');
    
    const [seqno, setSeqno] = useState(0);

    //이미지 파일
    const [previewImage, setPreviewImage] = useState(raw_img_path);
    const [dataXAIImg ,setDataXAIImg] = useState(null);
    const [gradeXAIImg, setGradeXAIImg] = useState(null);

    //예측 post
    const [isPredictedDone, SetIsPredictedDone] = useState(true); // 화면 로딩중 표시를 위한 것


   // 예측 데이터 fetch
    const [loaded, setLoaded] = useState(false);
    const [dataPA, setDataPA] = useState(null);
    const getPredictedData = async (seqno) => {
        try {
            const response = await fetch(`http://${apiIP}/predict/get?id=${id}&seqno=${seqno}`);
            if (!response.ok){
                throw new Error('Network response was not ok', id, '-',seqno);
            }
            const json = await (response).json();
            console.log("connected PA!!- seqno",seqno, json);
            setDataPA(json);
            setLoaded(true);
            
        }catch (error){
            console.error('Error fetching data seqno-', seqno,":", error);
            setDataPA(null);
            setDataXAIImg(null);
            setGradeXAIImg(null);
        }
    };

    useEffect(()=>{
        //XAI 이미지 로드
        dataPA && setDataXAIImg(dataPA.xai_imagePath);
        dataPA && setGradeXAIImg(dataPA.xai_gradeNum_imagePath);
    },[seqno, id]);

    //set image path
    useEffect(()=>{
        //XAI 이미지 로드
        console.log('to load ',dataPA && dataPA.xai_imagePath);
        dataPA ? setDataXAIImg(dataPA.xai_imagePath) : console.log('null');
        dataPA && setGradeXAIImg(dataPA.xai_gradeNum_imagePath); 
    },[dataPA,loaded,id]);
    
    //데이터 예측 버튼 
    const handlePredictClick=async()=>{
        //로그인한 유저 정보
        const userId = JSON.parse(localStorage.getItem('UserInfo'))["userId"];
        //const tempUserID = 'junsu0573@naver.com';
        // period 계산 
        const elapsedHour = computePeriod(api_data['butcheryYmd']);
        
        const len = processed_data_seq.length;
        //seqno for loop
        SetIsPredictedDone(false);
        for (let i = 0; i < len; i++){
            let req = {
                ["id"]:id,
                ["seqno"]:i,
                ["userId"]:userId,
                ["period"]:Math.round(elapsedHour),
            };
    
            const res = JSON.stringify(req);
            try{
                await fetch(`http://${apiIP}/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: res,
                });
                console.log("predict result-",seqno,res);
                await getPredictedData(seqno);
                
                // 강제 새로고침
                //window.location.reload();
                
            }catch(err){
                console.log('error')
                console.error(err);
            }
            SetIsPredictedDone(true);
        }
    }

    useEffect(()=>{
        // 초기에 데이터 로드
        getPredictedData(0);
    },[])
    

    //탭 변환에 맞는 데이터 로드 
    const handleSelect=async(key)=>{
        // 예측 데이터 로드
        await getPredictedData(key); 
        // 원본 이미지 바꾸기
        key === '0'
        ?setPreviewImage(raw_img_path)
        :setPreviewImage(processed_img_path[0]? processed_img_path[0]:null)
    }

    return(
        <div style={{width:'100%',}}>
            {
                !isPredictedDone
                && 
                <div style={divStyle.loadingBackground}>
                    <Spinner/>
                    <span style={divStyle.loadingText}>맛 데이터 및 등급을 예측 중 입니다..</span>
                </div>
            }
            <div style={style.editBtnWrapper}>
                <button type="button" class="btn btn-outline-success" style={{/*marginLeft:'30px'*/}} onClick={handlePredictClick}>예측</button>
            </div>  
            <div style={style.singleDataWrapper}>
                {/* 1. 관리번호 고기에 대한 사진 -> 컴포넌트 따로 만들기*/}
                <div>
                    {/* 1.1. 원본이미지 */}
                    <Card style={{ width: "23vw", margin:'0px 10px',marginBottom:'20px', boxShadow: 24,}}>    
                        <Card.Body>
                            <Card.Text>
                                <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>원본이미지</div>
                                <div style={{width: "100%",padding:'10px 0px',borderRadius:'10px'}}>
                                    {
                                    previewImage
                                    ?<img src={previewImage+'?n='+Math.random()} style={{height:'190px',width:'100%',objectFit:'contain',}}/>
                                    :<div style={{height:'190px',width:'100%',display:'flex',justifyContent:'center', alignItems:'center'}}>데이터 이미지가 존재하지 않습니다.</div>
                                    }
                                    
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                            
                    {/** 1.2. XAI 이미지 */}
                    <Card style={{ width: "23vw", margin:'0px 10px',boxShadow: 24,}}>
                        <Card.Body>
                            <Card.Text>
                                <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>XAI이미지 [데이터/등급예측]</div>
                                <div style={{width: "100%",display:'flex', justifyContent:'center',padding:'10px 0px'}}> 
                                    {dataXAIImg && loaded
                                    ?<div className="imgContainer" style={{borderRadius:'10px'}}>
                                        <img src={dataXAIImg+'?n='+Math.random()} style={{height:'190px',width:'100%',objectFit:'contain',marginRight:'30px'}}/>
                                    </div>
                                    :<div style={{height:'190px',width:'100%',display:'flex',margin:'0px 20px',marginRight:'20px' ,justifyContent:'center', alignItems:'center'}}>
                                        <span style={{color:'#546e7a',  fontSize:'15px'}}>
                                            데이터 XAI 이미지가 존재하지 않습니다.
                                        </span>
                                    
                                    </div>
                                    }
                                    {gradeXAIImg && loaded
                                    ?<div className="imgContainer" style={{borderRadius:'10px'}}>
                                        <img src={gradeXAIImg+'?n='+Math.random()}  style={{height:'190px',width:'100%',objectFit:'contain',}}/>
                                    </div>
                                    :<div style={{height:'170px',width:'100%',display:'flex', justifyContent:'center', alignItems:'center',margin:'0px 20px',}}>
                                        <span style={{color:'#546e7a',  fontSize:'15px'}}>
                                            등급 XAI 이미지가 존재하지 않습니다.
                                        </span>
                                    </div>
                                    }
                                    
                                </div> 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                
                
                {/* 2. QR코드와 데이터에 대한 기본 정보*/}
                <Card style={{width:'23vw', margin:'0px 10px',boxShadow: 24,}}>
                    <Card.Body> 
                        <Card.Text>
                            <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>
                                상세정보
                            </div>
                        </Card.Text>

                        <Card.Text >
                        <div  style={{height:'280px',width:"100%",display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={qrImagePath} style={{width:'180px'}}/>
                        </div>
                        </Card.Text> 

                        <Card.Text>
                            <ListGroup variant="flush">
                            <ListGroup.Item style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>관리번호 </span>
                                <span>{id}</span>
                            </ListGroup.Item>
                            <ListGroup.Item style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>등록인 이메일  </span>
                                <span>{userId}</span>
                            </ListGroup.Item>
                            <ListGroup.Item  style={{display:'flex', justifyContent:'space-between'}}>
                                <span style={{color:'#546e7a', fontWeight:'600', fontSize:'15px'}}>저장 시간 </span>
                                <span>{createdAt}</span>
                            </ListGroup.Item> 
                            </ListGroup>
                        </Card.Text>     

                    </Card.Body>
                </Card>
                
                {/* 3. 세부 데이터 정보*/}
                <Card style={{ width:'24vw', margin:'0px 10px', boxShadow: 24,}}>     
                <Tabs defaultActiveKey='0'  id="uncontrolled-tab-example" className="mb-3" style={{backgroundColor:'white', width:'100%'}} 
                    onSelect={handleSelect}>
                    <Tab eventKey='0' title='원육' style={{backgroundColor:'white'}}>
                        <RawTable data={raw_data}/>
                        <PredictedRawTable raw_data={raw_data} dataPA={dataPA}/>
                    </Tab>
                    <Tab eventKey='1' title='처리육' style={{backgroundColor:'white'}}>
                        <Autocomplete 
                            id={"controllable-states-processed"}
                            label="처리상태"
                            value={processed_toggle}
                            onChange={(event, newValue) => {setProcessedToggle(newValue);}}
                            inputValue={processedToggleValue} 
                            onInputChange={(event, newInputValue) => {setProcessedToggleValue(newInputValue); console.log('deepading seq',newInputValue)/*이미지 바꾸기 */}}
                            options={options.slice(1,)}   
                            size="small" 
                            sx={{ width: 300 ,marginBottom:'10px'}} 
                            renderInput={(params) => <TextField {...params}/>}
                        />
                        <ProcessedTablePA
                            processedMinute={processed_minute}
                            processedToggleValue={processedToggleValue}
                            processed_data={processed_data}
                        />
                        <PredictedProcessedTablePA
                            processedToggleValue={processedToggleValue}
                            processed_data={processed_data}
                            dataPA={dataPA}
                        />
                    </Tab>
                    
                </Tabs>         
                </Card>
            </div>    
        </div>
    );
}

export default DataPAView;

// 토글 버튼
let options = ['원육',];

const style={
    singleDataWrapper:{
      height:'fit-content',
      marginTop:'10px',
      display: "flex",
      justifyContent: "space-between", 
      width: "100%",
    },
    editBtnWrapper:{
        padding:'0px',
        margin:'0px',
        paddingRight:'10px', 
        width:'100%' ,
        display:'flex',
        justifyContent:'end', 
        borderBottomLeftRadius:'10px', 
        borderBottomRightRadius:'10px'
    },
    dataFieldColumn:{
        backgroundColor:'#9e9e9e',
        height:'33px',
        borderRight: '1px solid rgb(174, 168, 168)', 
        borderBottom:'1px solid #fafafa',
        padding:'4px 5px',
    },
    dataExpColumn:{
        backgroundColor:'#757575',
        height:'33px',
        borderRight: '1px solid rgb(174, 168, 168)', 
        borderBottom:'1px solid #fafafa',
        padding:'4px 5px',
        color:'white',
    },
    dataFieldContainer:{
        backgroundColor:'#eeeeee',
        height:'100%',
        borderRight: '1px solid rgb(174, 168, 168)', 
        borderBottom:'1px solid #fafafa',
        padding:'4px 5px',
    },
    dataContainer:{
        height:'33px', 
        borderBottom:'0.8px solid #e0e0e0',
        width:'',
        borderRight:'0.8px solid #e0e0e0',
        padding:'4px 5px',
        display:'flex'
    },
    imgContainer:{
    }
  
  }
  const divStyle = {
        loadingBackground : {
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            backgroundColor: '#ffffffb7',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        loadingText :{
            fontSize:'25px',
            textAlign: 'center',
        }
  }