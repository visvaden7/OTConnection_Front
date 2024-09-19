import React, {useEffect, useState} from "react";
import {Card, Carousel} from "antd";
import axios from "axios";
import "./DramaCarousel.css";
import {API_ENDPOINT} from "../../assets/const/constant.ts";
import {Link} from "react-router-dom";

interface DramaImage {
  ip_id: number;
  ott_profile_link: string;
  title: string;
}

const DramaCarousel: React.FC = () => {
  const [movieData, setMovieData] = useState<DramaImage[]>([]);
  
  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/carouselData`;
    axios.get(url).then((rep) => {
      setMovieData(rep.data.data);
    });
  }, []);
  
  return (
    <Card title="최고평점 드라마" bordered={false} style={{padding: "10px"}}>
      <Carousel
        autoplay
        autoplaySpeed={2000}
        arrows
        slidesToShow={4}
        slidesToScroll={2}
        responsive={[
          {
            breakpoint: 1024,
            settings: {slidesToShow: 4, slidesToScroll: 1},
          },
          {breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 1}},
          {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1}},
        ]}
      >
        {movieData.map((drama) => (
          <Link key={drama.ip_id} to={`IpInfo/${drama.ip_id}`}>
            <div key={drama.ip_id}>
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
