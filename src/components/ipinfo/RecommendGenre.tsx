import { Col, Row, Tabs } from "antd";
import "./RecommendGenre.css";
import axios from "axios";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Nullable } from "../../@types/global";
import { API_ENDPOINT } from "../../const/constant";
import { CardItem } from "./CardItem";
import {OttItemData, WebtoonItemData} from "../../@types/domain.ts";

// 데이터 타입 정의
interface TabItem {
  ottList: OttItemData[];
  webtoonList: WebtoonItemData[];
}

interface TabData {
  drama: TabItem;
  romance: TabItem;
  actionCrime: TabItem;
  fantasySF: TabItem;
  thrillerHorror: TabItem;
}

interface genreProps {
  genres?: TabItem;
}

// 장르별 탐색 컴포넌트
const RecommendGenre: FunctionComponent<genreProps> = ({ genres }) => {
  return genres ? (
    <Row gutter={[16, 16]} justify="center" align="top" className="main-grid">
      {genres.ottList.map((_, index) => (
        <Col className="genre-grid-col" key={index} xs={24} sm={12} md={8} lg={8}>
          <CardItem item={genres.ottList[index]} />
          <CardItem item={genres.webtoonList[index]} />
        </Col>
      ))}
    </Row>
  ) : null;
};

const TitleWithTabs: FunctionComponent = () => {
  const [genreTab, setGenreTab] = useState<Nullable<TabData>>(null);
  // 백엔드에서 데이터를 가져오는 함수
  const getGenreData = useCallback(async () => {
    try {
      const response = await axios.get<TabData>(`${API_ENDPOINT}/ipInfo/recommend`);
      const result = response.data;
      setGenreTab(result);
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    }
  }, []);
  useEffect(() => {
    void getGenreData();
  }, [getGenreData]);
  const tabItems = [
    {
      key: "1",
      label: "드라마",
      children: <RecommendGenre genres={genreTab?.drama} />,
    },
    {
      key: "2",
      label: "로맨스",
      children: <RecommendGenre genres={genreTab?.romance} />,
    },
    {
      key: "3",
      label: "액션/범죄",
      children: <RecommendGenre genres={genreTab?.actionCrime} />,
    },
    {
      key: "4",
      label: "판타지/SF",
      children: <RecommendGenre genres={genreTab?.fantasySF} />,
    },
    {
      key: "5",
      label: "스릴러/호러",
      children: <RecommendGenre genres={genreTab?.thrillerHorror} />,
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
