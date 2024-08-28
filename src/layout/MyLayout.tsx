import * as React from "react";
import {Avatar, Flex, Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom"; // Link 컴포넌트 추가
import './MyLayout.css'; // CSS 파일 임포트

type MyLayoutProps = {
    children: React.ReactNode;
};

const MyLayout: React.FC<MyLayoutProps> = ({children}) => {
    const menuItems = [
        {
            key: 'ipInfo',
            label: <Link to="/IpInfo">작품정보</Link>,
        },
        {
            key: 'creator',
            label: <Link to="/creator">크리에이터</Link>,
        },
        {
            key: 'analyzeData',
            label: <Link to="/analyzeData">데이터분석</Link>,
        },
        {
            key: 'community',
            label: <Link to="/community">커뮤니티</Link>,
        },
        {
            key: 'mypage',
            label: <Link to="/mypage">마이페이지</Link>,
        },
    ];
    return (
        <div className="layout-container">
            <Layout className="full-layout">
                <Flex wrap={true} justify={"space-between"} gap={"large"}>
                    <Header className="header-style">
                        <div className="header-content">
                            <div className="header-logo">LOGO</div>
                            <Menu className={"header-menu"} mode="horizontal" items={menuItems} style={{}}/>
                            <div className="mypage">
                                hi user
                                <Avatar
                                    className="mypage-avatar"
                                    src={
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXr4u8p-shRaCfOY4sZFlbLMyhROlYHSVtQ&s"
                                    }
                                />
                            </div>
                        </div>
                    </Header>
                </Flex>
                <Content className="content-style">
                    {children}
                </Content>
                <Footer className="footer-style">
                    <div className={"footer-company-info"}>
                        <div>주식회사 OTConnection | 대표 웹종자 | 서울특별 강남구 역삼로 160길 9층</div>
                        <div>사업자 등록 번호 123-45-67890</div>
                        <div>OTConnection © 2024 by OTC, Inc. All rights reserved.</div>
                    </div>
                    <div className={"footer-translate"}>
                        <div>ENG</div>
                        <div>|</div>
                        <div>KOR</div>
                    </div>
                </Footer>
            </Layout>
        </div>
    );
};

export default MyLayout;
