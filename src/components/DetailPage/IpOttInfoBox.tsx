import {FunctionComponent} from "react";
import {Row} from "antd";
import {season} from "../../@types/domain.ts";
import "./IpOttInfoBox.css"

interface Props {
  overview: string,
  crew: string,
  seasons: season[]
}

export const IpOttInfoBox: FunctionComponent<Props> = ({overview, crew, seasons}) => {
  const episode_count = seasons[seasons.length - 1].episode_count
  const release_date = seasons[seasons.length - 1].release_date
  return (
    <div id={"ip-ott-infobox"} className={"ip-detail-information"}>
      <div className={"ip-detail-drama-info-box"}>
        {/* 줄거리 영역 */}
        <Row className={"ip-detail-drama-info-overview"}>
          <div className={"subject"}>줄거리</div>
          <div className={"contents"}>{overview}</div>
        </Row>
        
        {/* 연출/감독, 회차, 방영일 영역 */}
        <Row className={"ip-detail-drama-info"}>
          {/* 연출/감독 */}
          <Row className={"ip-detail-drama-info-crew"}>
            <div className={"subject"}>연출/감독</div>
            <div className={"contents"}>{crew}</div>
          </Row>
          
          {/* 회차 */}
          <Row className={"ip-detail-drama-info-episode"}>
            <div className={"subject"}>회차</div>
            <div className={"contents"}>{episode_count}부작</div>
          </Row>
          
          {/* 방영일 */}
          <Row className={"ip-detail-drama-info-release-date"}>
            <div className={"subject"}>방영일</div>
            <div className={"contents"}>{release_date}</div>
          </Row>
        </Row>
      </div>
    </div>
  )
}