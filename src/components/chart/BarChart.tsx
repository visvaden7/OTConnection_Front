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

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/chart/top5"
        );

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

  const plugin = {
    id: "customImagePlugin",
    afterDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      cachedImages.forEach((img, index) => {
        const bar = meta.data[index];
        const { x, y } = bar.getProps(["x", "y"]);
        const { width: _barWidth, height: barHeight } = bar.getProps([
          "width",
          "height",
        ]);

        // 막대 높이에 따라 이미지 크기 조정
        const imgWidth = Math.min(112, barHeight * 0.75);
        const imgHeight = Math.min(149, barHeight);
        const yOffset = -100; // 이미지를 더 위로 이동하도록 yOffset을 더 크게 설정

        // 이미지가 짤리지 않도록 이미지 위치를 조정
        if (barHeight > 50) {
          ctx.drawImage(
            img,
            x - imgWidth / 2,
            y - imgHeight - yOffset, // y 좌표를 더 위로 이동
            imgWidth,
            imgHeight
          );
        }
      });
    },
  };

  return (
    <div
      style={{
        height: "525px",
        width: "650px",
        marginTop: "100px",
        position: "relative",
        left: "30px",
      }}
    >
      {/* 제목을 별도의 h2 태그로 렌더링 */}
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

      {/* 차트 컴포넌트 */}
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
