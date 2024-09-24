import {FunctionComponent, useEffect, useState} from "react";
import axios from "axios";
import {API_ENDPOINT} from "../../const/constant.ts";
import {Link} from "react-router-dom";
import "./CompareList.css"


interface comparisonPost {
  post_id: number,
  ip_id: number,
  virtual_casting_id: number,
  type: string,
  title: string,
  webtoon_title: string,
  webtoon_platform: string,
  webtoon_start_date: string,
  webtoon_end_date: null,
  total_views: number,
  rating: number,
  release_date: string,
  watch_time: number,
  imdb_rating: number,
  webtoon_highlight: string[],
  ott_highlight: string[],
  diff_ott_webtoon: string[],
  compare_youtube_url: string
}


export const CompareList:FunctionComponent = () => {
  const [comparisonData, setComparisonData] = useState<comparisonPost[]>()
  const getComparePost = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/post/compareList`)
      console.log(response.data)
      setComparisonData(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    void getComparePost()
  }, []);
  return comparisonData ? (
    <div className="comparison-container">
      <h1>원작비교</h1>
      <div style={{backgroundColor: "black", height: "5px", width: "100%"}}></div>
      {comparisonData.map((item, idx) => (
        <Link to={`/community/compare/${item.post_id}`}>
        <div key={idx} className="comparison-card" style={{backgroundColor:"lightgrey", width: "60%"}}>
          <div className="comparison-header">
            <h2>{item.title} 원작비교</h2>
          </div>
          <div className="comparison-body">
            <div className="comparison-thumbnail">
              {item ? <iframe width="200" height="150" src={item.compare_youtube_url}
                              title="《선재 업고 튀어》원작《내일의 으뜸》과의 차이, 당신이 몰랐던 6가지 사실"
                              allow="accelerometer; "
                              referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe> :
                <img src="https://via.placeholder.com/600x300" alt="비교분석 이미지" className="comparison-image"/>}
            </div>
            <div className="comparison-details">
              <div className="rating-section">
                <div className="ott-info">
                  <h3>웹툰 정보</h3>
                  <div className="progress-bar-container">
                    <span>평점: {item.rating}/10</span>
                    <div className="progress-bar"
                         style={{width: `${item.rating * 10}%`, height:"10px", backgroundColor: '#ffd700'}}>
                    </div>
                  </div>
                </div>
                <div className="ott-info">
                  <h3>OTT 드라마 정보</h3>
                  <div className="progress-bar-container">
                    <span>평점: {item.imdb_rating}/10</span>
                    <div className="progress-bar"
                         style={{width: `${item.imdb_rating * 10}%`, height:"10px", backgroundColor: '#ff4500'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  ):null
}