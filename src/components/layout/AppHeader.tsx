import {Avatar, Flex, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {AvatarGenerator} from "random-avatar-generator";
import {FunctionComponent, useMemo} from "react";
import {Link} from "react-router-dom";
import {LoginModal} from "../login/LoginModal.tsx";
import "./AppHeader.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Chart} from "chart.js";
import {useAuth} from "../../context/AuthContext.tsx";

Chart.register(ChartDataLabels);

export const AppHeader: FunctionComponent = () => {
  const {user, isModalOpen, setIsModalOpen} = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const avatarUrl = useMemo(() => {
    const generator = new AvatarGenerator();
    return user?.avatar ? user.avatar : generator.generateRandomAvatar();
  }, [user]);
  
  const menuItems = [
    {
      key: "ipInfo",
      label: <Link to={"/IpInfo"}>작품정보</Link>,
    },
    {
      key: "creator",
      label: <Link to={"/creator"}>크리에이터</Link>,
    },
    {
      key: "analyzeData",
      label: <Link to={"/analyzeData"}>데이터분석</Link>,
    },
    {
      key: "community",
      label: <Link to={"/community"}>커뮤니티</Link>,
    },
  ];
  
  return (
    <Flex wrap={false} justify={"space-between"} gap={"large"}>
      <Header className="header-style">
        <div className="header-content">
          <div className="header-logo">
            <Link to="/public"><img src={'/OTConnectionLogo.svg'} alt={'logo'}/></Link>
          </div>
          <Menu className={"header-menu"} mode="horizontal" items={menuItems}/>
          <div className="mypage">
            {user ? (
              <div className={"logout"}>로그아웃</div>
            ) : (
              <div className={"login"} onClick={openModal}>
                로그인
              </div>
            )}
            <h5>Hi {user?.nick ?? "guest"}님</h5>
            <Link to={"/mypage"}>
              <Avatar
                className="mypage-avatar"
                src={avatarUrl}
                alt={"User Avatar"}
              />
            </Link>
          </div>
        </div>
      </Header>
      <LoginModal isOpen={isModalOpen} onClose={closeModal}/>
    </Flex>
  );
};
