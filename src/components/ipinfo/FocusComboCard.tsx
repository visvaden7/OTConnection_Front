import React from "react";

interface ComboCardProps {
  poster: string;
  title: string;
  total_rating: number;
  logoImage: string; // 로고 이미지를 위한 prop 추가
  onClick?: () => void;
}

const FocusComboCard: React.FC<ComboCardProps> = ({
  poster,
  title,
  total_rating,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative", // 부모 요소에 relative 설정
        textAlign: "left",
      }}
    >
      {/* 이미지 추가 */}
      <img
        src={poster}
        alt={`${title} OTT`}
        style={{width: "100%", borderRadius: "8px"}}
      />
      
      {/* 로고 추가 (오른쪽 상단에 위치) */}
      <img
        src={"/iconLogo/netflix.svg"}
        alt="OTT 로고"
        style={{
          position: "absolute", // 절대 위치 설정
          top: "10px", // 상단에서 10px 띄우기
          right: "10px", // 오른쪽에서 10px 띄우기
          width: "40px", // 로고 크기 설정 (원하는 크기로 조정 가능)
          height: "40px",
        }}
      />
      
      {/* 드라마 타이틀 왼쪽 정렬 */}
      <h3 style={{marginTop: "10px", marginBottom: "5px"}}>{title}</h3>
      
      {/* 평균 평점 오른쪽 정렬, 타이틀과 더 가까이 */}
      <p
        style={{
          textAlign: "right",
          margin: "0",
          marginTop: "-30px", // 타이틀과 간격을 줄이기 위해 음수 값 사용
        }}
      >
        평균 평점: {total_rating}
      </p>
    </div>
  );
};

export default FocusComboCard;
