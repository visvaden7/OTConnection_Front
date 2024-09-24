import './ComparisonPost.css';
import {FunctionComponent, useEffect, useState} from "react";
import {API_ENDPOINT} from "../../assets/const/constant.ts";
import axios from "axios";
import {ResponseCompareInfoList} from "../../@types/api.ts";

interface Props {
  postId: string
}
export const ComparisonPost: FunctionComponent<Props> = ({postId}) => {
  const [ipData, setIpData] = useState<ResponseCompareInfoList>()
  useEffect(() => {
    const getIpDetailInfo = async () => {
      try {
        const url = `${API_ENDPOINT}/post/compare/${postId}`
        const response = await axios.get<ResponseCompareInfoList>(url)
        console.log(response.data)
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
          <h1>{ipData.title}</h1>
          {ipData ? <iframe width="600" height="300" src={ipData.compare_youtube_url}
                            title="《선재 업고 튀어》원작《내일의 으뜸》과의 차이, 당신이 몰랐던 6가지 사실"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe> :
            <img src="https://via.placeholder.com/600x300" alt="비교분석 이미지" className="comparison-image"/>}
        </div>
        
        {/* 정보 섹션 */}
        <div className="info-section">
          {/* 웹툰 정보 */}
          <div className="comparison-webtoon-info">
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
              {ipData.webtoon_highlight.map((highlight,idx) => {
                return <li key={idx}>{highlight}</li>
              })}
            </ul>
          </div>
          
          <div className="drama-highlights">
            <h2>드라마 하이라이트</h2>
            <ul>
              {ipData.ott_highlight.map((highlight,idx) => {
                return <li key={idx}>{highlight}</li>
              })}
            </ul>
          </div>
        </div>
        
        {/* 주요 차이점 */}
        <div className="differences-section">
          <h2>주요 차이점 5가지</h2>
          <ol>
            {ipData.diff_ott_webtoon.map((diff, idx) => {
              return <li key={idx}>{diff}</li>
            })}
          </ol>
        </div>
      </div>
      : null
  );
};


