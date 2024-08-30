import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./GoogleAuthButton.css"

interface SessionCheckResponse {
    isLoggedIn: boolean;
    user: {}
}

const GoogleAuthButton: React.FunctionComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    const handleGoogleLogin = () => {
        const googleLoginUrl = 'http://localhost:8001/api/auth/google';
        window.open(googleLoginUrl, "_blank");
    };
    
    const checkSession = async () => {
        try {
            const response = await axios.get<SessionCheckResponse>('http://localhost:8001/api/auth/session-check', {withCredentials: true});
            console.log(">>>>response", response.data.isLoggedIn);
            console.log(">>>>>data", response.data.user)
            setIsLoggedIn(response.data.isLoggedIn);
        } catch (error) {
            console.log('Session check failed', error)
            //TODO: 사용자 친화적인 메시지 표시, 자동 재시도 로직 구현, 로딩 스피너 또는 진행 표시기 사용, 오프라인 모드 감지
            // console.error('Session check failed', error);
        }
    };
    
    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8001/api/auth/googleLogout', {}, {
                withCredentials: true
            });
            
            // Google 로그아웃 페이지로 리다이렉트
            const googleLogoutUrl = 'https://accounts.google.com/Logout';
            
            // Google 로그아웃 페이지로 이동
            window.location.href = googleLogoutUrl;
            
            console.log(response);
            console.log('로그아웃 성공:');
            
            setIsLoggedIn(false);
            
            if (response.status === 200) {
                window.location.href = '/';  // 로그아웃 후 리디렉션
            }
            
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                console.log('로그아웃 중 오류 발생:', error);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };
    
    useEffect(() => {
        checkSession();
    }, []);
    
    return (
        <div className={'google-login'}>
            <button onClick={handleGoogleLogin} className={'google-login-btn'}>구글로 로그인</button>
        </div>
    );
};

export default GoogleAuthButton;
