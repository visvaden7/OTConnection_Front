import React from 'react';
import axios from 'axios';
import './KakaoAuthButton.css'

// interface SessionCheckResponse {
//     isLoggedIn: boolean;
//     user: {}
// }

const KakaoAuthButton: React.FunctionComponent = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    // const [user, setUser] = useState<{}>({})
    
    
    const handleKakaoLogin = () => {
        const kakaoLoginUrl = 'http://localhost:8001/auth/kakao';
        window.open(kakaoLoginUrl, '_self');
    };
    
    // const checkSession = async () => {
    //     try {
    //         const response = await axios.get<SessionCheckResponse>('http://localhost:8001/auth/session-check', {withCredentials: true});
    //         console.log(">>>>response", response.data.isLoggedIn);
    //         console.log(">>>>>data", response.data.user)
    //         setIsLoggedIn(response.data.isLoggedIn);
    //         setUser(response.data.user)
    //     } catch (error) {
    //         console.log('Session check failed', error)
    //     }
    // };
    
    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8001/auth/kakaoLogout', {}, {
                withCredentials: true
            });
            
            console.log(response);
            console.log('로그아웃 성공:');
            
            // setIsLoggedIn(false);
            
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
    //
    // useEffect(() => {
    //     checkSession();
    // }, []);
    
    return (
        <div className={'kakao-login'}>
            <img src={"x`/kakao-logo.svg"} alt={"kakao-logo"} className={'kakao-logo'}/>
            <button onClick={handleKakaoLogin} className={"kakao-login-btn"}>카카오로 로그인</button>
        </div>
    )
};

export default KakaoAuthButton;
