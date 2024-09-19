import './ComparisonIp.css';
import {FunctionComponent, useEffect, useState} from "react";
import {API_ENDPOINT} from "../../assets/const/constant.ts";
import axios from "axios";

interface Props {
  title: string,
  webtoon_title: string,
  webtoon_platform: string,
  webtoon_start_date: string,
  webtoon_end_date: string,
  total_views: number,
  rating: number,
  release_date: string,
  watch_time: number,
  imdb_rating: number
}

export const ComparisonIp: FunctionComponent = () => {
  const [ipData, setIpData] = useState<Props>()
  useEffect(() => {
    const getIpDetailInfo = async () => {
      try {
        const url = `${API_ENDPOINT}/post/25`
        const response = await axios.get(url)
        setIpData(response.data)
      } catch (err) {
        console.log("err :", err)
      }
    }
    void getIpDetailInfo()
  }, []);
  return (
    ipData ?
      <div className="comparison-container">
        {/* 제목 및 이미지 섹션 */}
        <div className="header-section">
          <h1>‘선재 업고 튀어’ 원작 ‘내일의 으뜸’ 과 비교분석</h1>
          {ipData ? <iframe width="600" height="300" src="https://www.youtube.com/embed/LXhASj1rpRY"
                            title="《선재 업고 튀어》원작《내일의 으뜸》과의 차이, 당신이 몰랐던 6가지 사실"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> :
            <img src="https://via.placeholder.com/600x300" alt="비교분석 이미지" className="comparison-image"/>}
        </div>
        
        {/* 정보 섹션 */}
        <div className="info-section">
          {/* 웹툰 정보 */}
          <div className="webtoon-info">
            <h2>웹툰 정보</h2>
            <ul>
              <li>카카오 웹툰 평점 {ipData.rating}</li>
              <li>연재 시작: {ipData.webtoon_start_date}</li>
              <li>연재 종료: {ipData.webtoon_end_date ? ipData.webtoon_end_date : "연재중"}</li>
            </ul>
          </div>
          
          {/* OTT 드라마 정보 */}
          <div className="ott-info">
            <h2>OTT 드라마 정보</h2>
            <ul>
              <li>1. IMDb 평점: {ipData.imdb_rating}</li>
              <li>2. 공개일: {ipData.release_date}</li>
              <li>3. 총 시청시간: {ipData.watch_time}</li>
            </ul>
          </div>
        </div>
        
        {/* 하이라이트 섹션 */}
        <div className="highlights-section">
          <div className="webtoon-highlights">
            <h2>웹툰 하이라이트</h2>
            <ul>
              <li>1. 시작의 단서</li>
              <li>2. 가장 긴장감 넘치는 씬</li>
              <li>3. 클라이맥스</li>
              <li>4. 반전의 시기</li>
              <li>5. 웹툰의 모든 것</li>
            </ul>
          </div>
          
          <div className="drama-highlights">
            <h2>드라마 하이라이트</h2>
            <ul>
              <li>1. 첫 장면</li>
              <li>2. 클라이맥스 씬</li>
              <li>3. 반전의 순간</li>
              <li>4. 캐릭터의 전환</li>
              <li>5. 완벽한 엔딩</li>
            </ul>
          </div>
        </div>
        
        {/* 주요 차이점 */}
        <div className="differences-section">
          <h2>주요 차이점 5가지</h2>
          <ol>
            <li>남주의 긴장감 있는 등장</li>
            <li>여주와의 로맨스가 더 강하게 표현됨</li>
            <li>웹툰과 달리 드라마는 클라이맥스 부분에서 큰 변화를 보임</li>
            <li>OST의 몰입도 상승</li>
            <li>드라마에서는 새로운 캐릭터가 등장하여 중요한 역할을 함</li>
          </ol>
        </div>
      </div>
      : null
  );
};


