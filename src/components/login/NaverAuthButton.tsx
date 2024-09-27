import {FunctionComponent} from 'react';
import './NaverAuthButton.css'
import { API_ENDPOINT } from "../../const/constant.ts";

const NaverAuthButton: FunctionComponent = () => {
  
  const handleNaverLogin = () => {
    const naverLoginUrl = `${API_ENDPOINT}/auth/naver`;
    window.open(naverLoginUrl, '_self');
  };
  
  return (
    <div className={'naver-login'}>
      <img src={"/loginModalLogo/naver-logo.svg"} alt={"naver-logo"} className={'naver-logo'}/>
      <button onClick={handleNaverLogin} className={"naver-login-btn"}>네이버로 로그인</button>
    </div>
  )
};

export default NaverAuthButton;
