import {FunctionComponent, useEffect, useState} from "react";
import {Card, Carousel} from "antd";
import axios from "axios";
import "./DramaCarousel.css"; // 스타일 정의
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {API_ENDPOINT} from "../../const/constant.ts";
import {Link} from "react-router-dom";

interface DramaImage {
  ott_profile_link: string;
  title: string;
  ip_id: string;
}

const CustomPrevArrow: FunctionComponent<any> = (props) => {
  const {onClick} = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <LeftOutlined className="arrow-icon"/>
    </div>
  );
};

const CustomNextArrow: FunctionComponent<any> = (props) => {
  const {onClick} = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <RightOutlined className="arrow-icon"/>
    </div>
  );
};

const DramaCarousel: FunctionComponent = () => {
  const [movieData, setMovieData] = useState<DramaImage[]>([]);
  
  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/carouselData`;
    axios.get(url).then((rep) => {
      setMovieData(rep.data.data);
    });
  }, []);
  
  return (
    <Card
      title="최고평점 드라마"
      bordered={false}
      style={{padding: "10px"}}
      className="custom-card"
    >
      <Carousel
        className="custom-carousel"
        autoplay
        autoplaySpeed={2000}
        prevArrow={<CustomPrevArrow/>}
        nextArrow={<CustomNextArrow/>}
        slidesToShow={4}
        slidesToScroll={2}
        dots={false} // 기본 점 숨김
        arrows // 화살표 표시 (여기 arrows={false}가 없어야 돼!)
        responsive={[
          {
            breakpoint: 1024,
            settings: {slidesToShow: 4, slidesToScroll: 1},
          },
          {breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 1}},
          {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1}},
        ]}
      >
        {movieData.map((drama, index) => (
          <Link to={`https://otconnection.link/IpInfo/${drama.ip_id}`}>
            <div key={index}>
              <Card
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: "350px",
                      position: "relative",
                      borderRadius: "10px", // 부모 요소에 둥근 모서리 설정
                      overflow: "hidden", // 부모 요소에서 넘치지 않도록 설정
                      backgroundImage: `url(${drama.ott_profile_link})`, // 이미지를 배경으로 설정
                      backgroundSize: "contain", // 이미지 비율 유지
                      backgroundPosition: "center", // 이미지 중앙에 배치
                      backgroundRepeat: "no-repeat", // 이미지 반복 안 함
                    }}
                  >
                    <img
                      src={drama.ott_profile_link}
                      alt={drama.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // 이미지를 비율을 유지하며 조정
                        borderRadius: "10px", // 이미지 자체에도 모서리 둥글게 설정
                      }}
                    />
                  </div>
                }
                bordered={false}
              >
                <Card.Meta title={drama.title}/>
              </Card>
            </div>
          </Link>
        ))}
      </Carousel>
    </Card>
  );
};

export default DramaCarousel;
