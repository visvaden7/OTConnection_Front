import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent, PropsWithChildren } from "react";
import { AppFooter } from "./AppFooter.tsx";
import { AppHeader } from "./AppHeader.tsx";
import "./AppLayout.css";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout-container">
      <Layout className="full-layout">
        <AppHeader />
        <Content className="content-style">
          {children}
        </Content>
        <AppFooter />
      </Layout>
    </div>
  );
};
