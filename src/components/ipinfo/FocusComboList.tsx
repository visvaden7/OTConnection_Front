import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../assets/const/constant.ts";
import { OttPlatform } from "../../assets/enum/OttPlatformEnum.ts";
import ComboCard from "./FocusComboCard";

// Drama 타입 정의
//TODO: ItemData => 수정
interface DramaData {
  id: number;
  title: string;
  platform: OttPlatform[];
  poster: string;
  total_rating: number;
}

// type Drama = Pick<ItemData, "ip_id" | "platform"> & { total_rating: number; };

const FocusComboList: React.FC = () => {
  // 상태로 data를 관리 (타입 정의 추가)
  const [data, setData] = useState<DramaData[]>([]);

  // 백엔드에서 데이터를 가져오는 함수
  const getFocusData = async () => {
    try {
      const response = await axios(
        `${API_ENDPOINT}/ipInfo/focusWebtoonOttComboData`,
      ); // 여기에 백엔드 API URL을 넣어줘
      const result: DramaData[] = await response.data;
      setData(result); // 데이터를 상태에 저장
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    getFocusData().then();
  }, []);
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <ComboCard
              platform={item.platform}
              poster={item.poster}
              title={item.title}
              total_rating={item.total_rating}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FocusComboList;
