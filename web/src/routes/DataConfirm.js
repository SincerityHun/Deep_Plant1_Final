import { useParams, useLocation,Link } from "react-router-dom";
import DataLoad from "../components/DataDetailPage/DetailDataController";
import { Box, IconButton} from '@mui/material';
import { FaArrowLeft } from "react-icons/fa";

const navy =  '#0F3659';

function DataConfirm(){

    const idParam  = useParams();
    // 쿼리스트링 추출 
    const searchParams = useLocation().search;
    const pageOffset = new URLSearchParams(searchParams).get('pageOffset');
    const startDate = new URLSearchParams(searchParams).get('startDate');
    const endDate = new URLSearchParams(searchParams).get('endDate');
    console.log('승인 및 반려',{ pageOffset, startDate , endDate});
    return(
        <Box sx={{ display: "flex"}}>
          <Box sx={style.fixed}>
            <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
              {/**link 컴포넌트화하기 */}
              <Link to={{pathname : '/DataManage', search: `?pageOffset=${pageOffset}&startDate=${startDate}&endDate=${endDate}`}}  style={{textDecorationLine:'none',display:'flex', alignItems:'center',}} >
                <IconButton style={{color:`${navy}`, backgroundColor:'white', border:`1px solid ${navy}`, borderRadius:'10px', marginRight:'10px'}}>
                  <FaArrowLeft/>
                </IconButton>
              </Link>
              {/**컴포넌트화 시키기 */}
              <span style={{textDecoration:'none', color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>
                {idParam.id}
              </span>
            </div> 
          </Box>
          <DataLoad id = {idParam.id} page = {"검토"}/>
        
        </Box>
    );
}
//<DataView page={"검토"}/>
export default DataConfirm;

const style={
  fixed:{
    position: 'fixed', 
    top:'95px',
    right:'0',
    left:'80px',
    zIndex: 1,
    width:'fit-content',
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    height: "70px",
  },
  
  }