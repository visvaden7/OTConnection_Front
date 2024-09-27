import {FunctionComponent} from 'react';
import './KakaoAuthButton.css'
import {API_ENDPOINT} from "../../const/constant.ts";

const KakaoAuthButton: FunctionComponent = () => {
  
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${API_ENDPOINT}/auth/kakao`;
    window.open(kakaoLoginUrl, '_self');
  };
  
  return (
    <div className={'kakao-login'}>
      <img src={"/loginModalLogo/kakao-logo.svg"} alt={"kakao-logo"} className={'kakao-logo'}/>
      <button onClick={handleKakaoLogin} className={"kakao-login-btn"}>카카오로 로그인</button>
    </div>
  )
};

export default KakaoAuthButton;
