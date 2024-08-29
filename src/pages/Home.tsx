import React from "react";
import { Layout, Row, Col, Input } from "antd";
import Graph from "../components/Graph";

const { Content } = Layout;
const { Search } = Input; // Search 컴포넌트 사용

const LandingPage: React.FC = () => {
  // 검색 함수
  const onSearch = (value: string) => {
    console.log("Search:", value);
  };

  return (
    <Content className="content">
      {/* 0. 검색창 추가 */}
      <Row
        gutter={[16, 16]}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        <Col span={24}>
          <Search
            placeholder="검색어를 입력해 주세요"
            allowClear
            enterButton
            onSearch={onSearch}
            size="large"
            style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
          />
        </Col>
      </Row>

      {/* 1. 최고 평점 OTT 드라마 및 플랫폼별 사용자 수 */}
      <Graph />
    </Content>
  );
};

export default LandingPage;
