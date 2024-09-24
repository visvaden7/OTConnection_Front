import { Card, Col } from "antd";
import axios from "axios";
import {FunctionComponent, useEffect, useState} from "react";
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
    labels: ["Netflix", "Disney+", "Tving", "Wavve"],
    datasets: [
      {
        data: ["40", "30", "20", "10"],
        backgroundColor: ["#113CCF", "#E50914", "#6FA0E6", "#FF7C74"],
      },
    ],
  });

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Col span={24}>
      <Card bordered={false}>
        {/* 차트 컨테이너 */}
        <div style={{ width: "360px", height: "392px" }}>
          {/* 차트 */}
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "right",
                },
                title: {
                  display: true,
                  text: "플랫폼별 사용자 수               ", // 공백을 추가하여 살짝 이동
                  padding: {
                    top: 0,
                    bottom: -15,
                  },
                  font: {
                    size: 20,
                  },
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
          />
        </div>
      </Card>
    </Col>
  );
};

export default DoughnutChart;
