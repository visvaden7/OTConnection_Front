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
      {/* 차트 부분 */}
      <div style={{ width: "100%", height: "auto" }}>
        <Doughnut
          style={{ width: "360px", height: "392px" }}
          data={doughnutChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // 기본 범례 비활성화
              },
              title: {
                display: true,
                text: "OTT 플랫폼별 작품비율",
                padding: {
                  top: 0,
                  bottom: 0,
                },
                font: {
                  size: 20,
                  weight: 700,
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
        }}
      >
        {legendData.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                marginRight: "8px",
              }}
            ></div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
