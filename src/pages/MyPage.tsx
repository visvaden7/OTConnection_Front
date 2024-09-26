import { FunctionComponent, useState } from "react";
import { Avatar, Button, Modal, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileManage from "./ProfileManage";
import "./MyPage.css";

export const MyPage: FunctionComponent = () => {
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const dummyData = [
    { title: "작품1", image: "https://via.placeholder.com/180x250" },
    { title: "작품2", image: "https://via.placeholder.com/180x250" },
    { title: "작품3", image: "https://via.placeholder.com/180x250" },
    { title: "작품4", image: "https://via.placeholder.com/180x250" },
    { title: "작품5", image: "https://via.placeholder.com/180x250" },
    { title: "작품6", image: "https://via.placeholder.com/180x250" },
    { title: "작품7", image: "https://via.placeholder.com/180x250" },
    { title: "작품8", image: "https://via.placeholder.com/180x250" },
    { title: "작품9", image: "https://via.placeholder.com/180x250" },
    { title: "작품10", image: "https://via.placeholder.com/180x250" },
  ];

  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const handleProfileModalClose = () => {
    setIsProfileModalVisible(false);
  };

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <Avatar size={270} icon={<UserOutlined />} />
      </div>

      <div className="nickname-section">
        <h2>닉네임</h2>
      </div>

      <div className="favorites-count">
        <Button type="default" size="large" className="favorites-button">
          <span>
            0
            <br />
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
        {/* Carousel에 swipeToSlide와 draggable 속성 추가 */}
        <Carousel autoplay swipeToSlide draggable>
          {dummyData
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
        visible={isProfileModalVisible}
        onCancel={handleProfileModalClose}
        footer={null}
        width={600}
      >
        <ProfileManage />
      </Modal>
    </div>
  );
};
