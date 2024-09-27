import React from "react";
import { FloatButton } from "antd";
import { UpOutlined } from "@ant-design/icons";

const Top: React.FC = () => {
  return (
    <div>
      {/* BackTop: 스크롤 시 나타나는 상단 이동 버튼 */}
      <FloatButton.BackTop>
        <div className="custom-backtop">
          <UpOutlined />
        </div>
      </FloatButton.BackTop>
    </div>
  );
};

export default Top;
