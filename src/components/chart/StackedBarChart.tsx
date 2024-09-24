import { Card, Col } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./StackedBarChart.css";
import { API_ENDPOINT } from "../../const/constant.ts";

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

  const stackedBarChartOptions: any = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
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
        grid: {
          display: false,
        },
        ticks: {
          display: false,
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
        position: "top", // 차트 위에 위치
        padding: {
          top: 50, // 상단 여백을 더 크게 설정
          bottom: 0, // 하단 여백 최소화
        },
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}개`;
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
        style={{ height: "150px" }} // 카드의 높이도 필요하다면 조정 가능
        styles={{ body: { padding: "5px", height: "150px" } }} // 이 부분도 조정 가능
      >
        <div style={{ height: "300px", width: "300px" }}>
          {/* 여기서 height와 width 조정 */}
          <Bar
            data={stackedBarChartData}
            options={stackedBarChartOptions}
            width={400} // 차트의 너비
            height={300} // 차트의 높이
          />
        </div>
      </Card>
    </Col>
  );
};

export default StackedBarChart;
