import React from "react";
import { Button, Tooltip, Progress } from "antd";
import { HeartOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // Ant Design 스타일 가져오기

const DramaDetail: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* 1. 찜하기 버튼 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>내 남편과 결혼해줘</h1>
        <Button type="primary" icon={<HeartOutlined />}>
          찜하기
        </Button>
      </div>

      {/* 2. OTT 로고 */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <img src="netflix-logo.png" alt="Netflix" style={{ width: "50px" }} />
        <img src="disney-logo.png" alt="Disney+" style={{ width: "50px" }} />
      </div>

      {/* 3. 메인 포스터 이미지 */}
      <div style={{ margin: "20px 0" }}>
        <img
          src="main-poster.png"
          alt="Main Poster"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>

      {/* 4, 5. IMDB 점수와 툴팁 */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Tooltip title="IMDB 정보">
            <QuestionCircleOutlined style={{ fontSize: "24px" }} />
          </Tooltip>
          <img src="imdb-logo.png" alt="IMDB" style={{ width: "50px" }} />
          <span>7.5</span>
        </div>

        {/* 6. 성별 관심 그래프 */}
        <div>
          <h3>성별 관심도</h3>
          <Progress percent={65} success={{ percent: 65 }} />
        </div>

        {/* 7. 나이대별 관심도 그래프 */}
        <div>
          <h3>나이대별 관심도</h3>
          {/* 간단한 바 차트 예시 (커스텀 디자인 필요) */}
          <div>10대: 11%</div>
          <div>20대: 24%</div>
          <div>30대: 29%</div>
          <div>40대: 24%</div>
          <div>50대: 12%</div>
        </div>
      </div>
    </div>
  );
};

export default DramaDetail;
