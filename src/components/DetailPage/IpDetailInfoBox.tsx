import {FunctionComponent, useEffect, useState} from "react";
import WaterFlowChart from "./WaterFlowChart.tsx";
import "./IpDetailInfoBox.css"
import {API_ENDPOINT} from "../../const/constant.ts";
import axios from "axios";
import {Link} from "react-router-dom";

interface Props {
  ip_id: number
  title: string,
  webtoon_profile_link: string,
  webtoon_platform: string,
  webtoon_chapter: number,
  genre: string[],
  rating: number,
  like: number,
  interest: number
}

export const IpDetailInfoBox: FunctionComponent<Props> = ({
                                                            ip_id,
                                                            title,
                                                            webtoon_platform,
                                                            webtoon_profile_link,
                                                            genre,
                                                            rating,
                                                            like,
                                                            interest,
                                                            webtoon_chapter
                                                          }) => {
  const [data, setData] = useState<string>()
  useEffect(() => {
    const getPostWithIp = async () => {
      try {
        console.log(ip_id)
        const response = await axios.get<{ postId: string }>(`${API_ENDPOINT}/post/getPostId/${ip_id}`)
        const post_id = response.data
        console.log(post_id.postId)
        setData(post_id.postId)
      } catch (err) {
        console.error(err)
      }
    }
    void getPostWithIp()
  }, []);
  
  return (
    <div id={"ip-detail-contents-container"} className={"ip-detail-contents-container"}>
      <div className={"ip-detail-contents-nav-box"}>
        <h2 className={"ip-detail-contents-nav-title"}>{title}</h2>
        <a href={"#ip-detail-contents-box"} color={"#000"}>
          <div className={"ip-detail-contents-nav-menu"}>
            <img src={"/detailLogo/watchingTime.svg"} alt={"watch_time"}/>
            <p>조회수 / 시청시간</p>
          </div>
        </a>
        <a href={"#ip-origin-section"}>
          <div className={"ip-detail-contents-nav-menu"}>
            <img src={"/detailLogo/originalContentsInfo.svg"} alt={"watch_time"}/>
            <p>원작정보</p>
          </div>
        </a>
        <a href={"#ip-related-section"}>
          <div className={"ip-detail-contents-nav-menu"}>
            <img src={"/detailLogo/aboutContents.svg"} alt={"watch_time"}/>
            <p>관련컨텐츠</p>
          </div>
        </a>
      </div>
      {/*contents*/}
      <div className={"ip-detail-contents-box"}>
        {/*그래프 component*/}
        <div id={"ip-chart-section"}></div>
        <WaterFlowChart/>
        {/*원작정보 component*/}
        <div className={"ip-detail-contents-origin-box"}>
          <div id={'ip-origin-section'} className={'subject'}>
            <p>원작 정보</p>
          </div>
          <div className={"ip-detail-contents-divider"}></div>
          <div className={"ip-detail-contents-origin-info-box"}>
            <div className={"ip-detail-contents-origin-info-profile"}>
              <img src={webtoon_profile_link} alt={title}/>
            </div>
            <div className={"ip-detail-contents-origin-information"}>
              <div className={'ip-detail-contents-origin-information-platform'}>
                < p>플랫폼</ p>
                < p>{webtoon_platform}</ p>
              </div>
              <div className={'ip-detail-contents-origin-information-writer'}>
                <div>
                  < p>작가</ p>
                  < p>LICO</ p>
                </div>
                <div>
                  < p>작화</ p>
                  < p>LICO</ p>
                </div>
              </div>
              <div className={"ip-detail-contents-origin-information-genre"}>
                < p>장르</ p>
                < p>{genre}</ p>
              </div>
              <div className={"ip-detail-contents-origin-information-rating"}>
                < p>평점</ p>
                < p>{rating}</ p>
              </div>
              <div className={"ip-detail-contents-origin-information-view"}>
                < p>조회수</ p>
                < p>8M</ p>
              </div>
            </div>
          </div>
          <div className={"ip-detail-contents-origin-information-user-reaction"}>
            <div className={'webtoon-reaction-card'}>
              <p className={'card-name'}>웹툰 회차</p>
              <div className={'card-value'}>{webtoon_chapter}
                <div className={'measure'}>회</div>
              </div>
            </div>
            <div className={'webtoon-reaction-card'}>
              <p className={'card-name'}>좋아요</p>
              <div className={'card-value'}>
                {like}
                <div className={'measure'}>개</div>
              </div>
            </div>
            <div className={'webtoon-reaction-card'}>
              <p className={'card-name'}>관심수</p>
              <div className={'card-value'}>
                {interest}
                <div className={'measure'}>만</div>
              </div>
            </div>
          </div>
        </div>
        
        {/*관련컨텐츠 component*/}
        <div id={"ip-related-section"} className={"subject"}>
          <p>관련컨텐츠</p>
        </div>
        <div className={"ip-detail-contents-divider"}></div>
        {data ? <div style={{display: "flex", justifyContent: "flex-start"}}>
          <Link to={`/community/compare/${data}`}>
            <img src={webtoon_profile_link} alt={webtoon_platform} style={{width: "150px"}}/>
          </Link>
        </div> : null}
      </div>
    </div>
  )
}