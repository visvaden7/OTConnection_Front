import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_ENDPOINT } from "../../const/constant.ts";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// 플러그인 등록
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartDataLabels
);

const StackedBarChart: React.FunctionComponent = () => {
  const [stackedBarChartData, setStackedBarChartData] = useState({
    labels: ["카카오", "네이버"],
    datasets: [
      {
        label: "KAKAO",
        data: [24],
        barThickness: 20,
        backgroundColor: "#FEE500",
      },
      {
        label: "NAVER",
        data: [76],
        barThickness: 20,
        backgroundColor: "#00C73C",
      },
    ],
  });

  const [legendData, setLegendData] = useState([
    { name: "KAKAO", color: "#FEE500" },
    { name: "NAVER", color: "#00C73C" },
  ]);

  const stackedBarChartOptions: any = {
    indexAxis: "y", // "y"를 정확하게 인식할 수 있도록 설정
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function () {
            return "";
          },
          label: function (tooltipItem: any) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}%`;
          },
        },
      },
      datalabels: {
        display: true,
        align: "center",
        anchor: "center",
        formatter: function (value: any) {
          return `${value}%`; // 데이터를 퍼센트로 표시
        },
        color: "black",
        font: {
          weight: "bold",
          size: 10,
        },
      },
    },
  };

  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/webtoon-platform`;
    axios.get(url).then((rep) => {
      const webtoonPlatform = rep.data;
      setStackedBarChartData({
        labels: ["카카오", "네이버"],
        datasets: [
          {
            label: "KAKAO",
            data: [webtoonPlatform.kakaoCount],
            barThickness: 50,
            backgroundColor: "#FEE500",
          },
          {
            label: "NAVER",
            data: [webtoonPlatform.naverCount],
            barThickness: 50,
            backgroundColor: "#00C73C",
          },
        ],
      });

      setLegendData([
        { name: "KAKAO", color: "#FEE500" },
        { name: "NAVER", color: "#00C73C" },
      ]);
    });
  }, []);

  return (
    <div>
      {/* 그래프 제목을 별도의 태그로 분리 */}
      <h2
        style={{
          textAlign: "left",
          paddingLeft: "60px",
          paddingTop: "20px",
          fontWeight: "700",
          fontSize: "20px",
          position: "relative",
          top: "15px",
          right: "30px",
        }}
      >
        웹툰 플랫폼별 작품 비율
      </h2>
      <div style={{ height: "150px", position: "relative", left: "30px" }}>
        <div style={{ height: "300px", width: "400px" }}>
          <Bar
            data={stackedBarChartData}
            options={stackedBarChartOptions}
            width={300}
            height={300}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginLeft: "130px",
          position: "relative",
          left: "103px",
          bottom: "65px",
        }}
      >
        {legendData.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: item.color,
                marginRight: "8px",
              }}
            ></div>
            <span style={{ fontSize: "10px" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;
