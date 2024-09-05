import { Col, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

interface OTTPlatformData {
  NetflixCount: number;
  WavveCount: number;
  TvingCount: number;
  DisneyCount: number;
}

const DoughnutChart: React.FC = () => {
  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ["Netflix", "Disney+", "Tving", "Wavve"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#113CCF", "#E50914", "#6FA0E6", "#FF7C74"],
      },
    ],
  });

  useEffect(() => {
    const url = "http://localhost:8001/api/chart/ott-platform";
    axios
      .get<OTTPlatformData>(url)
      .then((rep) => {
        const ottPlatform = rep.data;

        const labels = ["Netflix", "Wavve", "Tving", "Disney+"];
        const data = [
          ottPlatform.NetflixCount,
          ottPlatform.WavveCount,
          ottPlatform.TvingCount,
          ottPlatform.DisneyCount,
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const generateLegend = (chart: any) => {
    const labels = chart.data.labels;
    const dataset = chart.data.datasets[0];
    return labels
      .map(
        (label: string, index: number) =>
          `<li style="width: 50%; display: inline-block; text-align: center;">
            <span style="background-color:${dataset.backgroundColor[index]}; width: 15px; height: 15px; display: inline-block; margin-right: 5px;"></span>
            ${label}
          </li>`
      )
      .join("");
  };

  return (
    <Col span={24}>
      <Card bordered={false} style={{ height: "100%" }}>
        <div style={{ height: "200px", width: "400px" }}>
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false, // 기본 범례 숨기기
                  position: "right",
                },
                title: {
                  display: true,
                  text: "플랫폼별 사용자 수",
                },
              },
              animations: {
                rotate: {
                  easing: "easeInOutSine",
                  duration: 1500,
                },
                scale: {
                  from: 0,
                  to: 1,
                  easing: "easeOutElastic",
                  duration: 2000,
                },
              },
            }}
            plugins={[
              {
                id: "custom-legend",
                afterUpdate: (chart: any) => {
                  const legendContainer =
                    document.getElementById("legend-container");
                  if (legendContainer) {
                    legendContainer.innerHTML = generateLegend(chart);
                  }
                },
              },
            ]}
          />
          <ul
            id="legend-container"
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "20px",
            }}
          />
        </div>
      </Card>
    </Col>
  );
};

export default DoughnutChart;
