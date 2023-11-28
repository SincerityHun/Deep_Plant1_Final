import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
// third-party
import ReactApexChart from 'react-apexcharts';
import { apiIP } from '../../config';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "소",
      "돼지",
    ],
  },
  yaxis: {
    title: {
      text: "개",
    },
  },
  legend: {
    position: 'right',
    offsetY: 40
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val}개`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: "50%",
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 20,
    },
    
  },
  
};

const StackedBarChart = ({startDate,endDate}) => {
  const theme = useTheme();
  const line = theme.palette.divider;
  const stackColors  = [ 
    theme.palette.success.light,
    theme.palette.primary.main,
    theme.palette.warning.main,
    '#BB86FC',
    theme.palette.error.main,
    '#FF0266',
    theme.palette.info.light,
    theme.palette.warning.light,
    theme.palette.secondary.main,
    theme.palette.success.dark,
    '#03DAC5',
    theme.palette.error.light,
  ];

  const [cattleData,setCattleData] = useState({});
  const [porkData, setPorkData] = useState({});
  //부위별 데이터 저장 API 호출
  const [series, setSeries] = useState([]);
  useEffect(()=>{
    const getStackedData = async() => {
      // 부위별 개수
      const categCount = await(
        await fetch(`http://${apiIP}/meat/statistic?type=2&start=${startDate}&end=${endDate}`)
      ).json();
        console.log(`http://${apiIP}/meat/statistic?type=2&start=${startDate}&end=${endDate}`)
      setCattleData(categCount['beef_counts_by_primal_value']);
      setPorkData(categCount['pork_counts_by_primal_value']);
    }
    // get api data
    getStackedData();    
  },[startDate, endDate]);

  // 부위별 데이터 series에 저장 
 useEffect(()=>{
    let seriesArr = [];
    categories.map((c)=>{
      seriesArr = [
          ...seriesArr,
          {
            name : c,
            data : [(cattleData[c]!==undefined)? cattleData[c]: 0, (porkData[c]!==undefined) ? porkData[c] : 0],
          }
        ];
    });
    setSeries(seriesArr);
 },[cattleData, porkData])
  
  // 스타일 
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: stackColors,
      xaxis: {
        labels: {
          style: {
            colors: stackColors,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: stackColors,
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      
    }));
  }, []);
 
  return (
    <div id="chart" style={{ backgroundColor: "white", borderRadius: "5px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={450}
      />
    </div>
  );
};

export default StackedBarChart;

const categories = ["안심", "등심","목심","앞다리","갈비", "채끝","우둔", "설도", "양지",  "사태","삼겹살","뒷다리",];