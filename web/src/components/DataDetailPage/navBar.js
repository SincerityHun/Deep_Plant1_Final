import {Link } from "react-router-dom";
import { Box, IconButton} from '@mui/material';
import { FaAngleDoubleLeft } from "react-icons/fa";
import ExcelController from "../DataListView/excelContr";

function navBar(){
    return(
        <Box sx={{display:'flex', marginTop:'70px'}}>
          <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
            <Link to={{pathname : '/DataManage'}} >
              <IconButton  size="large">
              <FaAngleDoubleLeft/>
              </IconButton>
            </Link>
          </div>
          <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
            <ExcelController/>
          </div>
        </Box>
    );
}

export default navBar;
