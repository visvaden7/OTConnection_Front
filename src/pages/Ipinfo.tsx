import { Layout } from "antd";
import { FunctionComponent } from "react";
import ComboList from "../components/ipinfo/ComboList";
import WebtoonList from "../components/ipinfo/WebtoonList";
import MainGrid from "../components/ipinfo/MainGrid";
import TitleWithTabs from "../components/ipinfo/TitleWithTabs";

const { Content } = Layout;

const Ipinfo: FunctionComponent = () => {
  return (
    <Content style={{ padding: "50px", background: "#fff" }}>
      <h2>주목할 OTT-웹툰 콤보</h2>

      <ComboList />
      <WebtoonList />
      <TitleWithTabs />
      <MainGrid />
    </Content>
  );
};

export default Ipinfo;
