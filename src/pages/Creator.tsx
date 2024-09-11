import React, {useState} from "react";
import "./Creator.css";

const CreatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("writer");
  
  return (
    <div className="page-container">
      {/* 탭 버튼 - header 제거하고 바로 탭으로 적용 */}
      <div
        className={`tab ${activeTab === "writer" ? "active" : ""}`}
        onClick={() => setActiveTab("writer")}
      >
        글/그림 작가
      </div>
      <div
        className={`tab ${activeTab === "director" ? "active" : ""}`}
        onClick={() => setActiveTab("director")}
      >
        연출/감독
      </div>
      
      {/* 그리드 컨텐츠 - 선택된 탭에 따라 다른 내용 표시 */}
      <div className="grid-container">
        {activeTab === "writer" &&
          Array.from({length: 36}).map((_, index) => (
            <div key={index} className="grid-item"/>
          ))}
        
        {activeTab === "director" &&
          Array.from({length: 36}).map((_, index) => (
            <div key={index} className="grid-item"/>
          ))}
      </div>
    </div>
  );
};

export default CreatorPage;
