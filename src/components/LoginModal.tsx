// src/components/LoginModal.tsx

import React from 'react';
import GoogleAuthButton from "./GoogleAuthButton";
import KakaoAuthButton from "./KakaoAuthButton";
import "./LoginModal.css"
import NaverAuthButton from "./NaverAuthButton.tsx";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FunctionComponent<LoginModalProps> = ({isOpen, onClose}) => {
    const handleClose = () => {
        onClose();
    };
    
    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className={"modal-design"}>
                    {/*TODO: 여기에 약간의 애니메이션을 넣으면 어떨까?*/}
                    <div className={"netflix-logo"}>
                        <img src={"/netflix-logo.svg"} alt={"netflix-logo"}/>
                    </div>
                    <div className={"naver-webtoon-logo"}>
                        <img src={"/naver-webtoon-logo.svg"} alt={"naver-webtoon-logo"}/>
                    </div>
                    <div className={"disney-logo"}>
                        <img src={"/disney-logo.svg"} alt={"disney-logo"}/>
                    </div>
                    <div className={"tving-logo"}>
                        <img src={"/tving-logo.svg"} alt={"tving-logo"}/>
                    </div>
                    <div className={"wavve-logo"}>
                        <img src={"/wavve-logo.svg"} alt={"wavve-logo"}/>
                    </div>
                </div>
                <div className={"modal-service"}>
                    <div className={"modal-service-overview"}>
                        <h3>웹툰과 OTT를 이어</h3>
                        <h3>가장 인기있는 원작을 확인하세요</h3>
                    </div>
                    <div className={"modal-login-buttons"}>
                        <KakaoAuthButton/>
                        <NaverAuthButton/>
                        <GoogleAuthButton/>
                    </div>
                </div>
                <button className={'modal-close-btn'} onClick={handleClose}>X</button>
            </div>
        </div>
    
    )
};

export default LoginModal;
