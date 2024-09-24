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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// 기본 이미지 경로 설정
const defaultImagePath =
  "https://via.placeholder.com/300x450.png?text=No+Image+Available";

const BarChart: React.FC = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "IMDB 평점",
        data: [],
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

  const cachedImages: HTMLImageElement[] = [];

  // 데이터 가져오기
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/chart/top5"
        );

        // imdb_rate가 null이면 0으로 대체, poster가 null이면 기본 이미지로 대체
        const imdbRates = data.imdb_rate.map((rate: number | null) =>
          rate === null ? 0 : rate
        );
        const posters = data.poster.map((poster: string | null) =>
          poster === null ? defaultImagePath : poster
        );

        setBarChartData({
          labels: data.title,
          datasets: [
            {
              label: "IMDB 평점",
              data: imdbRates,
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

        preloadImages(posters); // 이미지 미리 로드
      } catch (error) {
        console.error("차트 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchChartData();
  }, []);

  // 이미지 프리로딩
  const preloadImages = (imagePaths: string[]) => {
    imagePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      cachedImages[index] = img;
    });
  };

  // 이미지 렌더링 플러그인
  const plugin = {
    id: "customImagePlugin",
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      cachedImages.forEach((img, index) => {
        const bar = meta.data[index];
        const { x, y } = bar.getProps(["x", "y"]); // getProps로 x와 y 값 가져오기
        const { width: barWidth, height: barHeight } = bar.getProps([
          "width",
          "height",
        ]); // getProps로 width와 height 값 가져오기

        // 바의 높이에 따라 이미지 크기를 동적으로 조정
        const imgWidth = Math.min(112, barHeight * 0.75); // 막대 높이에 비례해서 너비 조정
        const imgHeight = Math.min(149, barHeight); // 막대 높이에 비례해서 높이 조정
        const yOffset = 50; // 바와 이미지 간의 간격을 조정

        if (barHeight > 50) {
          // 막대가 일정 높이 이상일 때만 이미지 출력
          ctx.drawImage(
            img,
            x - imgWidth / 2, // 막대의 중앙에 이미지 배치
            y - imgHeight + yOffset, // 막대 상단에 이미지 배치
            imgWidth,
            imgHeight
          );
        }
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
