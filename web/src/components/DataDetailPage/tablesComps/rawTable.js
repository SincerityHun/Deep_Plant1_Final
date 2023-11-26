import { Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { useEffect, useState } from 'react';

const RawTable=({data})=>{
    /*console.log('why not', data);
    const[rawdata, setRawData] = useState({});
    useEffect(()=>{
        setRawData(data)
        console.log('rawdata',data);
    },[data])*/

    return (
        <TableContainer key='rawmeat' component={Paper} sx={{width:'fitContent',overflow:'auto'}}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                </TableHead>
                <TableBody>
                    {rawField.map((f, idx)=>{
                        return(
                            <TableRow key={'raw-Row'+idx}>
                                <TableCell key={'raw-'+idx+'col1'}>{rawDBFieldToSematicWord[f]}</TableCell>
                                <TableCell key={'raw-'+idx+'col2'}>{data[f] ? data[f] : ""}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RawTable;

const rawField =['marbling','color','texture','surfaceMoisture','overall',];
const rawDBFieldToSematicWord = {
    marbling:'마블링',
    color:'육색',
    texture:'조직감',
    surfaceMoisture:'표면육즙',
    overall:'기호도',
};