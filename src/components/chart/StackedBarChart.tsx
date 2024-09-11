import { Card, Col } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./StackedBarChart.css";
import { API_ENDPOINT } from "../../assets/const/constant.ts";

const StackedBarChart: React.FunctionComponent = () => {
  const [stackedBarChartData, setStackedBarChartData] = useState({
    labels: ["카카오", "네이버"],
    datasets: [
      {
        label: "KAKAO",
        data: [24],
        barThickness: 20,
        backgroundColor: "#FEE500", // 노란색
      },
      {
        label: "NAVER",
        data: [76],
        barThickness: 20,
        backgroundColor: "#00C73C", // 초록색
      },
    ],
  });

  const stackedBarChartOptions = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        display: false, // x축 자체를 표시하지 않음
        grid: {
          display: false,
        },
        ticks: {
          display: false, // x축의 수치 표시 제거
        },
      },
      y: {
        stacked: true,
        display: false, // y축 자체를 표시하지 않음
        beginAtZero: true,
        max: 10,
        grid: {
          display: false,
        },
        ticks: {
          display: false, // y축의 수치 표시 제거
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "플랫폼별 작품 수",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || ""; // dataset 에서 제대로된 label 참조
            const value = context.raw; // 해당 데이터의 값
            return `${label}: ${value}`; // label 과 값을 함께 표시
          },
        },
      },
    },
  };

  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/webtoon-platform`;
    axios.get(url).then((rep) => {
      const webtoonPlatform = rep.data; // JSON 파싱 불필요
      setStackedBarChartData({
        labels: ["카카오", "네이버"],
        datasets: [
          {
            label: "KAKAO",
            data: [webtoonPlatform.kakaoCount],
            barThickness: 20,
            backgroundColor: "#FEE500",
          },
          {
            label: "NAVER",
            data: [webtoonPlatform.naverCount],
            barThickness: 20,
            backgroundColor: "#00C73C",
          },
        ],
      });
    });
  }, []);

  return (
    <Col xs={24} md={8}>
      <Card
        bordered={false}
        style={{ height: "70px" }}
        styles={{ body: { padding: "5px", height: "100px" } }}
      >
        <div style={{ height: "100px", width: "300px" }}>
          <Bar
            data={stackedBarChartData}
            options={{
              ...stackedBarChartOptions,
              animations: {
                x: {
                  easing: "easeInOutQuad",
                  duration: 2000,
                },
              },
            }}
          />
        </div>
      </Card>
    </Col>
  );
};

export default StackedBarChart;
