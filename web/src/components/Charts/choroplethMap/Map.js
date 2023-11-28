import geojsonData from './geojson_korea.json';
import ChoroplethMap from './ChoroplethMap';

function Map({startDate,endDate}){
    return(
        <div style={{width:'350px', height:'350px'}}>
        <ChoroplethMap data={geojsonData} startDate={startDate} endDate={endDate}/>
        </div>
    );
}

export default Map;