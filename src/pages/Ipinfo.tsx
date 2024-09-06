import { Layout } from "antd";
import { FunctionComponent } from "react";
import ComboList from "../components/ipinfo/FocusComboList";
import WebtoonList from "../components/ipinfo/NowWebtoonList";
import TitleWithTabs from "../components/ipinfo/TitleWithTabs";

const { Content } = Layout;

const Ipinfo: FunctionComponent = () => {
  return (
    <Content style={{ padding: "50px", background: "#fff" }}>
      <h2>주목할 OTT-웹툰 콤보</h2>

      <ComboList />
      <WebtoonList />
      <TitleWithTabs />
    </Content>
  );
};

export default Ipinfo;
