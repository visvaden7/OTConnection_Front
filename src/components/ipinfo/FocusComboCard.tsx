// ComboCard.tsx
import React from "react";

interface ComboCardProps {
  ottImage: string;
  dramaTitle: string;
  averageRating: number;
  onClick?: () => void; // onClick을 선택적 속성으로 변경
}

const ComboCard: React.FC<ComboCardProps> = ({
  ottImage,
  dramaTitle,
  averageRating,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <img src={ottImage} alt={`${dramaTitle} OTT`} />
      <h3>{dramaTitle}</h3>
      <p>평균 평점: {averageRating}</p>
    </div>
  );
};

export default ComboCard;
