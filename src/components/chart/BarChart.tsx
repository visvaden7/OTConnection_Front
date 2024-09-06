import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
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

  return (
    <div style={{ height: "300px", width: "650px" }}>
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
                  const labels = chart.data.labels || []; // labels가 undefined일 경우 빈 배열로 처리
                  const backgroundColor = dataset?.backgroundColor; // backgroundColor를 추출

                  return labels.map((label, index) => {
                    const color = Array.isArray(backgroundColor) // backgroundColor가 배열인지 확인
                      ? backgroundColor[index]
                      : backgroundColor; // 배열이 아니면 그대로 사용

                    return {
                      text: label as string, // 'text'를 명확하게 string으로 타입 캐스팅
                      fillStyle: color,
                      hidden: false,
                    };
                  });
                },
              },
            },
            title: {
              display: true,
              text: "최고 평점 OTT 드라마",
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
      />
    </div>
  );
};

export default BarChart;
