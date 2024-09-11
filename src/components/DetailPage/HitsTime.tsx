import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Layout, Menu, Row, Col, Card, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

const { Sider, Content } = Layout;
const { Text } = Typography;

// Chart.js에 필요한 요소를 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [scrollIndex, setScrollIndex] = useState(0);

  const refClick = (obj: any) => {
    setScrollIndex(Number(obj.key));
  };

  useEffect(() => {
    sectionRefs[scrollIndex].current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollIndex]);

  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "웹툰 조회수",
        data: [100000, 200000, 700000, 750000, 500000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        // lineTension: 0.8,
      },
      {
        label: "OTT 누적 조회수",
        data: [50000, 150000, 200000, 250000, 300000],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        // lineTension: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "'내 남편과 결혼해줘' 웹툰/OTT 조회수 비교",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              return tickValue / 10000 + "만";
            }
            return tickValue;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // 원작 정보 카드 스타일링
  const originalInfo = (
    <Card
      title="원작 정보"
      bordered={false}
      ref={sectionRefs[1]}
      style={{ width: "100%", marginTop: "16px" }}
    >
      <Row gutter={16} align="middle">
        <Col span={6} style={{ textAlign: "center" }}>
          <img
            src="https://image-comic.pstatic.net/webtoon/783769/thumbnail/thumbnail_IMAG21_fc14e4e2-e62f-4d77-8f46-9fb05cffa77a.jpeg"
            alt="웹툰 이미지"
            style={{
              width: "100%",
              maxWidth: "150px",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col span={18}>
          <Row gutter={[0, 16]}>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>플랫폼</Text>
            </Col>
            <Col span={12}>
              <Text>네이버웹툰</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>작가</Text>
            </Col>
            <Col span={12}>
              <Text>LICO</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>작화</Text>
            </Col>
            <Col span={12}>
              <Text>LICO</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>장르</Text>
            </Col>
            <Col span={12}>
              <Text>로맨스, 드라마</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>평점</Text>
            </Col>
            <Col span={12}>
              <Text>9.8</Text>
            </Col>
            <Col span={12}>
              <Text style={{ fontWeight: "bold" }}>조회수</Text>
            </Col>
            <Col span={12}>
              <Text>583만</Text>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 웹툰 회차, 좋아요, 관심 수 */}
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}
          >
            <Text style={{ display: "block", fontSize: "16px" }}>
              웹툰 회차
            </Text>
            <Text
              style={{ display: "block", fontSize: "24px", fontWeight: "bold" }}
            >
              69 회
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}
          >
            <Text style={{ display: "block", fontSize: "16px" }}>좋아요</Text>
            <Text
              style={{ display: "block", fontSize: "24px", fontWeight: "bold" }}
            >
              583개
            </Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}
          >
            <Text style={{ display: "block", fontSize: "16px" }}>관심 수</Text>
            <Text
              style={{ display: "block", fontSize: "24px", fontWeight: "bold" }}
            >
              96만
            </Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );

  // 관련 콘텐츠 카드
  const relatedContent = (
    <Card
      title="관련콘텐츠"
      bordered={false}
      ref={sectionRefs[2]}
      style={{ width: "100%", marginTop: "24px" }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card
            bordered={true}
            style={{
              textAlign: "center",
              backgroundColor: "#fafafa",
              borderRadius: "15px",
            }}
          >
            <Text style={{ display: "block", fontSize: "18px" }}>
              내 남편과 결혼해줘
            </Text>
            <Text
              style={{
                display: "block",
                fontSize: "14px",
                color: "#8c8c8c",
                marginTop: "8px",
              }}
            >
              원작과의 비교 콘텐츠
            </Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );

  // 차트 카드 스타일링
  const chartCard = (
    <Card
      title="조회수/시청시간"
      bordered={false}
      ref={sectionRefs[0]}
      style={{ width: "100%", marginTop: "16px" }}
    >
      <div style={{ width: "100%", height: "400px" }}>
        <Line data={data} options={options} />
      </div>
    </Card>
  );

  // 범례 스타일링
  const customLegend = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "16px" }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#4bc0c0",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          <span style={{ color: "white", fontSize: "12px" }}>✔</span>
        </div>
        <Text>웹툰 조회수</Text>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#ff6384",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          <span style={{ color: "white", fontSize: "12px" }}>✔</span>
        </div>
        <Text>OTT 누적 시청률</Text>
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 왼쪽 사이드바 */}
      <Sider width={200} style={{ background: "#fff", height: "300px" }}>
        {/* 사이드바 타이틀 */}
        <div
          style={{
            padding: "16px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            borderBottom: "1px solid #ddd",
          }}
        >
          내 남편과 결혼해줘
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={refClick}
          items={[
            { key: "0", label: "조회수/시청시간" },
            { key: "1", label: "원작 정보" },
            { key: "2", label: "관련 콘텐츠" },
          ]}
        />
      </Sider>

      {/* 오른쪽 차트 영역 */}
      <Layout style={{ padding: "24px", minHeight: "100vh" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            backgroundColor: "#fff",
          }}
        >
          {/* 차트 카드 */}
          {chartCard}

          {/* 사용자 정의 범례 */}
          {customLegend}

          {/* 원작 정보 영역 */}
          {originalInfo}

          {/* 관련 콘텐츠 영역 */}
          {relatedContent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LineChart;
