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
import { FunctionComponent, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_ENDPOINT } from "../../const/constant.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const defaultImagePath =
  "https://via.placeholder.com/300x450.png?text=No+Image+Available";

const BarChart: FunctionComponent = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "IMDB 평점",
        data: [],
        barThickness: 112,
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
  const animationProgress: number[] = Array(5).fill(0); // 각 이미지의 애니메이션 진행 상황을 저장하는 배열

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(`${API_ENDPOINT}/chart/top5`);

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

        preloadImages(posters);
      } catch (error) {
        console.error("차트 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchChartData();
  }, []);

  const preloadImages = (imagePaths: string[]) => {
    imagePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      cachedImages[index] = img;
    });
  };

  const animateImages = (index: number, progress: number) => {
    animationProgress[index] = progress;
  };

  const plugin = {
    id: "customImagePlugin",
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      cachedImages.forEach((img, index) => {
        const bar = meta.data[index];
        const { x, y, height: barHeight } = bar.getProps(["x", "y", "height"]);
        const progress = barHeight / chart.scales.y.max; // 막대가 얼마나 올라갔는지 비율로 계산

        // 애니메이션의 진행 상황을 업데이트
        animateImages(index, progress);

        const imgWidth = Math.min(112, barHeight * 0.75);
        const imgHeight = Math.min(149, barHeight);
        const yOffset = -100; // 이미지를 더 위로 이동하도록 yOffset을 더 크게 설정

        // 막대가 충분히 커졌을 때 이미지를 나타냄
        if (barHeight > 50) {
          const alpha = Math.min(1, animationProgress[index]); // 투명도를 애니메이션 진행 상황에 맞게 설정
          ctx.globalAlpha = alpha; // 투명도 적용

          ctx.drawImage(
            img,
            x - imgWidth / 2,
            y - imgHeight - yOffset,
            imgWidth,
            imgHeight
          );

          ctx.globalAlpha = 1; // 다음 요소를 위해 투명도를 초기화
        }
      });
    },
  };

  return (
    <div
      style={{
        height: "480px",
        width: "650px",
        marginTop: "100px",
        position: "relative",
        left: "15px",
      }}
    >
      <h2
        style={{
          textAlign: "start",
          fontSize: "20px",
          position: "relative",
          top: "-50px",
        }}
      >
        최신 OTT 드라마 평점
      </h2>
      <Bar
        data={barChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
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
        }}
        plugins={[plugin]}
      />
    </div>
  );
};

export default BarChart;
