import { Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const PredictedProcessedTablePA = ({processedToggleValue, processed_data, dataPA}) => {
    return(
        <TableContainer key='processedmeat' component={Paper} sx={{minWidth:'fitContent',maxWidth:'680px',overflow:'auto'}}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell style={{background:'#cfd8dc'}}>{}</TableCell>
                        <TableCell align="right" style={{background:'#cfd8dc'}}>1회차</TableCell>
                        {// 2회차 이상부터
                            Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx)=> ( 
                                <TableCell align="right" style={{background:'#cfd8dc'}}>{arr_idx+2}회차</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                {deepAgingPAField.map((f, idx) => (
                    <TableRow key={'processed-'+idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    <TableCell component="th" scope="row">{deepAgingDBFieldToSemanticWord[f]}</TableCell>
                    <TableCell align="right" >  
                    <div style={{display:'flex'}}>
                        <div>
                            {// 1회차 
                            dataPA
                            ?f === 'xai_gradeNum'
                                ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                : dataPA[f] ? dataPA[f].toFixed(2) : ""
                            :""
                            }
                        </div>
                        
                        {// 오차
                        (f !== "xai_gradeNum" &&f !== 'seqno' &&f !== 'period')
                        && 
                        (
                            <div style={{marginLeft:'10px'}}>
                                {dataPA
                                ? dataPA[f] 
                                    ? <span style={(dataPA[f].toFixed(2) - processed_data[0]?.[f] )>0?{color:'red'}:{color:'blue'}}>
                                        {
                                            (dataPA[f].toFixed(2) - processed_data[0]?.[f])>0
                                            ? '(+'+(dataPA[f].toFixed(2) - processed_data[0]?.[f]).toFixed(2)+')'
                                            : '('+(dataPA[f].toFixed(2) - processed_data[0]?.[f]).toFixed(2)+')'
                                        }
                                        </span>  
                                    : <span></span>
                                :""}
                            </div>
                        )    
                        }
                    </div>  
                        
                    </TableCell>
                    {
                    //2회차 부터 
                    Array.from({ length: Number(processedToggleValue.slice(0, -1))-1 }, (_, arr_idx) => (
                        <TableCell align="right">
                        {dataPA
                        ?f === 'xai_gradeNum'
                                ? dataPA['xai_gradeNum'] === 0 ? "0" : dataPA[f]
                                : dataPA[f] ? dataPA[f].toFixed(2) : ""
                        :""
                        }
                        {// 오차
                            f !== "xai_gradeNum"
                            && 
                            (
                                <div style={{marginLeft:'10px'}}>
                                    {dataPA
                                    ? dataPA[f] 
                                        ? <span style={(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f] )>0?{color:'red'}:{color:'blue'}}>
                                            {
                                                (dataPA[f].toFixed(2) - processed_data[f])>0
                                                ? '(+'+(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f]).toFixed(2)+')'
                                                : '('+(dataPA[f].toFixed(2) - processed_data[arr_idx+ 1]?.[f]).toFixed(2)+')'
                                            }
                                            
                                            </span>  
                                        : <span></span>
                                    :""}
                                    
                                </div>
                            )
                        }  
                        </TableCell>
                    ))
                    }
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PredictedProcessedTablePA;

const deepAgingPAField = ['marbling','color','texture','surfaceMoisture','overall','xai_gradeNum'];
const deepAgingDBFieldToSemanticWord = {
    marbling:'마블링',
    color:'육색',
    texture:'조직감',
    surfaceMoisture:'표면육즙',
    overall:'기호도',
    xai_gradeNum:'예상등급'
};