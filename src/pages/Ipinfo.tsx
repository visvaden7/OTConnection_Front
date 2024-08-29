import React from "react";
import { Layout, Card, Row, Col, Typography, Button } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const WorksPage: React.FC = () => {
  return (
    <Content style={{ padding: "50px", background: "#fff" }}>
      <div>
        {/* Section 1: Header and OTT-웹툰 콤보 */}
        <header style={{ marginBottom: "40px", marginTop: "50px" }}>
          <Title level={2}>주목할 OTT-웹툰 콤보</Title>
        </header>

        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "10px" }}>
                  <Title level={5}>OTT 드라마 제목</Title>
                  <Paragraph>평균 평점: 4.5/5</Paragraph>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "10px" }}>
                  <Title level={5}>OTT 드라마 제목</Title>
                  <Paragraph>평균 평점: 4.2/5</Paragraph>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "10px" }}>
                  <Title level={5}>OTT 드라마 제목</Title>
                  <Paragraph>평균 평점: 4.3/5</Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Section 2: Popular Webtoon Section */}
        <div style={{ marginTop: "50px" }}>
          <Row gutter={16}>
            {/* 왼쪽 텍스트 섹션 */}
            <Col span={6} style={{ paddingRight: "20px" }}>
              <div style={{ textAlign: "left" }}>
                <Title level={3}>
                  지금 <br />
                  가장
                  <br /> 인기 있는 <br />
                  웹툰은?
                </Title>
              </div>
            </Col>

            {/* 오른쪽 웹툰 카드 섹션 */}
            <Col span={18}>
              <Row gutter={[16, 16]}>
                {[1, 2, 3, 4].map((_, index) => (
                  <Col span={12} key={index}>
                    <Card bordered={false}>
                      <div style={{ textAlign: "center" }}>
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
                        <div style={{ marginBottom: "10px" }}>
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
        </div>
        {/* Move 장르별 작품 탐색 Section Here */}
        <div style={{ marginTop: "50px" }}>
          <Title level={3}>장르별 작품 탐색</Title>

          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <Button type="default" style={{ marginRight: "10px" }}>
              드라마
            </Button>
            <Button type="default" style={{ marginRight: "10px" }}>
              로맨스
            </Button>
            <Button type="default" style={{ marginRight: "10px" }}>
              액션/범죄
            </Button>
            <Button type="default" style={{ marginRight: "10px" }}>
              판타지/SF
            </Button>
            <Button type="default" style={{ marginRight: "10px" }}>
              스릴러/호러
            </Button>
          </div>

          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>OTT 작품 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>웹툰 포지 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>OTT 작품 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>웹툰 포지 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>OTT 작품 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Title level={5}>웹툰 포지 이미지</Title>
                    <Paragraph>
                      웹툰 제목
                      <br />
                      장르 1, 장르 2
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default WorksPage;
