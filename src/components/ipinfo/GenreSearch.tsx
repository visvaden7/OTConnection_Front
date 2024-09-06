import React from "react";
import { Row, Col } from "antd";
import CardItem from "./CardItem";
import "./GenreSearch.css";

// 카드 6개만 정의합니다.
const items = [
  {
    imageSrc: "/ott-image1.jpg",
    title: "OTT 작품 제목 1",
    genres: ["장르1", "장르2"],
    isOTT: true,
    hasLogo: true, // 1번째 카드에 로고 추가
  },
  {
    imageSrc: "/webtoon-image1.jpg",
    title: "웹툰 제목 2",
    genres: ["장르1", "장르2"],
    hasLogo: false,
  },
  {
    imageSrc: "/webtoon-image2.jpg",
    title: "OTT 작품 제목 3",
    genres: ["장르1", "장르2"],
    isOTT: true,
    hasLogo: true, // 3번째 카드에 로고 추가
  },
  {
    imageSrc: "/webtoon-image3.jpg",
    title: "웹툰 제목 4",
    genres: ["장르1", "장르2"],
    hasLogo: false,
  },
  {
    imageSrc: "/ott-image2.jpg",
    title: "OTT 작품 제목 5",
    genres: ["장르1", "장르2"],
    isOTT: true,
    hasLogo: true, // 5번째 카드에 로고 추가
  },
  {
    imageSrc: "/webtoon-image4.jpg",
    title: "웹툰 제목 6",
    genres: ["장르1", "장르2"],
    hasLogo: false,
  },
];

const GenreSearch: React.FC = () => {
  return (
    <Row gutter={[16, 16]} justify="center" align="top" className="main-grid">
      {items.map((item, index) => (
        <Col
          key={index}
          xs={24} // 모바일에서는 1행에 1개씩
          sm={12} // 작은 화면에서는 1행에 2개씩
          md={8} // 중간 크기 이상의 화면에서는 1행에 3개씩
          lg={8} // 큰 화면에서도 1행에 3개씩
        >
          <CardItem
            imageSrc={item.imageSrc}
            title={item.title}
            genres={item.genres}
            isOTT={item.isOTT}
            hasLogo={item.hasLogo} // 로고 조건 추가
          />
        </Col>
      ))}
    </Row>
  );
};

export default GenreSearch;
