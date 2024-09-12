import { FunctionComponent } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import KakaoAuthButton from "./KakaoAuthButton";
import NaverAuthButton from "./NaverAuthButton.tsx";
import "./LoginModal.css";

interface Props {
  isOpen: boolean;

  onClose(): void;
}

export const LoginModal: FunctionComponent<Props> = ({ isOpen, onClose }) => isOpen ? (
  <div className="modal-overlay">
    <div className="modal">
      <div className={"modal-design"}>
        {/*TODO: 여기에 약간의 애니메이션을 넣으면 어떨까?*/}
        <div className={"netflix-logo"}>
          <img src={"/loginModalLogo/netflix-logo.svg"} alt={"netflix-logo"} />
        </div>
        <div className={"naver-webtoon-logo"}>
          <img src={"/loginModalLogo/naver-webtoon-logo.svg"} alt={"naver-webtoon-logo"} />
        </div>
        <div className={"disney-logo"}>
          <img src={"/loginModalLogo/disney-logo.svg"} alt={"disney-logo"} />
        </div>
        <div className={"tving-logo"}>
          <img src={"/loginModalLogo/tving-logo.svg"} alt={"tving-logo"} />
        </div>
        <div className={"wavve-logo"}>
          <img src={"/loginModalLogo/wavve-logo.svg"} alt={"wavve-logo"} />
        </div>
      </div>
      <div className={"modal-service"}>
        <div className={"modal-service-overview"}>
          <h3>웹툰과 OTT를 이어</h3>
          <h3>가장 인기있는 원작을 확인하세요</h3>
        </div>
        <div className={"modal-login-buttons"}>
          <KakaoAuthButton />
          <NaverAuthButton />
          <GoogleAuthButton />
        </div>
      </div>
      <button className={"modal-close-btn"} onClick={onClose}>X</button>
    </div>
  </div>
) : null;
