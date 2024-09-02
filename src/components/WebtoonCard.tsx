import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

interface WebtoonCardProps {
  imageTitle: string;
  title: string;
  rating: number;
  views: number;
  rankText: string;
}

const WebtoonCard: React.FC<WebtoonCardProps> = ({
  imageTitle,
  title,
  rating,
  views,
  rankText,
}) => (
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
        <Title level={5}>{imageTitle}</Title>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Title level={5}>{title}</Title>
        <Paragraph>
          평점: {rating} | 조회수: {views}M
        </Paragraph>
      </div>
      <Button type="default" shape="round">
        {rankText}
      </Button>
    </div>
  </Card>
);

export default WebtoonCard;
