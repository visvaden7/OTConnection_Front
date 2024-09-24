import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../assets/const/constant.ts";
import { Nullable } from "../@types/global.ts";
import { Link } from "react-router-dom";
import {IPInfo, VInfo} from "../@types/domain.ts";
import "./Community.css"

type PostInfo = {
  post_id: number;              // 게시물 ID
  ip_id: number;                // IP ID
  com_id: Nullable<number>;     // 커뮤니티 ID (null 허용)
  type: "compare" | "v_casting"; // 타입 (compare 또는 v_casting)
  ip_info: IPInfo;              // IP 관련 정보
  v_info: Nullable<VInfo>;      // 가상 캐스팅 정보 (nullable)
};


export const Community: FunctionComponent = () => {
  const [comparisonData, setComparisonData] = useState<PostInfo[]>([]);
  const [castingData, setCastingData] = useState<PostInfo[]>([]);
  
  const getComparePost = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/post/postList`);
      console.log(response.data);
      setComparisonData(response.data.compare);
      setCastingData(response.data.v_casting);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    void getComparePost();
  }, []);
  
  return (
    comparisonData.length && castingData.length ? (
      <>
        {/* 원작 비교 섹션 */}
        <section className="original-comparison">
          <a href="/community/compare"><h3>원작비교</h3></a>
          <div className="comparison-list">
            {comparisonData.map((item, idx) => (
              <Link to={`/community/compare/${item.post_id}`} key={idx + 100000}>
                <div className="comparison-card">
                  <div className="comparison-thumbnail">
                    <img src={item.ip_info.compare_youtube_url} alt={item.ip_info.title} />
                  </div>
                  <div className="comparison-info">
                    <h3>{item.ip_info.title} 원작비교</h3>
                    <ul>
                      <li>웹툰 평점: {item.ip_info.rating}</li>
                      <li>OTT 평점: {item.ip_info.imdb_rating}</li>
                      <li>총 에피소드: {32}</li>
                      <li>방영 시작일: {item.ip_info.release_date}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 가상 캐스팅 섹션 */}
        <section className="casting-comparison">
          <a href="/community/virtual-casting"><h3>가상캐스팅</h3></a>
          <div className="casting-list">
            {castingData.map((item, idx) => (
              <Link to={`/community/virtual-casting/${item.post_id}`} key={idx}>
                <div className="casting-card">
                  <div className="casting-thumbnail">
                    <img src={item.v_info?.virtual_casting_image_url} alt={`${item.ip_info.title} 메인 캐릭터`} />
                  </div>
                  <div className="casting-info">
                    <h3>{item.v_info?.virtual_casting_title}</h3>
                    <ul>
                      <li>웹툰 평점: {item.ip_info.rating}</li>
                      <li>OTT 평점: {item.ip_info.imdb_rating}</li>
                      <li>총 에피소드: {32}</li>
                      <li>연재 기간: {item.ip_info.webtoon_start_date} ~ {item.ip_info.webtoon_end_date ? item.ip_info.webtoon_end_date : "연재중"}</li>
                    </ul>
                  </div>
                  <div className="casting-character-images">
                    <img src={item.v_info?.char_main_url} alt="메인 캐릭터" />
                    <img src={item.v_info?.char_sub1_url} alt="서브 캐릭터 1" />
                    <img src={item.v_info?.char_sub2_url} alt="서브 캐릭터 2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </>
    ) : null
  );
}

