import {FunctionComponent} from 'react';
import "./GoogleAuthButton.css"

// interface SessionCheckResponse {
//     isLoggedIn: boolean;
//     user: {}
// }

const GoogleAuthButton: FunctionComponent = () => {
    
    const handleGoogleLogin = () => {
        const googleLoginUrl = 'http://localhost:8001/api/auth/google';
        window.open(googleLoginUrl, "_blank");
    };
    
    // const logout = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8001/api/auth/googleLogout', {}, {
    //             withCredentials: true
    //         });
    //
    //         // Google 로그아웃 페이지로 리다이렉트
    //         const googleLogoutUrl = 'https://accounts.google.com/Logout';
    //
    //         // Google 로그아웃 페이지로 이동
    //         window.location.href = googleLogoutUrl;
    //
    //         console.log(response);
    //         console.log('로그아웃 성공:');
    //
    //         setIsLoggedIn(false);
    //
    //         if (response.status === 200) {
    //             window.location.href = '/';  // 로그아웃 후 리디렉션
    //         }
    //
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
        <div className={'google-login'}>
            <img src={"/google-logo.svg"} alt={"google-logo"} className={'google-logo'}/>
            <button onClick={handleGoogleLogin} className={'google-login-btn'}>구글로 로그인</button>
        </div>
    );
};

export default GoogleAuthButton;
