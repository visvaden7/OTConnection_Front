import React from "react";
import { Tabs } from "antd";
import MainGrid from "./MainGrid";
import "./TitleWithTabs.css";

const { TabPane } = Tabs;

const TitleWithTabs: React.FC = () => {
  return (
    <div className="title-with-tabs">
      <h2>장르별 작품 탐색</h2>
      <Tabs defaultActiveKey="1" centered className="custom-tabs">
        <TabPane tab="드라마" key="1">
          <MainGrid />
        </TabPane>
        <TabPane tab="로맨스" key="2">
          <MainGrid />
        </TabPane>
        <TabPane tab="액션/범죄" key="3">
          <MainGrid />
        </TabPane>
        <TabPane tab="판타지/SF" key="4">
          <MainGrid />
        </TabPane>
        <TabPane tab="스릴러/호러" key="5">
          <MainGrid />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TitleWithTabs;
