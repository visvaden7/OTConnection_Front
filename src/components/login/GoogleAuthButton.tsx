import {FunctionComponent} from 'react';
import "./GoogleAuthButton.css"
import { API_ENDPOINT } from "../../const/constant.ts";

const GoogleAuthButton: FunctionComponent = () => {
  
  const handleGoogleLogin = () => {
    const googleLoginUrl = `${API_ENDPOINT}/auth/google`;
    window.open(googleLoginUrl, "_self");
  };
  
  return (
    <div className={'google-login'}>
      <img src={"/loginModalLogo/google-logo.svg"} alt={"google-logo"} className={'google-logo'}/>
      <button onClick={handleGoogleLogin} className={'google-login-btn'}>구글로 로그인</button>
    </div>
  );
};

export default GoogleAuthButton;
