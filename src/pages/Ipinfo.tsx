import { InfoCircleOutlined } from "@ant-design/icons";
import { Layout, Tooltip } from "antd";
import { FunctionComponent } from "react";
import ComboList from "../components/ipinfo/FocusComboList";
import WebtoonList from "../components/ipinfo/NowWebtoonList";
import TitleWithTabs from "../components/ipinfo/RecommendGenre.tsx";
import Top from "../components/Button/Top.tsx";

const { Content } = Layout;
export const IpInfo: FunctionComponent = () => {
  // const onClickHandler = () => {
  //
  // }
  return (
    <Content style={{ padding: "50px", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ textAlign: "left", marginRight: "10px" }}>
          주목할 OTT-웹툰 콤보
        </h2>
        <Tooltip
          title="'OTT와 웹툰 인기도 기반 추천' 입니다. (IMDb와 사용자 평점 + 최신 연재일 기준)."
          overlayStyle={{ fontSize: "12px" }}
        >
          <InfoCircleOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Tooltip>
      </div>
      <ComboList />
      <WebtoonList />
      <TitleWithTabs />
      <Top />
    </Content>
  );
};
