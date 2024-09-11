import {FunctionComponent} from 'react';
import './KakaoAuthButton.css'

// interface SessionCheckResponse {
//     isLoggedIn: boolean;
//     user: {}
// }

const KakaoAuthButton: FunctionComponent = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [user, setUser] = useState<{}>({})
  
  
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = 'http://localhost:8001/auth/kakao';
    window.open(kakaoLoginUrl, '_self');
  };
  
  // const logout = async () => {
  //     try {
  //         const response = await axios.post('http://localhost:8001/auth/kakaoLogout', {}, {
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
    <div className={'kakao-login'}>
      <img src={"/kakao-logo.svg"} alt={"kakao-logo"} className={'kakao-logo'}/>
      <button onClick={handleKakaoLogin} className={"kakao-login-btn"}>카카오로 로그인</button>
    </div>
  )
};

export default KakaoAuthButton;
