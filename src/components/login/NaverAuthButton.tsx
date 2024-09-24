import {FunctionComponent} from 'react';
import './NaverAuthButton.css'
import { API_ENDPOINT } from "../../const/constant.ts";

// interface SessionCheckResponse {
//     isLoggedIn: boolean;
//     user: {}
// }

const NaverAuthButton: FunctionComponent = () => {
  
  const handleNaverLogin = () => {
    const naverLoginUrl = `${API_ENDPOINT}/auth/naver`;
    window.open(naverLoginUrl, '_self');
  };
  
  // const logout = async () => {
  //     try {
  //         const response = await axios.post('http://localhost:8001/auth/NaverLogout', {}, {
  //             withCredentials: true
  //         });
  //
  //         console.log(response);
  //         console.log('로그아웃 성공:');
  //
  //         // setIsLoggedIn(false);
  //
  //         if (response.status === 200) {
  //             window.location.href = '/';  // 로그아웃 후 리디렉션
  //         }
  //         console.log(response.data);
  //     } catch (error) {
  //         if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
  //             console.log('로그아웃 중 오류 발생:', error);
  //         } else {
  //             console.error('An unexpected error occurred:', error);
  //         }
  //     }
  // };
  
  return (
    <div className={'naver-login'}>
      <img src={"/loginModalLogo/naver-logo.svg"} alt={"naver-logo"} className={'naver-logo'}/>
      <button onClick={handleNaverLogin} className={"naver-login-btn"}>네이버로 로그인</button>
    </div>
  )
};

export default NaverAuthButton;
