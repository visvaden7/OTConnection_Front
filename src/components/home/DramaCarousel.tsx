import React, { useEffect, useState } from "react";
import { Card, Carousel } from "antd";
import axios from "axios";
import "./DramaCarousel.css"; // 스타일 정의
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { API_ENDPOINT } from "../../assets/const/constant.ts";

interface DramaImage {
  ott_profile_link: string;
  title: string;
}

const CustomPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <LeftOutlined className="arrow-icon" />
    </div>
  );
};

const CustomNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <RightOutlined className="arrow-icon" />
    </div>
  );
};

const DramaCarousel: React.FC = () => {
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
      style={{ padding: "10px" }}
      className="custom-card"
    >
      <Carousel
        className="custom-carousel"
        autoplay
        autoplaySpeed={2000}
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        slidesToShow={4}
        slidesToScroll={2}
        dots={false} // 기본 점 숨김
        arrows // 화살표 표시 (여기 arrows={false}가 없어야 돼!)
        responsive={[
          {
            breakpoint: 1024,
            settings: { slidesToShow: 4, slidesToScroll: 1 },
          },
          { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
      >
        {movieData.map((drama, index) => (
          <div key={index}>
            <Card
              cover={
                <img
                  src={drama.ott_profile_link}
                  alt={drama.title}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain",
                  }}
                />
              }
              bordered={false}
            >
              <Card.Meta title={drama.title} />
            </Card>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};

export default DramaCarousel;
