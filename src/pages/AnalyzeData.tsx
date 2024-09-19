import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./AnalyzeData.css"; // 스타일은 따로 CSS 파일에서 관리

export const AnalyzeData: React.FC = () => {
  // Line chart 데이터 (회차별 조회수)
  const lineChartData = {
    labels: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
    datasets: [
      {
        label: "회차별 조회수",
        data: [4600, 5000, 4500, 6100, 6500, 8700, 7400, 11200, 12100, 15600],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  // Line 차트의 X축, Y축 다시 표시하고 눈금선과 범례는 숨기기
  const lineChartOptions = {
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
    scales: {
      x: {
        display: true, // X축 다시 표시
        grid: {
          display: false, // X축 눈금선 숨기기
        },
      },
      y: {
        display: true, // Y축 다시 표시
        grid: {
          display: false, // Y축 눈금선 숨기기
        },
      },
    },
  };

  // Doughnut chart 데이터 (나라별 선호도)
  const doughnutChartData2 = {
    labels: ["한국", "미국", "프랑스", "중국"],
    datasets: [
      {
        data: [60, 15, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Doughnut 차트의 범례를 없애기 위한 옵션
  const doughnutChartOptions = {
    maintainAspectRatio: false, // 비율 유지 안 함
    plugins: {
      legend: {
        display: false, // 도넛 차트에서 범례 숨기기
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
      },
      {
        label: "여성",
        data: [75, 65, 49, 65, 38],
        backgroundColor: "#FF6384",
      },
    ],
  };

  // Bar 차트를 쌓기 위한 옵션 설정 (눈금선, 축, 범례 모두 숨김)
  const barChartOptions = {
    indexAxis: "y", // 차트를 가로로 눕히기
    scales: {
      x: {
        beginAtZero: true, // X축이 0부터 시작
        stacked: true, // 쌓기 활성화
        grid: {
          display: false, // X축 눈금선 숨기기
        },
        ticks: {
          display: false, // X축 레이블 숨기기
        },
      },
      y: {
        stacked: true, // 쌓기 활성화
        grid: {
          display: false, // Y축 눈금선 숨기기
        },
        ticks: {
          display: false, // Y축 레이블 숨기기
        },
      },
    },
    plugins: {
      legend: {
        display: true, // 범례 표시
        position: "top", // 범례를 차트 위에 가로로 나열
      },
      textInsideBar: {}, // 커스텀 플러그인 활성화
    },
  };

  return (
    <div className="container">
      <h2>웹툰, OTT콘텐츠 데이터를 한 눈으로 확인할 수 있는</h2>
      <h1>OTConnection</h1>

      <div className="description-box">
        <p>
          웹툰과 OTT 플랫폼에서 제작된 웹툰 기반 드라마에 대한
          <br />
          <span className="highlight">정보와 커뮤니티</span>를 제공합니다.
          웹툰과 드라마의 차이를
          <br />
          분석하고 연결합니다.
        </p>

        <div className="circle-container">
          {/* 좌측 원: 웹툰/웹소설 */}
          <div className="circle">
            <p>
              웹툰
              <br />
              웹소설
            </p>
          </div>

          {/* 중앙 원: OTConnection */}
          <div className="main-circle">
            <p>OTConnection</p>
          </div>

          {/* 우측 원: 드라마/영화 */}
          <div className="circle">
            <p>
              드라마
              <br />
              영화
            </p>
          </div>
        </div>
      </div>

      {/* 추가된 섹션: 데이터 시각화 */}
      <div className="data-visualization">
        <h2>데이터 시각화로 쉽게 확인하세요</h2>
        <p>
          작품 정보와 작가 정보를 제공하며, 플랫폼별 작품 수,
          <br />
          시청률, 조회수, 평점 비교{" "}
          <span className="highlight">데이터를 시각화</span>하여 쉽게 확<br />
          인할 수 있습니다.
        </p>
        {/* 이미지 추가 */}
        <img
          src="이미지_주소"
          alt="데이터 시각화 예시 이미지"
          style={{ width: "100%", height: "auto", marginTop: "20px" }}
        />
      </div>

      {/* 소비자 유형 분석 리포트 */}
      <div className="report-section">
        <h2>소비자 유형 분석 리포트</h2>
        <div className="report-content">
          <div className="left-content">
            <img src="/path/to/image" alt="어느날 갑자기 서울은" />
            <p>
              <strong>어느날 갑자기 서울은</strong>
            </p>
            <p>
              내용: 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다.
              외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다.
              헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
              헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이
              있어야 한다.
            </p>

            {/* 라인 차트가 크게 표시되도록 크기 조정 */}
            <div
              className="chart-container"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              <p>회차별 조회수</p>
              <Line
                data={lineChartData}
                options={lineChartOptions} // 라인 차트 옵션 적용
                width={800} // 라인 차트의 너비 설정
                height={600} // 라인 차트의 높이 설정
              />
            </div>
          </div>

          <div className="right-content">
            {/* 나라별 선호도 */}
            <div
              className="chart-container"
              style={{ maxWidth: "200px", margin: "0 auto" }}
            >
              <h3>나라별 선호도</h3>
              <Doughnut
                data={doughnutChartData2}
                options={doughnutChartOptions}
                width={200} // 도넛 차트 크기를 조정
                height={200} // 도넛 차트 크기를 조정
              />
            </div>
            {/* 성별/연령대별 선호도 */}
            <div
              className="bar-chart-container"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <h3>성별/연령대별 선호도</h3>
              <Bar
                data={barChartData}
                options={barChartOptions}
                width={200} // Bar 차트의 너비 설정
                height={200} // Bar 차트의 높이 설정
              />
            </div>
            {/* 드라마 제작 성공률 */}
            <div className="success-rate">
              <h6>드라마 제작 성공률</h6>
              <p>89%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
