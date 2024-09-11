import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const imagePaths = [
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/j4BjkbSqY7Cbc4XcdKMyJGyr9iT.jpg",
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/8QEpP4ChnziSr1nFxRzvIX69OaI.jpg",
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/9gEp7Rs43Fi3eEEBsIMc8xGewNp.jpg",
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/kDE6jrr9nKJ5foI7wAoGxPlIiKD.jpg",
  "https://image.tmdb.org/t/p/w300_and_h450_bestv2/eNfNu9sJ2eVmMcbrKpgEovPoyB8.jpg",
];

const BarChart: React.FC = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [
      "사냥개들",
      "피라미드 게임",
      "선재 업고 튀어",
      "함부로 대해줘",
      "스위트홈",
    ],
    datasets: [
      {
        label: "IMDB 평점",
        data: [8.5, 8.4, 8.7, 8.7, 8.6],
        barThickness: 50,
        backgroundColor: [
          "#44A0E3",
          "#3A8DD0",
          "#2D72B5",
          "#164689",
          "#001A5C",
        ],
      },
    ],
    plugins: [],
  });
  
  useEffect(() => {
    const url = "http://localhost:8001/api/chart/top5";
    axios.get(url).then((rep) => {
      const jsonParsed = JSON.parse(JSON.stringify(rep.data));
      setBarChartData({
        labels: jsonParsed["title"],
        datasets: [
          {
            label: "IMDB 평점",
            data: jsonParsed["imdb_rate"],
            barThickness: 50,
            backgroundColor: [
              "#44A0E3",
              "#3A8DD0",
              "#2D72B5",
              "#164689",
              "#001A5C",
            ],
          },
        ],
        plugins: [],
      });
    });
  }, []);
  
  const cachedImages: HTMLImageElement[] = [];
  
  const preloadImages = (imagePaths: string[]) => {
    imagePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      cachedImages[index] = img;
    });
  };
  
  // 컴포넌트가 처음 렌더될 때 이미지 미리 로드
  useEffect(() => {
    preloadImages(imagePaths);
  }, []);
  
  const plugin = {
    id: "customImagePlugin",
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      
      const meta = chart.getDatasetMeta(0); // 첫 번째 데이터셋의 메타데이터 가져오기 (막대들에 대한 정보)
      
      cachedImages.forEach((img, index) => {
        const bar = meta.data[index]; // 각 막대에 대한 정보
        const x = bar.x; // 막대의 X 위치
        const y = bar.y; // 막대의 현재 Y 위치 (애니메이션에 따라 변경됨)
        
        const imgWidth = 50; // 이미지의 너비
        const imgHeight = 50; // 이미지의 높이
        const yOffset = 50; // 막대 상단보다 이미지가 조금 더 아래로 내려오도록 조정
        
        ctx.drawImage(
          img,
          x - imgWidth / 2, // 막대의 중앙에 이미지 배치
          y - imgHeight + yOffset, // 현재 애니메이션 진행 중인 Y 위치에 이미지 배치
          imgWidth,
          imgHeight
        );
      });
    },
  };
  
  return (
    <div style={{height: "340px", width: "650px"}}>
      <Bar
        data={barChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                generateLabels: (chart) => {
                  const dataset = chart.data.datasets[0];
                  const labels = chart.data.labels || [];
                  const backgroundColor = dataset?.backgroundColor;
                  
                  return labels.map((label, index) => {
                    const color = Array.isArray(backgroundColor)
                      ? backgroundColor[index]
                      : backgroundColor;
                    
                    return {
                      text: label as string,
                      fillStyle: color,
                      hidden: false,
                    };
                  });
                },
              },
            },
            title: {
              display: true,
              text: "최신 OTT 드라마 평점",
            },
          },
          scales: {
            x: {
              stacked: true,
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              stacked: true,
              display: false,
              beginAtZero: true,
              max: 10,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
          animations: {
            y: {
              easing: "easeOutBounce",
              duration: 1500,
            },
          },
        }}
        plugins={[plugin]} // 커스텀 플러그인 추가
      />
    </div>
  );
};

export default BarChart;
