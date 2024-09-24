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
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_ENDPOINT } from "../../assets/const/constant.ts";

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
        barThickness: 112, // 바의 너비를 112로 설정
        backgroundColor: [
          "#001A5C",
          "#3A8DD0",
          "#2D72B5",
          "#2D72B5",
          "#001A5C",
        ],
      },
    ],
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(`${API_ENDPOINT}/chart/top5`);
        setBarChartData({
          labels: data.title,
          datasets: [
            {
              label: "IMDB 평점",
              data: data.imdb_rate,
              barThickness: 112,
              backgroundColor: [
                "#44A0E3",
                "#3A8DD0",
                "#2D72B5",
                "#164689",
                "#001A5C",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("차트 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchChartData();
  }, []);

  // 이미지 프리로딩
  const cachedImages: HTMLImageElement[] = [];

  const preloadImages = (imagePaths: string[]) => {
    imagePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      cachedImages[index] = img;
    });
  };

  useEffect(() => {
    preloadImages(imagePaths);
  }, []);

  // 이미지 렌더링 플러그인
  const plugin = {
    id: "customImagePlugin",
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      cachedImages.forEach((img, index) => {
        const bar = meta.data[index];
        const x = bar.x;
        const y = bar.y;

        const imgWidth = 50; // 이미지의 너비
        const imgHeight = 50; // 이미지의 높이
        const yOffset = 50; // 막대 상단보다 이미지가 조금 더 아래로 내려오도록 조정

        ctx.drawImage(
          img,
          x - imgWidth / 2, // 막대의 중앙에 이미지 배치
          y - imgHeight + yOffset, // 현재 애니메이션 진행 중인 Y 위치에 이미지 배치
          imgWidth,
          imgHeight,
        );
      });
    },
  };

  return (
    <div style={{ height: "450px", width: "650px", marginTop: "50px" }}>
      <Bar
        data={barChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // 범례를 안 보이게 설정
            },
            title: {
              display: true,
              text: "최신 OTT 드라마 평점",
              padding: {
                top: 0,
                bottom: 70,
              },
              font: {
                size: 20,
              },
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
        plugins={[plugin]}
      />
    </div>
  );
};

export default BarChart;
