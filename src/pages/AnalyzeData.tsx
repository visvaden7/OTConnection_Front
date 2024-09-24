import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import "./AnalyzeData.css";

export const AnalyzeData: React.FC = () => {
  // Line chart 데이터 (회차별 조회수)
  const lineChartData = {
    labels: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
    datasets: [
      {
        label: "회차별 조회수",
        data: [4600, 5000, 4500, 6100, 6500, 8700, 7400, 11200, 12100, 15600],
        fill: false,
        borderColor: "black",
        tension: 0.1,
      },
    ],
  };

  // Line chart 데이터 (회차별 조회수)
  const lineChartOptions: ChartOptions<"line"> = {
    layout: {
      padding: {
        top: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#000",
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  // Doughnut chart 데이터 (나라별 선호도)
  const doughnutChartData1 = {
    labels: ["중국", "프랑스", "미국", "한국"],
    datasets: [
      {
        data: [20, 25, 5, 50],
        backgroundColor: ["#3A8DD0", "#3A8DD0", "#2D72B5", "#001A5C"],
      },
    ],
  };

  const doughnutChartOptions1: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, context) => {
          return context.chart.data.labels?.[context.dataIndex] ?? "";
        },
        color: "#000",
        font: {
          weight: "bold",
          size: 16,
        },
        anchor: "end",
        align: "end",
        offset: -5,
        padding: {
          top: -20,
        },
      },
    },
  };

  // Bar chart 데이터 (성별/연령대별 선호도)
  const barChartData = {
    labels: ["10대", "20대", "30대", "40대", "50대"],
    datasets: [
      {
        label: "남성",
        data: [25, 35, 51, 35, 62],
        backgroundColor: "#36A2EB",
        datalabels: {
          align: "end" as const, // "end"를 고정된 문자열로 처리
          anchor: "end" as const, // "end"를 고정된 문자열로 처리
          color: "#000",
          formatter: (value: number) => `${value}%`,
          offset: 10,
        },
      },
      {
        label: "여성",
        data: [75, 65, 49, 65, 38],
        backgroundColor: "#FF6384",
        datalabels: {
          align: "start" as const, // "start"를 고정된 문자열로 처리
          anchor: "start" as const, // "start"를 고정된 문자열로 처리
          color: "#000",
          formatter: (value: number) => `${value}%`,
          offset: 10,
        },
      },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        stacked: true,
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
      datalabels: {
        display: true,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="container" style={{ height: "2600px" }}>
      <h2 className="circle-title1">
        웹툰, OTT콘텐츠 데이터를 한 눈으로 확인할 수 있는
      </h2>
      <h1 className="circle-title2">OTConnection</h1>

      <div
        className="description-box"
        style={{ width: "960px", height: "400px" }}
      >
        <p className="circle-p">
          웹툰과 OTT 플랫폼에서 제작된 웹툰 기반 드라마에 대한
          <br />
          <span className="highlight">정보와 커뮤니티</span>를 제공합니다.
          웹툰과 드라마의 차이를
          <br />
          분석하고 연결합니다.
        </p>

        <div className="circle-container">
          <div className="circle">
            <p>
              웹툰
              <br />
              웹소설
            </p>
          </div>
          <div className="connection-line"></div>
          <div className="main-circle">
            <p>OTConnection</p>
          </div>
          <div className="connection-line"></div>
          <div className="circle">
            <p>
              드라마
              <br />
              영화
            </p>
          </div>
        </div>
      </div>

      <div
        className="data-visualization"
        style={{ width: "1000px", height: "650px" }}
      >
        <p className="data-visualization-top-p">
          작품 정보와 작가 정보를 제공하며, 플랫폼별 작품 수,
          <br />
          시청률, 조회수, 평점 비교{" "}
          <span className="highlight">데이터를 시각화</span>하여 쉽게 확<br />
          인할 수 있습니다.
        </p>
        <img
          className="laptop-image"
          src="../public/Group_2308.png"
          alt="데이터 시각화 예시 이미지"
          style={{
            width: "50%",
            height: "auto",
            marginBottom: "80px",
          }}
        />
        <p className="data-visualization-bottom-p">
          향후 B2C 서비스를 넘어,{" "}
          <span className="highlight">
            유저 데이터를 바탕으로 B2B
            <br />
            서비스로 확장
          </span>
          해 제작자들에게 인기 장르와 트렌드 인사이트를 <br />
          제공할 예정입니다.
        </p>
      </div>

      <div className="report-section">
        {" "}
        <h2 className="report-title" style={{ width: "900px" }}>
          소비자 유형 분석 리포트
        </h2>
      </div>
      <img
        className="seoul-image"
        src="https://i.namu.wiki/i/EPccU_mLF3SoUMc4d-3UD3CD9pT3At1p_yuw2BFqIFl3scmT-O__1UKn8Lc9SFB-pvOCGk6eqyGMhqZQZJ4BcCOncbofm2mkiSZ8gRqnUZLBsyklX3joE9BAtrQOivdwz5tJfCGGG_YthvFwVv4Edw.webp"
        alt="어느날 갑자기 서울은"
        style={{ width: "200px" }}
      />
      <div className="seoul-section">
        <h3 className="seoul-title">어느날 갑자기 서울은</h3>
        <h4 className="primary-info">기본 정보</h4>
        <h4 className="seoul-info">
          내용 : 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다.
          외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다.
          헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
          헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이{" "}
          있어야한다{" "}
        </h4>
      </div>
      {/* 도넛 차트 추가하는 부분 */}
      <div className="doughnut-chart-section" style={{ width: "300px" }}>
        <Doughnut data={doughnutChartData1} options={doughnutChartOptions1} />
      </div>
      <h2 className="doughnut-title">나라별 선호도</h2>

      <div className="bar-chart-section" style={{ width: "300px" }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
      <h2 className="gender-title">성별/연령대별 선호도</h2>

      <div className="success-rate">
        <h1 className="highlight">89%</h1>
      </div>
      <h2 className="rate-title">드라마 제작 성공률</h2>

      <div
        className="lineChart-section"
        style={{ width: "600px", height: "auto" }}
      >
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
      <h2 className="line-title">회차별 조회수</h2>

      <div className="LastMessage">
        웹툰과 드라마의 다양한 연결점을 발견하고, <br />
        데이터를 통해 새로운 시각으로 콘텐츠를 즐겨보세요.
      </div>
    </div>
  );
};
