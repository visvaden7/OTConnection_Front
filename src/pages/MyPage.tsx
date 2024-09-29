import {FunctionComponent, useEffect, useState} from "react";
import {Avatar, Button, Carousel, Modal} from "antd";
import {HeartOutlined, UserOutlined} from "@ant-design/icons";
import ProfileManage from "./ProfileManage";
import "./MyPage.css";
import {useAuth} from "../context/AuthContext.tsx";
import axios from "axios";
import {API_ENDPOINT} from "../const/constant.ts";

interface ResponseGetFavoriteIp {
  ip_id: number,
  title: string,
  ott_profile_link: string,
}

export const MyPage: FunctionComponent = () => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [favoriteData, setFavoriteData] = useState<{ title: string, image: string }[]>()
  const {user} = useAuth()
  const getInterestIp = async () => {
    const response = await axios.get<ResponseGetFavoriteIp[]>(`${API_ENDPOINT}/favorite/get_favorite`, {withCredentials: true})
    setFavoriteData(response.data.map(item => {
      return {title: item.title, image: item.ott_profile_link}
    }))
  }
  
  useEffect(() => {
    void getInterestIp()
  }, [user]);
  
  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };
  
  const handleProfileModalClose = () => {
    setIsProfileModalVisible(false);
  };
  
  return (
    favoriteData ? (
      <div className="mypage-container">
        <div className="profile-section">
          <Avatar size={250} icon={<UserOutlined/>} src={user?.avatar}/>
        </div>
        
        <div className="nickname-section">
          <h2>{user?.nick ?? "닉네임"} </h2>
        </div>
        
        <div className="favorites-count">
          <Button type="default" size="large" className="favorites-button">
          <span>
            {favoriteData.length}
            <br/>
            찜한 작품
          </span>
          </Button>
        </div>
        
        <div className="profile-manage-section">
          <Button onClick={showProfileModal}>프로필 관리</Button>
        </div>
        
        <div className="community-activity-section">
          <Button>커뮤니티 활동내역</Button>
        </div>
        
        <div className="interest-wrapper">
          <h3>관심작품</h3>
          {/* Carousel 에 swipeToSlide 와 draggable 속성 추가 */}
          <Carousel autoplay swipeToSlide draggable>
            {favoriteData
              .reduce((acc, curr, index) => {
                const chunkIndex = Math.floor(index / 5);
                if (!acc[chunkIndex]) {
                  acc[chunkIndex] = [];
                }
                acc[chunkIndex].push(curr);
                return acc;
              }, [] as Array<{ title: string; image: string }[]>)
              .map((group, index) => (
                <div key={index} className="carousel-slide">
                  <div className="carousel-row">
                    {group.map((item, idx) => (
                      <div key={idx} className="carousel-item">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="carousel-image"
                        />
                        <p>{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
        
        <Modal
          title="프로필 관리"
          open={isProfileModalVisible}
          onCancel={handleProfileModalClose}
          footer={null}
          width={600}
        >
          <ProfileManage/>
        </Modal>
      </div>
    ) : (
      <div className="mypage-container">
        <div className="profile-section">
          <Avatar size={250} icon={<UserOutlined/>} src={user?.avatar}/>
        </div>
        
        <div className="nickname-section">
          <h2>{user?.nick ?? "닉네임"}</h2>
        </div>
        
        <div className="favorites-count">
          <Button type="default" size="large" className="favorites-button">
          <span>
            0
            <br/>
            찜한 작품
          </span>
          </Button>
        </div>
        
        <div className="profile-manage-section">
          <Button onClick={showProfileModal}>프로필 관리</Button>
        </div>
        
        <div className="community-activity-section">
          <Button>커뮤니티 활동내역</Button>
        </div>
        
        <div className="interest-wrapper">
          <h3>관심작품</h3>
          {/* Carousel 에 swipeToSlide 와 draggable 속성 추가 */}
            <div>
              <HeartOutlined style={{fontSize: "50px"}}/>
              <p>찜한 작품이 없어요</p>
            </div>
        </div>
        
        <Modal
          title="프로필 관리"
          open={isProfileModalVisible}
          onCancel={handleProfileModalClose}
          footer={null}
          width={600}
        >
          <ProfileManage/>
        </Modal>
      </div>));
};
