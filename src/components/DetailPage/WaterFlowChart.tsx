import {FunctionComponent} from "react";
import {Line} from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";

// Chart.js에 필요한 구성요소들을 미리 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import "./WaterFlowChart.css"

interface Props {

}

const WaterFlowChart: FunctionComponent<Props> = () => {
  // 차트 데이터 정의
  const data: ChartData<"line"> = {
    labels: ["5월", "4월", "3월", "2월", "1월"],
    datasets: [
      {
        label: "OTT 누적 조회수",
        data: [320, 250, 240, 180, 50],
        borderColor: "rgba(255,99,132,1)", // 라인 색상
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          
          if (!chartArea) {
            return undefined;
          }
          
          // 그라데이션 색상 설정
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(255,99,132,0.6)");
          gradient.addColorStop(1, "rgba(255,99,132,0.1)");
          return gradient;
        },
        fill: true, // 배경 색 채우기
        tension: 0.4, // 부드러운 곡선 설정
        borderWidth: 2, // 선의 굵기 설정
      },
      {
        label: "웹툰 조회수",
        data: [340, 300, 280, 220, 140],
        borderColor: "rgba(54,162,235,1)", // 라인 색상
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          
          // chartArea가 아직 준비되지 않았으면 undefined 반환
          if (!chartArea) {
            return undefined;
          }
          
          // 그라데이션 색상 설정
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(54,162,235,0.6)");
          gradient.addColorStop(1, "rgba(54,162,235,0.1)");
          return gradient;
        },
        fill: true, // 배경 색 채우기
        tension: 0.4, // 부드러운 곡선 설정
        borderWidth: 2, // 선의 굵기 설정
      },
    ],
  };
  
  // 차트 옵션 설정
  const options: ChartOptions<"line"> = {
    responsive: true, // 반응형 차트 설정
    scales: {
      x: {
        reverse: true, // X축 방향을 역방향으로 설정
        display: false,
      },
      y: {
        beginAtZero: true, // y축 0부터 시작
        ticks: {
          callback: function (value: string | number) {
            return value + "만"; // y축 단위에 '만' 추가
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <div className={"ip-detail-contents-graph-box"}>
      <div className={'subject'}>
        <p>조회수 / 시청시간</p>
      </div>
      <div className={"ip-detail-contents-divider"}></div>
      <Line data={data} options={options}/>
      <div className={"ip-detail-contents-graph-label-box"}>
        <div className={"legend-label"}>
          <div className={"first-label-icon"}>v</div>
          <h5>{data.datasets[0].label}</h5>
        </div>
        <div className={"legend-label"}>
          <div className={"second-label-icon"}>v</div>
          <h5>{data.datasets[1].label}</h5>
        </div>
      </div>
    </div>
  )
};

export default WaterFlowChart;
