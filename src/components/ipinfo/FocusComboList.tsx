import { Row, Col } from "antd";
import ComboCard from "./FocusComboCard"; // 정확한 경로 확인

const ComboList = () => {
  const data = [
    {
      ottImage: "netflix-logo.svg",
      dramaTitle: "드라마 1",
      averageRating: 8.5,
    },
    { ottImage: "disney-logo.svg", dramaTitle: "드라마 2", averageRating: 7.3 },
    { ottImage: "tving-logo.svg", dramaTitle: "드라마 3", averageRating: 9.1 },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <ComboCard
              ottImage={item.ottImage}
              dramaTitle={item.dramaTitle}
              averageRating={item.averageRating}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ComboList;
