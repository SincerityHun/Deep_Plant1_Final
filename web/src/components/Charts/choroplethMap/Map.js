import geojsonData from './geojson_korea.json';
import ChoroplethMap from './ChoroplethMap';
//지도 경계 구분선 만드는 data 
// geojson에 데이터 추가해서 구현 
console.log(geojsonData);
function Map({startDate,endDate}){
    return(
        <div style={{width:'350px', height:'350px'}}>
        <ChoroplethMap data={geojsonData} startDate={startDate} endDate={endDate}/>
        </div>
    );
}

export default Map;