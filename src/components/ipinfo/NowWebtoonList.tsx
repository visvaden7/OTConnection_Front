// WebtoonList.tsx
import React from "react";
import { Row, Col } from "antd";
import WebtoonCard from "./NowWebtoonCard"; // WebtoonCard import
import "./NowWebtoonList.css"; // 추가: 스타일 적용

const webtoons = [
  { title: "웹툰 1", rating: 4.5, views: 10, rank: 1 },
  { title: "웹툰 2", rating: 4.0, views: 8, rank: 2 },
  { title: "웹툰 3", rating: 3.8, views: 7, rank: 3 },
  { title: "웹툰 4", rating: 4.2, views: 9, rank: 4 },
];

const WebtoonList: React.FC = () => {
  return (
    <div className="webtoon-list-container">
      <div className="title-container">
        <h2>지금 가장 인기 있는 웹툰은?</h2>
      </div>
      <div className="cards-container">
        <Row gutter={[16, 16]}>
          {webtoons.map((webtoon) => (
            <Col span={12} key={webtoon.rank}>
              <WebtoonCard
                title={webtoon.title}
                rating={webtoon.rating}
                views={webtoon.views}
                rank={webtoon.rank}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WebtoonList;
