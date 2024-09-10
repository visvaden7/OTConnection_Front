import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ComboCard from "./FocusComboCard"; // 경로를 정확히 확인

// Drama 타입 정의
interface Drama {
  poster: string;
  title: string;
  total_rating: number;
}

const FocusComboList = () => {
  // 상태로 data를 관리 (타입 정의 추가)
  const [data, setData] = useState<Drama[]>([]);

  // 백엔드에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/api/ipInfo/focusWebtoonOttComboData"
      ); // 여기에 백엔드 API URL을 넣어줘
      const result: Drama[] = await response.json(); // 데이터를 JSON 형식으로 변환 후 타입 명시
      setData(result); // 데이터를 상태에 저장
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <ComboCard
              logoImage="logoImageURL" // 필요한 경우 수정 가능
              poster={item.poster} // 백엔드에서 불러온 데이터로 대체
              title={item.title} // 백엔드에서 불러온 데이터로 대체
              total_rating={item.total_rating} // 백엔드에서 불러온 데이터로 대체
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FocusComboList;
