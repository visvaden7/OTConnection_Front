import React from "react";
import { Card, Col, Layout, Row } from "antd";
import "./Graph.css";
import StackedBarChartData from "../components/chart/StackedBarChart";
import DoughnutChart from "../components/chart/DoughnutChart";
import BarChart from "../components/chart/BarChart"; // 새로 만든 BarChart 컴포넌트 임포트
import DramaCarousel from "../components/home/DramaCarousel"; // DramaCarousel 컴포넌트 임포트
import InterestedWebtoonList from "../components/home/InterestedWebtoonList"; // InterestedWebtoonList 컴포넌트 임포트
import CommunityHighlights from "../components/home/CommunityHighlights"; // CommunityHighlights 컴포넌트 임포트

const { Content } = Layout;

const Graph: React.FC = () => {
  return (
    <Content
      className="content"
      style={{
        padding: "0 20px",
        maxWidth: "100%",
        boxSizing: "border-box",
        margin: "0 auto",
        flex: "1",
        overflowX: "hidden",
      }}
    >
      {/* 1. 최고 평점 OTT 드라마 및 플랫폼별 사용자 수 */}
      <Row gutter={[16, 16]} style={{ marginBottom: "80px" }}>
        <Col xs={24} md={14} style={{ height: "300px" }}>
          <Card bordered={false} style={{ height: "400px" }}>
            <BarChart /> {/* BarChart 컴포넌트 사용 */}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Row>
            <StackedBarChartData />
            <DoughnutChart />
          </Row>
        </Col>
      </Row>

      <div style={{ height: "10px" }}></div>

      {/* 최신 OTT 드라마, 커뮤니티 하이라이트, 인기 웹툰, 푸터를 감싸는 컨테이너 */}
      <div>
        <Row style={{ marginBottom: "60px", marginTop: "-130px" }}>
          <Col span={24}>
            <DramaCarousel /> {/* DramaCarousel 컴포넌트 사용 */}
          </Col>
        </Row>

        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "0", paddingBottom: "0" }}
        >
          <Col xs={24} md={14}>
            <CommunityHighlights /> {/* CommunityHighlights 컴포넌트 사용 */}
          </Col>

          <Col xs={24} md={10}>
            <InterestedWebtoonList />{" "}
            {/* InterestedWebtoonList 컴포넌트 사용 */}
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Graph;
