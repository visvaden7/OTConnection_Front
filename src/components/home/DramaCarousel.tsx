import React, { useEffect, useState } from "react";
import { Card, Carousel } from "antd";
import axios from "axios";
import "./DramaCarousel.css";

interface DramaImage {
  ott_profile_link: string;
  title: string;
}

const DramaCarousel: React.FC = () => {
  const [movieData, setMovieData] = useState<DramaImage[]>([]);

  useEffect(() => {
    const url = "http://localhost:8001/api/chart/carouselData";
    axios.get(url).then((rep) => {
      setMovieData(rep.data.data);
    });
  }, []);

  return (
    <Card title="최고평점 드라마" bordered={false} style={{ padding: "10px" }}>
      <Carousel
        autoplay
        autoplaySpeed={2000}
        arrows
        slidesToShow={4}
        slidesToScroll={2}
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
