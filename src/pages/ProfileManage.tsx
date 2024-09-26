import {FunctionComponent} from "react";
import { Avatar, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ProfileManage.css";
import {useAuth} from "../context/AuthContext.tsx"; // 스타일 파일에서 CSS 적용

const ProfileManage: FunctionComponent = () => {
  const {user} = useAuth()
  return (
    <div className="profile-manage-container">
      <h2 className="profile-title">프로필 관리</h2>

      {/* 프로필 이미지 섹션 */}
      <div className="profile-image-section">
        <div className="image-wrapper">
          <Avatar
            size={100}
            src = {user ? user.avatar : null}
            icon={<UserOutlined />}
            className="profile-avatar"
            
          />
        </div>
        <Button className="image-change-button">변경</Button>
      </div>

      {/* 닉네임 변경 섹션 */}
      <div className="nickname-section">
        <label className="nickname-label">{user?.nick}</label>
        <Input className="nickname-input" defaultValue={user?.nick} />
        <Button className="nickname-change-button">변경</Button>
      </div>

      {/* 로그아웃 및 탈퇴 버튼 */}
      <div className="action-buttons">
        <Button className="logout-button">로그아웃</Button>
        <Button className="withdraw-button">탈퇴하기</Button>
      </div>
    </div>
  );
};

export default ProfileManage;
