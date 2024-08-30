import React from "react";
import "./Creator.css";

const CreatorPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="header">
        <div className="tab">글/그림 작가</div>
        <div className="tab">연출/감독</div>
        <div className="tab active">연출/감독</div>
      </div>
      <div className="grid-container">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="grid-item"></div>
        ))}
      </div>
    </div>
  );
};

export default CreatorPage;
