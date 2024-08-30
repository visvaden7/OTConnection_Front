import { Col, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart: React.FunctionComponent = () => {
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
      .get(url)
      .then((rep) => {
        const ottPlatform = rep.data;

        // 데이터 구조에서 labels와 data 추출
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
              backgroundColor: [" #E50914", "#6FA0E6 ", "#FF7C74", "#113CCF"],
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
      <Card
        // title="플랫폼별 사용자 수"
        bordered={false}
        style={{ height: "100%" }}
      >
        <div style={{ height: "240px" }}>
          {" "}
          {/* 차트 크기 조정 */}
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "플랫폼별 사용자 수",
                },
              },
              animations: {
                rotate: {
                  easing: "easeInOutSine", // 부드럽게 회전하는 애니메이션
                  duration: 1500, // 1.5초 지속 시간
                },
                scale: {
                  from: 0, // 처음엔 0에서 시작
                  to: 1, // 1로 스케일링
                  easing: "easeOutElastic", // 탄성 효과
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

export default DoughnutChart;
