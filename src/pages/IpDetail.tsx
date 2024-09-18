import {FunctionComponent, useEffect, useState} from "react";
import {Button} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_ENDPOINT} from "../assets/const/constant.ts";
import {LOGO_IMAGE_PATH} from "../assets/const/LogoImagePath.ts";
import {ImdbDoughChart} from "../components/DetailPage/ImdbDoughChart.tsx";
import {ByGenderInterestChart} from "../components/DetailPage/ByGenderInterestChart.tsx";
import {ByAgeInterestChart} from "../components/DetailPage/ByAgeInterestChart.tsx";
import {ActorList} from "../components/DetailPage/ActorList.tsx";
import {IpOttInfoBox} from "../components/DetailPage/IpOttInfoBox.tsx";
import {IpDetailInfoBox} from "../components/DetailPage/IpDetailInfoBox.tsx";
import {OttPlatform} from "../assets/enum/OttPlatformEnum.ts";
import {actor, Favorite, season, trends} from "../@types/domain.ts";
import "./IpDetail.css"
import {useAuth} from "../hooks/useAuth.ts";

type ottUrls = {
  TVING: string;
  NETFLIX: string;
  DISNEY_PLUS: string;
  WAVVE: string;
}

//삭제예정
interface Props {
  ip_id: number,
  title: string,
  webtoon_title: string,
  webtoon_platform: string,
  webtoon_profile_link: string,
  platform: OttPlatform[],
  background_img: string,
  imdb_rating: number,
  banner_link: string,
  genre: string[],
  actorList: actor[]
  trends: trends,
  likes: number,
  rating: number,
  interest: number,
  webtoon_chapter: number,
  overview: string,
  seasonInfo: season[]
  crew: string[]
  ottUrls: ottUrls
}


export const IpDetail: FunctionComponent = () => {
  const [ipData, setIpData] = useState<Props>()
  const [favorite, setFavorite] = useState<Favorite>()
  const {id} = useParams<{ id: string }>()
  const user = useAuth()
  
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
  
  useEffect(() => {
    const getFavoriteInfo = async () => {
      try {
        const url = `${API_ENDPOINT}/favorite/check_favorite/${id}`
        const response = await axios.get(url)
        if (!favorite) {
          setFavorite(response.data)
        }
      } catch (err) {
        console.log("err :", err)
      }
    }
    void getFavoriteInfo()
  }, [id])
  
  const handleFavoriteClick = async () => {
    try {
      if (user) {
        const response = await axios.post('http://localhost:8001/api/favorite', {
          user_id: user.user?.user_id,
          ip_id: id
        })
        console.log(response.data)
      }
    } catch (err) {
      alert("로그인 해주세요")
      console.log("찜하기 처리 중 오류 발생", err)
    }
  }
  
  const handleDeleteFavoriteClick = async () => {
    try {
      if (user) {
        const response = await axios.delete('http://localhost:8001/api/favorite', {
          data: {
            user_id: user.user?.user_id,
            ip_id: id
          }
        })
        console.log(response.data)
      }
    } catch (err) {
      alert("로그인 해주세요")
      console.log("찜하기 처리 중 오류 발생", err)
    }
  }
  
  return ipData ? (
      <div className={"ip-detail-container"}>
        <div className={"ip-detail-info-background"}>
          <div className={"ip-detail-info-box"}>
            <div className={"ip-detail-info-box-header"}>
              {/**/}
              <div className={"name-and-like"}>
                <div>{ipData.title}</div>
                {favorite?.is_favorite && user.user ? <Button type={"default"} icon={<HeartFilled style={{color:"red"}}/>} style={{
                    borderRadius: "40px",
                    marginLeft: "10px"
                  }} onClick={handleDeleteFavoriteClick}>{favorite.count}</Button>
                  : <Button type={"default"} icon={<HeartOutlined/>}
                            style={{borderRadius: "40px", marginLeft: "10px"}}
                            onClick={handleFavoriteClick}>찜하기
                  </Button>}
              </div>
              <div className={"ip-detail-info-box-logo"}>
                <p>감상가능한 곳</p>
                {ipData.platform.map((platformType) => {
                  const ottUrls = ipData.ottUrls
                  return (
                    <a key={platformType} href={ottUrls[platformType]} target={"_blank"} rel={"noopener noreferrer"}>
                      <img key={platformType} src={LOGO_IMAGE_PATH[platformType]} alt={platformType}/>
                    </a>
                  )
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
              <ByAgeInterestChart
                chartData={[ipData.trends.naver_10_search_percentage, ipData.trends.naver_20_search_percentage, ipData.trends.naver_30_search_percentage, ipData.trends.naver_40_search_percentage, ipData.trends.naver_50_search_percentage]}/>
            </div>
          </div>
          {/* ip info*/}
          <IpOttInfoBox overview={ipData.overview} crew={ipData.crew[0]} seasons={ipData.seasonInfo}/>
          <ActorList actorList={ipData.actorList}/>
          {/*info-detail-contents-box*/}
          <IpDetailInfoBox title={ipData.title} webtoon_profile_link={ipData.webtoon_profile_link}
                           webtoon_platform={ipData.webtoon_platform} genre={ipData.genre} rating={ipData.rating}
                           like={ipData.likes} interest={ipData.interest} webtoon_chapter={ipData.webtoon_chapter}/>
        </div>
      </div>
    ) :
    null
};

