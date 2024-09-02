import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface DramaCardProps {
  title: string;
  rating: number;
  image: URL;
}

const DramaCard: React.FC<DramaCardProps> = ({ title, rating }) => (
  <Card bordered={false}>
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "10px" }}>
        <Title level={5}>{title}</Title>
        <Paragraph>평균 평점: {rating}/5</Paragraph>
      </div>
    </div>
  </Card>
);

export default DramaCard;
