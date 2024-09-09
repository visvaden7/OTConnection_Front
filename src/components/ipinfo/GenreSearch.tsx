import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Row, Col } from "antd";
import CardItem from "./CardItem";
import "./GenreSearch.css";

// 데이터 타입 정의
interface ItemData {
  imageSrc: string;
  title: string;
  genres: string[];
  isOTT?: boolean;
  hasLogo: boolean;
  type: string;
}

interface TabData {
  drama: ItemData[];
  romance: ItemData[];
  action: ItemData[];
  fantasy: ItemData[];
  thriller: ItemData[];
}

// 장르별 데이터를 정의합니다.
const genreData = {
  drama: [
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "드라마 작품 제목 1",
    //   genres: ["드라마", "로맨스"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image1.jpg",
    //   title: "웹툰 제목 1",
    //   genres: ["드라마", "코미디"],
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/webtoon-image2.jpg",
    //   title: "드라마 작품 제목 2",
    //   genres: ["드라마", "범죄"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image1.jpg",
    //   title: "웹툰 제목 2",
    //   genres: ["드라마", "코미디"],
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "드라마 작품 제목 3",
    //   genres: ["드라마", "로맨스"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image1.jpg",
    //   title: "웹툰 제목 3",
    //   genres: ["드라마", "코미디"],
    //   hasLogo: false,
    // },
  ],
  romance: [
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "로맨스 작품 제목 1",
    //   genres: ["로맨스", "드라마"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image2.jpg",
    //   title: "로맨스 웹툰 제목 1",
    //   genres: ["로맨스", "판타지"],
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "로맨스 작품 제목 2",
    //   genres: ["로맨스", "드라마"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "로맨스 웹툰 제목 2",
    //   genres: ["로맨스", "드라마"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "로맨스 작품 제목 3",
    //   genres: ["로맨스", "드라마"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image1.jpg",
    //   title: "로맨스 웹툰 제목 3",
    //   genres: ["로맨스", "드라마"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
  ],
  action: [
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 작품 제목 1",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 웹툰 제목 1",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 작품 제목 2",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 웹툰 제목 2",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 작품 제목 3",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image3.jpg",
    //   title: "액션/범죄 웹툰 제목 3",
    //   genres: ["액션", "범죄"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
  ],
  fantasy: [
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 작품 제목 1",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 웹툰 제목 1",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 작품 제목 2",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 웹툰 제목 2",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 작품 제목 3",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/ott-image4.jpg",
    //   title: "판타지/SF 웹툰 제목 3",
    //   genres: ["판타지", "SF"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
  ],
  thriller: [
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 작품 제목 1",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 웹툰 제목 1",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 작품 제목 2",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 웹툰 제목 2",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 작품 제목 3",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: true,
    // },
    // {
    //   imageSrc: "/webtoon-image3.jpg",
    //   title: "스릴러/호러 웹툰 제목 3",
    //   genres: ["스릴러", "호러"],
    //   isOTT: true,
    //   hasLogo: false,
    // },
  ],
};

// 장르별 탐색 컴포넌트
const GenreSearch: React.FC<{ items: ItemData[] }> = ({ items }) => {
  return (
    <Row gutter={[16, 16]} justify="center" align="top" className="main-grid">
      <Col key={1} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[0].imageSrc}
          title={items[0].title}
          genres={items[0].genres}
          isOTT={items[0].isOTT}
          hasLogo={items[0].hasLogo}
        />
      </Col>
      <Col key={2} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[1].imageSrc}
          title={items[1].title}
          genres={items[1].genres}
          isOTT={items[1].isOTT}
          hasLogo={items[1].hasLogo}
        />
      </Col>
      <Col key={3} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[2].imageSrc}
          title={items[2].title}
          genres={items[2].genres}
          isOTT={items[2].isOTT}
          hasLogo={items[2].hasLogo}
        />
      </Col>
      <Col key={4} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[3].imageSrc}
          title={items[3].title}
          genres={items[3].genres}
          isOTT={items[3].isOTT}
          hasLogo={items[3].hasLogo}
        />
      </Col>
      <Col key={5} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[4].imageSrc}
          title={items[4].title}
          genres={items[4].genres}
          isOTT={items[4].isOTT}
          hasLogo={items[4].hasLogo}
        />
      </Col>
      <Col key={6} xs={24} sm={12} md={8} lg={8}>
        <CardItem
          imageSrc={items[5].imageSrc}
          title={items[5].title}
          genres={items[5].genres}
          isOTT={items[5].isOTT}
          hasLogo={items[5].hasLogo}
        />
      </Col>
    </Row>
  );
};

const TitleWithTabs: React.FC = () => {
  // drama, romance, action, fantasy, thriller
  // 상태로 data를 관리 (타입 정의 추가)
  const [drama, setDrama] = useState<ItemData[]>([]);
  const [romance, setRomance] = useState<ItemData[]>([]);
  const [action, setAction] = useState<ItemData[]>([]);
  const [fantasy, setFantasy] = useState<ItemData[]>([]);
  const [thriller, setThriller] = useState<ItemData[]>([]);

  // 백엔드에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/api/ipInfo/recommand"
      ); // 여기에 백엔드 API URL을 넣어줘

      const result: TabData = await response.json(); // 데이터를 JSON 형식으로 변환 후 타입 명시
      setDrama(result.drama);
      setRomance(result.romance);
      setAction(result.action);
      setFantasy(result.fantasy);
      setThriller(result.thriller);
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  const tabItems = [
    {
      key: "1",
      label: "드라마",
      children: <GenreSearch items={drama} />,
    },
    {
      key: "2",
      label: "로맨스",
      children: <GenreSearch items={romance} />,
    },
    {
      key: "3",
      label: "액션/범죄",
      children: <GenreSearch items={action} />,
    },
    {
      key: "4",
      label: "판타지/SF",
      children: <GenreSearch items={fantasy} />,
    },
    {
      key: "5",
      label: "스릴러/호러",
      children: <GenreSearch items={thriller} />,
    },
  ];

  return (
    <div className="title-with-tabs">
      <h2 style={{ textAlign: "left" }}>장르별 작품 탐색</h2>
      <Tabs
        defaultActiveKey="1"
        centered
        className="custom-tabs"
        items={tabItems}
      />
    </div>
  );
};

export default TitleWithTabs;
