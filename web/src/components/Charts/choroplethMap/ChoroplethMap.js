import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';
import { apiIP } from '../../../config';

const ChoroplethMap = ({data,startDate,endDate})=>{
    // 지역별 개수 API 데이터 받아오기\
    const [cattleCnt, setCattleCnt] = useState({});
    const [porkCnt, setPorkCnt] = useState({});
    const [totalCnt, setTotalCnt] = useState({});
    const [keyIdx, setKeyIdx] = useState(0);
    // 지도 통계 API 호출
    useEffect(()=>{
      const getData = async() =>{
        const mapData = await(
          await fetch(`http://${apiIP}/meat/statistic?type=3&start=${startDate}&end=${endDate}`)
        ).json();

        //데이터 set
        setCattleCnt(mapData['cattle_counts_by_region']);
        setPorkCnt(mapData['pig_counts_by_region']);
        setTotalCnt(mapData['total_counts_by_region']);
      }
      getData();
    },[startDate, endDate])
    const [geoJSONData, setGeoJSONData] = useState(data);

    // 데이터 추가하기
    useEffect(()=>{
      const addProperties = () => {
        const updatedFeatures = data.features.map(feature => ({
          ...feature,
          properties:{
            ...feature.properties,
            value : {
              cattle : cattleCnt[feature.properties.CTP_KOR_NM],
              pork : porkCnt[feature.properties.CTP_KOR_NM],
              total: totalCnt[feature.properties.CTP_KOR_NM],
            }
          }
        }));

        const updatedGeoJSON = {
          ...data,
          features: updatedFeatures
        }
       setGeoJSONData(updatedGeoJSON);   
      }
      addProperties();
      setKeyIdx((prev)=>prev+1);
      console.log(cattleCnt, porkCnt, totalCnt);
    },[cattleCnt, porkCnt, totalCnt]);
  
    //useEffect(() => {// feature 전달 해줘야 할듯
        // 값에 따른 색
        const getColor = (value) => {
          if (!value){
            return '#ffffff';
          }
          const cattle = value.cattle;
          const pork = value.pork;
          const total = value.total;
          if (total === 0){
            // 데이터가 없는 경우 
            return '#ffffff';
          }else if (cattle === 0 && pork){
            // 돼지 데이터만 있는 경우
            return (pork > 40 ? '#e91e63' :
                 pork > 30 ? '#ec407a' :
                 pork > 20  ? '#f06292' :
                 pork > 10 ? '#f48fb1' :
                              '#f8bbd0');
          }else if (cattle && pork === 0){
            // 소 데이터만 있는 경우
            return (cattle > 40 ? '#2196f3' :
                 cattle > 30 ? '#42a5f5' :
                 cattle > 20  ? '#64b5f6' :
                 cattle > 10 ? '#90caf9' :
                              '#bbdefb');
          }else{
            // 둘다 있는 경우 
            return (total > 40 ? '#9c27b0' :
                 total > 30 ? '#ab47bc' :
                 total > 20  ? '#ba68c8' :
                 total > 10 ? '#ce93d8' :
                              '#e1bee7');
          }
        };

        const style = (features) => {
          // 데이터 
          const value= features.properties.value;

          return {
            fillColor: getColor(value),
            weight: 1,
            opacity: 1,
            // 선 색깔
            color: 'black',
            fillOpacity: 0.9,
            
          };
        };
  
        //state(지역) layer에 listener 추가
        const onEachFeature = (feature, layer) => {
            // 지역별 값에대한 설명을 pop up
            if(feature.properties.value)
              layer.bindPopup(`지역: ${feature.properties.CTP_KOR_NM}<br>전체: ${feature.properties.value.total?feature.properties.value.total:0} 마리
              <br>소: ${feature.properties.value.cattle?feature.properties.value.cattle:0} 마리<br>돼지: ${feature.properties.value.pork?feature.properties.value.pork:0} 마리`);
            else
              layer.bindPopup(`지역: ${feature.properties.CTP_KOR_NM}`);      
        };
   //}, [data]);
 
    return (
        <MapContainer center={[35.8754 , 128.5823]}style={{height:'350px'}} zoom={6} scrollWheelZoom={false}>      
            <TileLayer style={styles.customTileLayer} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
            <GeoJSON key={keyIdx} data={geoJSONData} style={style} onEachFeature={onEachFeature} />               
        </MapContainer>
    );
}

export default ChoroplethMap;

//const regions = ["강원", "경기", "경남", "경북", "광주", "대구", "대전", "부산", "서울", "세종", "울산", "인천", "전남", "전북", "제주", "충남", "충북"];

const styles = {
  customTileLayer : {
    border: '5px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
}
