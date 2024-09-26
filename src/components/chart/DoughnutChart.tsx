import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { API_ENDPOINT } from "../../const/constant.ts";

interface OTTPlatformData {
  NetflixCount: number;
  WavveCount: number;
  TvingCount: number;
  DisneyCount: number;
}

const DoughnutChart: FunctionComponent = () => {
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ["Netflix", "Disney Plus", "Tving", "Wavve"],
    datasets: [
      {
        data: ["40", "30", "20", "10"],
        backgroundColor: ["#113CCF", "#E50914", "#6FA0E6", "#FF7C74"],
      },
    ],
  });

  const [legendData, setLegendData] = useState([
    { name: "Netflix", color: "#E50914" },
    { name: "Wavve", color: "#6FA0E6" },
    { name: "Tving", color: "#FF7C74" },
    { name: "Disney+", color: "#113CCF" },
  ]);

  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/ott-platform`;
    axios
      .get<OTTPlatformData>(url)
      .then((rep) => {
        const ottPlatform = rep.data;

        const labels = ["Netflix", "Wavve", "Tving", "Disney+"];
        const data = [
          ottPlatform.NetflixCount.toFixed(0),
          ottPlatform.WavveCount.toFixed(0),
          ottPlatform.TvingCount.toFixed(0),
          ottPlatform.DisneyCount.toFixed(0),
        ];

        setDoughnutChartData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["#E50914", "#6FA0E6", "#FF7C74", "#113CCF"],
            },
          ],
        });

        setLegendData([
          { name: "Netflix", color: "#E50914" },
          { name: "Wavve", color: "#6FA0E6" },
          { name: "Tving", color: "#FF7C74" },
          { name: "Disney+", color: "#113CCF" },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{
        marginBottom: "80px",
        position: "relative",
        top: "40px",
        display: "block",
        textAlign: "center",
        left: "40px",
      }}
    >
      {/* 차트 제목을 차트 위에 배치 */}
      <h2
        style={{
          fontWeight: 700,
          fontSize: "20px",
          position: "relative",
          right: "50px",
          bottom: "100px",
        }}
      >
        OTT 플랫폼별 작품 비율
      </h2>

      {/* 차트 부분 */}
      <div
        style={{
          width: "100%",
          height: "auto",
          position: "relative",
          bottom: "100px",
          left: "50px",
        }}
      >
        <Doughnut
          style={{ width: "300px", height: "350px" }}
          data={doughnutChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // 기본 범례 비활성화
              },
              datalabels: {
                formatter: (value) => `${value}%`, // %를 각 데이터에 추가
                color: "black", // 데이터 레이블의 색상 설정 (원하는 색으로 변경 가능)
                font: {
                  weight: "bold", // 글자 굵기 설정
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const dataset = tooltipItem.dataset;
                    const dataIndex = tooltipItem.dataIndex;
                    const value = dataset.data[dataIndex];
                    return `${value}%`; // 툴팁에 % 붙여서 표시
                  },
                },
              },
            },
            animations: {
              rotate: {
                from: 0, // 회전 애니메이션 시작점
                to: 360, // 회전 애니메이션 끝
                duration: 2000, // 회전 시간이 2초 동안 지속
              },
              scale: {
                from: 0.1, // 차트가 10% 크기로 시작
                to: 1, // 끝에 100% 크기로 확대
                duration: 1500, // 1.5초 동안 확대
                easing: "easeOutElastic", // 탄력감 있는 효과
              },
            },
          }}
        />
      </div>

      {/* div로 만드는 범례 */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          position: "relative",
          bottom: "120px",
          left: "107px",
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

export default DoughnutChart;
