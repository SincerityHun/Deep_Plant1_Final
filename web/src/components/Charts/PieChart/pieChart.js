import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import { Card, CardHeader, Button, ButtonGroup, Box} from '@mui/material';
// utils
import { fNumber } from './formatNumber';
// components
import useChart from './usePieChart';
import { useEffect, useState } from "react";

import { apiIP } from '../../../config';

const CHART_HEIGHT = 300;
const LEGEND_HEIGHT = 50;
const TITLE = '신선육/숙성육';
const CHART_LABLE = ['신선육','숙성육',];
const CHART_SERIES = [520, 1520];

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

const PieChart = ({ subheader, chartColors, startDate,endDate,...other }) => {
    const theme = useTheme();
  // const chartSeries = chartData;
    const [data, setData] = useState({});
    const [label, setLabel] = useState('total_counts');
    const [chartSeries, setChartSeries] = useState([]);
    const chartOptions = useChart({
      colors: chartColors,
      labels: CHART_LABLE,
      stroke: { colors: [theme.palette.background.paper] },
      legend: { floating: true, horizontalAlign: 'center' },
      dataLabels: { enabled: true, dropShadow: { enabled: false } },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: (seriesName) => fNumber(seriesName),
          title: {
            formatter: (seriesName) => `${seriesName}`,
          },
        },
      },
      plotOptions: {
        pie: { donut: { labels: { show: false } } },
      },
    });
    console.log("date",startDate, endDate);
    useEffect(()=>{
      // pie 차트 데이터 받아오는 함수
      const getPieData = async() => {
        const json = await(
        await fetch(`http://${apiIP}/meat/statistic?type=0&start=${startDate}&end=${endDate}`)
        ).json();
        setData(json);
        setChartSeries([json['total_counts']['raw'], json['total_counts']['processed']]);
      } 

      // pie 차트 데이터 받아오기
      getPieData();
    },[startDate, endDate]);

    // 토글 버튼 클릭시 
    const handleBtnClick= (e)=>{
      const value = e.target.value;
      const chart_series = [data[value ]['raw'], data[value ]['processed']];
      console.log('chart',chart_series);
      setLabel(value);
      setChartSeries(chart_series);
    }

    return (
    <Card {...other}>
        <CardHeader title={TITLE} titleTypographyProps={{variant:'h6' }} style={{paddingBottom:'0px'}}></CardHeader>
        <Box sx={{display:'flex', width:'100%', justifyContent:'end', paddingRight:'20px'}}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button variant={label === 'total_counts'?"contained":"outlined"}  value='total_counts' onClick={(e) => handleBtnClick(e)}>전체</Button>
            <Button variant={label === 'cattle_counts'?"contained":"outlined"} value='cattle_counts'  onClick={(e) => handleBtnClick(e)}>소</Button>
            <Button variant={label === 'pig_counts'?"contained":"outlined"} value='pig_counts' onClick={(e) => handleBtnClick(e)}>돼지</Button>
        </ButtonGroup>
      </Box>
      
      <StyledChartWrapper dir="ltr" style={{marginTop:'20px'}}>
        {chartSeries[0] === 0 && chartSeries[1] === 0 
        ?// 데이터가 없는 경우
        <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}><span>데이터가 존재하지 않습니다</span></div>
        :<ReactApexChart type="donut" series={chartSeries} options={chartOptions} height={280} />
        }
        
      </StyledChartWrapper>
    </Card>
  );
}


PieChart.propTypes = {
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default PieChart;