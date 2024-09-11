import {FunctionComponent, useMemo} from "react";
import {Link} from "react-router-dom";

import {Avatar, Flex, Menu} from "antd";
import {AvatarGenerator} from 'random-avatar-generator'

import {Header} from "antd/es/layout/layout";
import {useAuth} from "../hooks/useAuth.ts";
import "./Headers.css"

interface props {
  openModal: () => void;
}

const Headers: FunctionComponent<props> = ({openModal}) => {
  const {user} = useAuth();
  const avatarUrl = useMemo(() => {
    const generator = new AvatarGenerator();
    return user?.avatar ? user.avatar : generator.generateRandomAvatar()
  }, [user]);
  
  const menuItems = [
    {
      key: 'ipInfo',
      label: <Link to={"/IpInfo"}>작품정보</Link>,
    },
    {
      key: 'creator',
      label: <Link to={"/creator"}>크리에이터</Link>,
    },
    {
      key: 'analyzeData',
      label: <Link to={"/analyzeData"}>데이터분석</Link>,
    },
    {
      key: 'community',
      label: <Link to={"/community"}>커뮤니티</Link>,
    }
  ];
  
  return (
    <Flex wrap={false} justify={"space-between"} gap={"large"}>
      <Header className="header-style">
        <div className="header-content">
          <div className="header-logo">
            <Link to="/">LOGO</Link>
          </div>
          <Menu className={"header-menu"} mode="horizontal" items={menuItems} style={{}}/>
          <div className="mypage">
            {user ? (<div className={"logout"}>로그아웃</div>) : (
              <div className={"login"} onClick={openModal}>로그인</div>)}
            <h5>Hi {user?.nick ?? "guest"}님</h5>
            <Avatar
              className="mypage-avatar"
              src={avatarUrl}
              alt={"User Avatar"}
            />
          </div>
        </div>
      </Header>
    </Flex>
  )
}

export default Headers