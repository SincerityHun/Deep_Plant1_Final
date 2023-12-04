import Card from "react-bootstrap/Card";

const MeatImgsCardStatic = ({previewImage}) =>{

    return(
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
    );

}

export default MeatImgsCardStatic;