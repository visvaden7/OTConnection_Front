import React from "react";
import {Card, Button} from "antd";
import "./NowWebtoonCard.css";

interface WebtoonCardProps {
  title: string;
  rating: number;
  views: number;
  rank: number;
  poster: string;
}

const WebtoonCard: React.FC<WebtoonCardProps> = ({
  title,
  rating,
  views,
  rank,
  poster,
}) => {
  return (
    <Card className="webtoon-card">
      <div className="webtoon-cover">
        <img src={poster} alt={`${title} 표지`} className="webtoon-poster"/>
      </div>
      <div className="webtoon-info">
        <div className="webtoon-title-stats">
          <h3 className="webtoon-title">{title}</h3>
          <p className="webtoon-stats">
            평점: {rating.toFixed(1)} | 조회수: {views}M
          </p>
        </div>
        <Button className="rank-button">{rank}위</Button>
      </div>
    </Card>
  );
};

export default WebtoonCard;
