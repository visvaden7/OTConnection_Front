import {FunctionComponent, useEffect, useState} from "react";
import {Button, Row} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_ENDPOINT} from "../assets/const/constant.ts";
import {OttPlatform} from "../assets/enum/OttPlatformEnum.ts";
import "./IpDetail.css"
import {LOGO_IMAGE_PATH} from "../assets/const/LogoImagePath.ts";
import {ImdbDoughChart} from "../components/DetailPage/ImdbDoughChart.tsx";
import {ByGenderInterestChart} from "../components/DetailPage/ByGenderInterestChart.tsx";
import {ByAgeInterestChart} from "../components/DetailPage/ByAgeInterestChart.tsx";
import {ActorList} from "../components/DetailPage/ActorList.tsx";
import {actor, season, trends} from "../@types/domain.ts";


const AGE_LIST = [
  "10대", "20대", "30대", "40대", "50대"
]



//삭제예정
interface Props {
  ip_id: number,
  title: string,
  platform: OttPlatform[],
  background_img: string,
  imdb_rating: number,
  banner_link: string,
  actorList: actor[]
  trends: trends,
  overview: string,
  seasonInfo: season[]
  crew: string[]
}


export const IpDetail: FunctionComponent = () => {
  const [ipData, setIpData] = useState<Props>()
  const {id} = useParams<{ id: string }>()
  
  useEffect(() => {
    const getIpDetailInfo = async () => {
      try {
        const url = `${API_ENDPOINT}/IpInfo/getIpDetail/${id}`
        const response = await axios.get(url)
        setIpData(response.data)
      } catch (err) {
        console.log("err :", err)
      }
    }
    
    void getIpDetailInfo()
  }, []);
  
  return ipData ? (
    <div className={"ip-detail-container"}>
      <div className={"ip-detail-info-box"}>
        <div className={"ip-detail-info-box-header"}>
          <div className={"name-and-like"}>
            <div>{ipData.title}</div>
            {/*like*/}
            <Button type={"default"} icon={<HeartOutlined/>}
                    style={{borderRadius: "40px", marginLeft: "10px"}}>찜하기</Button>
          </div>
          <div className={"ip-detail-info-box-logo"}>
            <p>감상가능한 곳</p>
            {ipData.platform.map((platfromType) => {
              return <img key={platfromType} src={LOGO_IMAGE_PATH[platfromType]} alt={platfromType}/>
            })}
          
          </div>
        </div>
        
        {/*banner*/}
        <div className={"ip-detail-info-box-banner"}>
          <img src={`https://image.tmdb.org/t/p/original${ipData.banner_link}`} alt={"작품배너"}/>
        </div>
        
        {/* chart component */}
        <div className={"ip-detail-info-box-chart"}>
          <ImdbDoughChart imdb_rating={ipData.imdb_rating}/>
          <ByGenderInterestChart naver_female_search={ipData.trends.naver_female_search}
                                 naver_male_search={ipData.trends.naver_male_search}/>
          <ByAgeInterestChart chartLabel={AGE_LIST}
                              chartData={[Number(ipData.trends.naver_10_search_percentage), Number(ipData.trends.naver_20_search_percentage), Number(ipData.trends.naver_30_search_percentage), Number(ipData.trends.naver_40_search_percentage), Number(ipData.trends.naver_50_search_percentage)]}/>
        </div>
      </div>
      {/* ip info*/}
      <div className={"ip-detail-information"}>
        <div className={"ip-detail-drama-info"}>
          {/* 줄거리 영역 */}
          <Row style={{display: 'flex', justifyContent: "space-between", marginBottom: '20px'}}>
            <h3 style={{fontWeight: 'bold'}}>줄거리</h3>
            <h5>{ipData.overview}</h5>
          </Row>
          
          {/* 연출/감독, 회차, 방영일 영역 */}
          <Row style={{display: 'flex', justifyContent: 'space-between'}}>
            {/* 연출/감독 */}
            <Row style={{display: 'flex', minWidth: '150px'}}>
              <h3 style={{fontWeight: 'bold'}}>연출/감독</h3>
              <h5>{ipData.crew[0]}</h5>
            </Row>
            
            {/* 회차 */}
            <Row style={{display: 'flex', minWidth: '150px'}}>
              <h3 style={{fontWeight: 'bold'}}>회차</h3>
              <h5>{ipData.seasonInfo[ipData.seasonInfo.length - 1].episode_count}부작</h5>
            </Row>
            
            {/* 방영일 */}
            <Row style={{display: 'flex', minWidth: '150px'}}>
              <h3 style={{fontWeight: 'bold'}}>방영일</h3>
              <h5>{ipData.seasonInfo[ipData.seasonInfo.length - 1].release_date}</h5>
            </Row>
          </Row>
        </div>
        
        <ActorList actorList={ipData.actorList}/>
      </div>
    </div>
  ) : null
};

