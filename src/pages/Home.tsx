import {Col, Input, Layout, Row} from "antd";
import {FunctionComponent, useCallback} from "react";
import BarChart from "../components/chart/BarChart";
import DoughnutChart from "../components/chart/DoughnutChart";
import StackedBarChartData from "../components/chart/StackedBarChart";
import CommunityHighlights from "../components/home/CommunityHighlights";
import DramaCarousel from "../components/home/DramaCarousel";
import InterestedWebtoonList from "../components/home/InterestedWebtoonList";
import "./Home.css";

const {Content} = Layout;
const {Search} = Input;

export const Home: FunctionComponent = () => {
  const onSearch = useCallback((value: string) => {
    console.log("Search:", value);
  }, []);
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
      {/* 0. 검색창 추가 */}
      <Row
        gutter={[16, 16]}
        style={{marginBottom: "20px", marginTop: "20px"}}
      >
        <Col span={24}>
          <Search
            placeholder="검색어를 입력해 주세요"
            allowClear
            enterButton
            onSearch={onSearch}
            size="large"
            style={{width: "100%", maxWidth: "600px", margin: "0 auto"}}
          />
        </Col>
      </Row>
      
      {/* 1. 최고 평점 OTT 드라마 및 플랫폼별 사용자 수 */}
      <Row gutter={[16, 16]} style={{marginBottom: "80px"}}>
        <Col xs={24} md={14} style={{height: "300px"}}>
          <BarChart/> {/* BarChart 컴포넌트 사용 */}
        </Col>
        <Col xs={24} md={8}>
          <Row>
            <StackedBarChartData/>
            <DoughnutChart/>
          </Row>
        </Col>
      </Row>
      
      <div style={{height: "10px"}}></div>
      
      {/* 2. 최신 OTT 드라마, 커뮤니티 하이라이트, 인기 웹툰, 푸터를 감싸는 컨테이너 */}
      <div>
        <Row style={{marginBottom: "60px", marginTop: "-130px"}}>
          <Col span={24}>
            <DramaCarousel/>
          </Col>
        </Row>
        
        <Row
          gutter={[16, 16]}
          style={{marginBottom: "0", paddingBottom: "0"}}
        >
          <Col xs={24} md={14}>
            <CommunityHighlights/>
          </Col>
          
          <Col xs={24} md={10}>
            <InterestedWebtoonList/>{" "}
          </Col>
        </Row>
      </div>
    </Content>
  );
};
