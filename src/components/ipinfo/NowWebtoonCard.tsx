// WebtoonCard.tsx
import React from "react";
import { Card, Button } from "antd";
import "./NowWebtoonCard.css";

interface WebtoonCardProps {
  title: string;
  rating: number;
  views: number;
  rank: number;
}

const WebtoonCard: React.FC<WebtoonCardProps> = ({
  title,
  rating,
  views,
  rank,
}) => {
  return (
    <Card className="webtoon-card">
      <div className="webtoon-cover">
        <p>웹툰 표지 이미지</p>
      </div>
      <div className="webtoon-info">
        <h3>{title}</h3>
        <p>
          평점: {rating.toFixed(1)} | 조회수: {views}M
        </p>
        <Button className="rank-button">{rank}위</Button>
      </div>
    </Card>
  );
};

export default WebtoonCard;
