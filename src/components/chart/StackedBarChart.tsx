import { Card, Col } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChartData: React.FunctionComponent = () => {
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
        display: false, // x축 자체를 표시하지 않음
        beginAtZero: true,
        max: 10,
        grid: {
          display: false,
        },
        ticks: {
          display: false, // x축의 수치 표시 제거
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 여기 수정
      },
      title: {
        display: true,
        text: "플랫폼별 작품 수",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const url = "http://localhost:8001/api/chart/webtoon-platform";
    axios.get(url).then((rep) => {
      const webtoonPlatfrom = JSON.parse(JSON.stringify(rep.data));
      setStackedBarChartData({
        labels: ["카카오", "네이버"],
        datasets: [
          {
            label: "KAKAO",
            data: [webtoonPlatfrom.kakaoCount],
            barThickness: 20,
            backgroundColor: "#FEE500", // 노란색
          },
          {
            label: "NAVER",
            data: [webtoonPlatfrom.naverCount],
            barThickness: 20,
            backgroundColor: "#00C73C", // 초록색
          },
        ],
      });
    });
    // 스택드 바 차트 데이터 설정
  }, []);
  return (
    <Col xs={24} md={8}>
      <Card
        // title="플랫폼별 작품 수"
        bordered={false}
        style={{ height: "120px" }}
      >
        <div style={{ height: "100px", width: "400px" }}>
          {" "}
          {/* 차트 크기 조정 */}
          <Bar
            data={stackedBarChartData}
            options={{
              ...stackedBarChartOptions,
              animations: {
                x: {
                  easing: "easeInOutQuad", // 부드럽게 시작하고 끝나는 애니메이션
                  duration: 2000, // 2초 지속 시간
                },
              },
            }}
          />
        </div>
      </Card>
    </Col>
  );
};

export default StackedBarChartData;
