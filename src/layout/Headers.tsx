import {Avatar, Flex, Menu} from "antd";
import * as React from "react";
import {useEffect, useRef} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {Header} from "antd/es/layout/layout";
import {AvatarGenerator} from 'random-avatar-generator'
import {Link} from "react-router-dom";
import  "./Headers.css"

interface props {
    openModal: () => void;
}

const Headers: React.FunctionComponent<props> = ({openModal}) => {
    const {user} = useAuth()
    const generator = new AvatarGenerator();
    const avatarRef = useRef(user?.avatar || generator.generateRandomAvatar());
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
        }
    ];
    
    useEffect(() => {
        if (user) {
            avatarRef.current = user.avatar
        }
    }, [user?.avatar]);
    
    return (
        <Flex wrap={false} justify={"space-between"} gap={"large"}>
            <Header className="header-style">
                <div className="header-content">
                    <div className="header-logo">LOGO</div>
                    <Menu className={"header-menu"} mode="horizontal" items={menuItems} style={{}}/>
                    <div className="mypage">
                        {user ? (<div className={"logout"}>로그아웃</div>) : (<div className={"login"} onClick={openModal}>로그인</div>)}
                        <h5>Hi {user?.nick ?? "guest"}님</h5>
                        <Avatar
                            className="mypage-avatar"
                            src={
                                avatarRef.current
                            }
                            alt={"User Avatar"}
                        />
                    </div>
                </div>
            </Header>
        </Flex>
    )
}

export default Headers