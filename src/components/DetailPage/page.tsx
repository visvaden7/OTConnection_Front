import React from "react";
import { Button, Card, Row, Col } from "antd";
import { HeartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

// chart.js 구성 요소 등록
ChartJS.register(ArcElement, ChartTooltip, Legend);

const Page: React.FC = () => {
  // IMDB 점수 관련 데이터 설정
  const score = 7.5;
  const percentage = (score / 10) * 100;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#f5c518", "#e0e0e0"], // 노란색
        borderWidth: 0,
        cutout: "70%", // 도넛 안쪽 비율
      },
    ],
  };

  const options = {
    rotation: -90, // 그래프 시작 위치를 -90도로 설정 (위쪽에서 시작)
    circumference: 180, // 반원형으로 만들기 위해 180도 설정
    plugins: {
      legend: { display: false }, // 범례 숨김
      tooltip: { enabled: false }, // 툴팁 숨김
    },
  };

  // 나이대별 관심도 데이터
  const ageInterestData = [
    { age: "10대", percentage: 11 },
    { age: "20대", percentage: 24 },
    { age: "30대", percentage: 29 },
    { age: "40대", percentage: 24 },
    { age: "50대", percentage: 12 },
  ];

  // 주요 출연진 데이터 예시
  const castData = [
    {
      name: "박민영",
      image:
        "https://search.pstatic.net/common?type=f&size=176x224&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231227_55%2F1703637306351Cgl29_JPEG%2F60_main_image_new_1703637306320.jpg",
    },
    {
      name: "박민영",
      image:
        "https://search.pstatic.net/common?type=f&size=176x224&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231227_55%2F1703637306351Cgl29_JPEG%2F60_main_image_new_1703637306320.jpg",
    },
    {
      name: "박민영",
      image:
        "https://search.pstatic.net/common?type=f&size=176x224&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231227_55%2F1703637306351Cgl29_JPEG%2F60_main_image_new_1703637306320.jpg",
    },
    {
      name: "박민영",
      image:
        "https://search.pstatic.net/common?type=f&size=176x224&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231227_55%2F1703637306351Cgl29_JPEG%2F60_main_image_new_1703637306320.jpg",
    },
    {
      name: "박민영",
      image:
        "https://search.pstatic.net/common?type=f&size=176x224&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231227_55%2F1703637306351Cgl29_JPEG%2F60_main_image_new_1703637306320.jpg",
    },
  ];

  return (
    <div className="drama-detail-page">
      {/* OTT 로고 */}
      <div
        className="ott-logo"
        style={{ textAlign: "center", marginBottom: "16px" }}
      >
        <img
          src="/iconLogo/netflix.svg"
          alt="Netflix"
          style={{ width: "25px", marginRight: "10px" }}
        />
        <img
          src="/iconLogo/disney plus.png"
          alt="Disney+"
          style={{ width: "50px" }}
        />
      </div>

      {/* 타이틀과 찜하기 버튼 */}
      <div
        className="title-and-button"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "16px",
          marginTop: "-70px",
        }}
      >
        <h2 style={{ marginRight: "16px" }}>내 남편과 결혼해줘</h2>
        <Button type="primary" icon={<HeartOutlined />}>
          찜하기
        </Button>
      </div>

      {/* 드라마 이미지 */}
      <div
        className="drama-image"
        style={{ textAlign: "center", marginBottom: "16px" }}
      >
        <img
          src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/oZ7HBsoYNL4IGeHRD7JRnZDCegk.jpg"
          alt="드라마 이미지"
          style={{ width: "100%", borderRadius: "8px", maxWidth: "300px" }}
        />
      </div>

      {/* 카드들을 가로로 정렬 */}
      <Row gutter={[16, 16]} justify="center">
        {/* IMDB 점수 카드 */}
        <Col xs={24} sm={12} md={8}>
          <Card
            title="IMDB 평가"
            style={{
              textAlign: "center",
              height: "335px",
              position: "relative",
            }}
          >
            {/* IMDB 로고와 정보 아이콘 */}
            <div
              className="imdb-logo-info"
              style={{
                position: "absolute",
                top: "140px",
                left: "30px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/iconLogo/IMDB_Logo_2016.svg.png" // 로고 경로 변경
                alt="IMDB Logo"
                style={{
                  width: "50px",
                  marginRight: "30px",
                }}
              />
              <InfoCircleOutlined style={{ fontSize: "24px", color: "#999" }} />
            </div>

            <div className="imdb-score" style={{ marginTop: "50px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {/* 반원형 IMDB 그래프 */}
                <div
                  className="imdb-chart"
                  style={{
                    position: "relative",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <Doughnut data={data} options={options} />

                  {/* 중앙 텍스트 */}
                  <div
                    className="imdb-chart-text"
                    style={{
                      position: "absolute",
                      top: "60%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {score}점
                    </div>
                    <div style={{ fontSize: "10px", color: "#999" }}>/10점</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 성별 관심도 카드 */}
        <Col xs={24} sm={12} md={8}>
          <Card title="성별 관심도" style={{ textAlign: "center" }}>
            <div style={{ height: "10px" }}></div>
            <div className="gender-interest">
              <div
                style={{
                  position: "relative",
                  height: "30px",
                  backgroundColor: "#E0E0E0",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginTop: "160px",
                }}
              >
                {/* 남성 35% */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "0",
                    height: "100%",
                    width: "35%",
                    backgroundColor: "blue",
                  }}
                ></div>
                {/* 여성 65% */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "0",
                    height: "100%",
                    width: "65%",
                    backgroundColor: "#faad14",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span>여성 65%</span>
                <span>남성 35%</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* 나이대별 관심도 카드 */}
        <Col xs={24} sm={12} md={8}>
          <Card
            title="나이대 별 관심도"
            style={{ textAlign: "center", height: "335px" }}
          >
            <div style={{ height: "10px" }}></div>
            <div className="age-interest">
              <div className="bars" style={{ marginTop: "80px" }}>
                {ageInterestData.map((item) => (
                  <div
                    key={item.age}
                    className="bar"
                    style={{ marginBottom: "10px" }}
                  >
                    {/* 퍼센트 수치 */}
                    <div
                      className="percentage"
                      style={{ marginBottom: "5px", fontWeight: "bold" }}
                    >
                      {item.percentage}%
                    </div>
                    {/* 그래프 바 */}
                    <div
                      style={{
                        height: `${item.percentage * 3.5}px`,
                        backgroundColor:
                          item.age === "30대" ? "#722ED1" : "#E0E0E0",
                      }}
                    ></div>
                    {/* 나이대 */}
                    <div className="age-label">{item.age}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 줄거리, 연출/감독, 회차, 방영일 */}
      <Row justify="center" style={{ marginTop: "20px", textAlign: "center" }}>
        <Col span={24}>
          <div className="drama-info">
            <p>
              <strong>줄거리</strong>: 절친과 남편의 불륜을 목격한 날, 난
              살해당했다. 그런데 눈 떠보니 10년 전?! 인생 2회차, 시궁창 같은
              운명을 그들에게 돌려주기 위한 '본격 운명 개척 드라마'
            </p>
            <p>
              <strong>연출/감독</strong>: Shin Yoo-dam
            </p>
            <p>
              <strong>회차</strong>: 16부작
            </p>
            <p>
              <strong>방영일</strong>: 2024년 01월 01일
            </p>
          </div>
        </Col>
      </Row>

      {/* 주요 출연진 */}
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {castData.map((actor, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <Card
              cover={
                <img
                  src={actor.image}
                  alt={actor.name}
                  style={{ borderRadius: "8px", height: "200px" }}
                />
              }
            >
              <Card.Meta title={actor.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Page;
