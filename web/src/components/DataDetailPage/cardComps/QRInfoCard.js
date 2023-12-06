// react-bootstrap
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const QRInfoCard=({qrImagePath, id, userId, createdAt, page, divStyle})=>{
    return(
        <Card style={page === 'predict' ? divStyle :{width:'27vw', height:'65vh',margin:'0px 10px',boxShadow: 24,}}>
            <Card.Body>
                <Card.Text>
                    <div style={{color:'#002984', fontSize:'18px', fontWeight:'800'}}>
                        상세정보
                    </div>
                </Card.Text>
                <Card.Text>
                    <div  style={{height:'280px',width:"100%",display:'flex', justifyContent:'center', alignItems:'center', }}>
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
    )
}

export default QRInfoCard;