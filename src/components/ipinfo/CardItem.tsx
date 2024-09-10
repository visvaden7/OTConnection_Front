import React from "react";
import "./CardItem.css";

interface CardItemProps {
  imageSrc: string;
  title: string;
  genres: string[];
  isOTT?: boolean;
  hasLogo?: boolean; // 로고 유무를 위한 새 속성
}

const CardItem: React.FC<CardItemProps> = ({
  imageSrc,
  title,
  genres,
  hasLogo,
}) => {
  return (
    <div className="card-item">
      <div className="card-image">
        {hasLogo && (
          <div className="logo">
            <img src="/path-to-logo.png" alt="로고위치" />{" "}
            {/* 실제 로고 경로로 교체 */}
          </div>
        )}
        <img src={imageSrc} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{genres.join(", ")}</p>
      </div>
    </div>
  );
};

export default CardItem;
