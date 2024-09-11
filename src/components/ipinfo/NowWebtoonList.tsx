// WebtoonList.tsx
import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import WebtoonCard from "./NowWebtoonCard"; // WebtoonCard import
import "./NowWebtoonList.css"; // 추가: 스타일 적용

interface Webtoon {
  id: number;
  title: string;
  total_rating: string;
  view: number;
  poster: string;
  rank: number;
}

const WebtoonList: React.FC = () => {
  const [webtoon, setWebtoon] = useState<Webtoon[]>([]); // 상태로 웹툰 데이터 관리
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  
  // 데이터를 받아오는 함수
  useEffect(() => {
    const fetchWebtoon = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/ipInfo/nowBestWebtoon"
        ); // 백엔드 API URL 을 넣어야 함
        const data = await response.json();
        setWebtoon(data); // 받아온 데이터를 상태에 저장
        setLoading(false); // 로딩 끝
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };
    
    fetchWebtoon().then(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);
  
  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }
  
  return (
    <div className="webtoon-list-container">
      <div className="title-container">
        <h2>지금 가장 인기 있는 웹툰은?</h2>
      </div>
      <div className="cards-container">
        <Row gutter={[16, 16]}>
          {webtoon.map((webtoon) => (
            <Col span={12} key={webtoon.id}>
              <WebtoonCard
                title={webtoon.title}
                rating={parseFloat(webtoon.total_rating)}
                views={webtoon.view}
                rank={webtoon.rank}
                poster={webtoon.poster} // 포스터 추가
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WebtoonList;
