import {FunctionComponent} from "react";
import WaterFlowChart from "./WaterFlowChart.tsx";
import "./IpDetailInfoBox.css"

interface Props {
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
                                                            title,
                                                            webtoon_platform,
                                                            webtoon_profile_link,
                                                            genre,
                                                            rating,
                                                            like,
                                                            interest,
                                                            webtoon_chapter
                                                          }) => {
  return (
    <div className={"ip-detail-contents-container"}>
      <div className={"ip-detail-contents-nav-box"}>
        <h2 className={"ip-detail-contents-nav-title"}>{title}</h2>
        <div className={"ip-detail-contents-nav-menu"}>
          <img src={"/detailLogo/watchingTime.svg"} alt={"watch_time"}/>
          <p>조회수 / 시청시간</p>
        </div>
        <div className={"ip-detail-contents-nav-menu"}>
          <img src={"/detailLogo/originalContentsInfo.svg"} alt={"watch_time"}/>
          <p>원작정보</p>
        </div>
        <div className={"ip-detail-contents-nav-menu"}>
          <img src={"/detailLogo/aboutContents.svg"} alt={"watch_time"}/>
          <p>관련컨텐츠</p>
        </div>
      </div>
      {/*contents*/}
      <div className={"ip-detail-contents-box"}>
        {/*그래프 component*/}
        <WaterFlowChart/>
        {/*원작정보 component*/}
        <div className={"ip-detail-contents-origin-box"}>
          <div className={'subject'}>
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
        <div>
          관련컨텐츠
        </div>
      </div>
    </div>
  )
}