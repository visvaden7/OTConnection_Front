import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";

const {Title, Paragraph} = Typography;

const NowBestWebtoon: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col span={6} style={{paddingRight: "20px"}}>
        <div style={{textAlign: "left"}}>
          <Title level={3}>
            지금 <br/>
            가장
            <br/> 인기 있는 <br/>
            웹툰은?
          </Title>
        </div>
      </Col>
      <Col span={18}>
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4].map((_, index) => (
            <Col span={12} key={index}>
              <Card bordered={false}>
                <div style={{textAlign: "center"}}>
                  <div
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#f0f0f0",
                      height: "150px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Title level={5}>웹툰 표지 이미지</Title>
                  </div>
                  <div style={{marginBottom: "10px"}}>
                    <Title level={5}>제목</Title>
                    <Paragraph>평점: 0.0 | 조회수: 0M</Paragraph>
                  </div>
                  <Button type="default" shape="round">
                    순위
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default NowBestWebtoon;
