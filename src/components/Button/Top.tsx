import React from "react";
import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "./Top.css";

const Top: React.FC = () => {
  return (
    <div>
      {/* BackTop: 스크롤 시 나타나는 상단 이동 버튼 */}
      <BackTop>
        <div className="custom-backtop">
          <UpOutlined style={{ fontSize: "20px", color: "#fff" }} />
        </div>
      </BackTop>
    </div>
  );
};

export default Top;
