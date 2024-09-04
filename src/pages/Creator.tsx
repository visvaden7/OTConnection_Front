import React, { useState } from "react";
import "./Creator.css";

const CreatorPage: React.FC = () => {
  // 기본 탭 상태로 '글/그림 작가'를 선택
  const [activeTab, setActiveTab] = useState("writer");

  return (
    <div className="page-container">
      {/* 탭 버튼 - 클릭하면 상태 변경 */}
      <div className="header">
        <div
          className={`tab ${activeTab === "writer" ? "active" : ""}`}
          onClick={() => setActiveTab("writer")} // '글/그림 작가' 탭 클릭 시
        >
          글/그림 작가
        </div>
        <div
          className={`tab ${activeTab === "director" ? "active" : ""}`}
          onClick={() => setActiveTab("director")} // '연출/감독' 탭 클릭 시
        >
          연출/감독
        </div>
      </div>

      {/* 그리드 컨텐츠 - 선택된 탭에 따라 다른 내용 표시 */}
      <div className="grid-container">
        {activeTab === "writer" &&
          Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="grid-item" />
          ))}

        {activeTab === "director" &&
          Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="grid-item" />
          ))}
      </div>
    </div>
  );
};

export default CreatorPage;
