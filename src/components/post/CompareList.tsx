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


export const CompareList: FunctionComponent = () => {
  const [comparisonData, setComparisonData] = useState<comparisonPost[]>()
  const getComparePost = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/post/compareList`)
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
          <div key={idx + 30000} className={"comparison-info-card"}>
            <div className="comparison-info-header">
              <h2>{item.title} 원작비교</h2>
            </div>
            <div className={"comparison-detail-body"}>
              <div className="comparison-detail-body-thumbnail">
                {item ? <iframe width="300" height="200" src={item.compare_youtube_url}
                                title={item.webtoon_title}
                                allow="accelerometer; "
                                referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe> :
                  <img src="https://via.placeholder.com/600x300" alt="비교분석 이미지" className="comparison-image"/>}
              </div>
              <div className={"comparison-details-rating-section"}>
                <div className={"comparison-details-webtoon-info"}>
                  <h3>웹툰 정보</h3>
                  <h5>{item.webtoon_platform} 평점</h5>
                  <div className="comparison-webtoon-progress-bar-container">
                    <div className="compare-webtoon-progress-bar"
                         style={{width: `${item.rating * 10}%`, height: "20px", backgroundColor: '#ffd700'}}>
                      {item.rating}
                    </div>
                    <div className="compare-webtoon-progress-bar"
                         style={{width: `${(10 - item.rating) * 10}%`, height: "20px", backgroundColor: '#e9e9e9'}}>
                    </div>
                  </div>
                </div>
                <div className={"comparison-details-ott-info"}>
                  <h3>OTT 드라마 정보</h3>
                  <h5>IMDB 평점</h5>
                  <div className="compare-ott-progress-bar-container">
                    <div className="compare-ott-progress-bar"
                         style={{
                           width: `${item.imdb_rating * 10}%`,
                           height: "20px",
                           backgroundColor: '#ff4500'
                         }}>{item.imdb_rating}
                    </div>
                    <div className="compare-ott-progress-bar"
                         style={{
                           width: `${(10 - item.imdb_rating) * 10}%`,
                           height: "20px",
                           backgroundColor: '#e9e9e9'
                         }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : null
}