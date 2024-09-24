import React from "react";
import {LOGO_IMAGE_PATH} from "../../assets/const/LogoImagePath.ts";
import {OttPlatform} from "../../assets/enum/OttPlatformEnum.ts";
import "./FocusComboCard.css"
import {Link} from "react-router-dom";

interface ComboCardProps {
  ip_id: number
  poster: string;
  title: string;
  total_rating: number;
  platform: OttPlatform[]
}

const FocusComboCard: React.FC<ComboCardProps> = ({
                                                    ip_id,
                                                    poster,
                                                    title,
                                                    total_rating,
                                                    platform
                                                  }) => {
  return (
    <Link to={`/IpInfo/${ip_id}`}>
      <div className={'focus-card'}>
        <img
          className={'focus-card-profile'}
          src={poster}
          alt={`${title} OTT`}
        />
        <div className={"focus-card-platform-logo-div"}>
          {platform.map(platformType => (
            <img
              className={'focus-card-platform-logo'}
              key={platformType}
              src={LOGO_IMAGE_PATH[platformType]}
              alt="OTT 로고"
            />
          ))}
        </div>
        <div className={"focus_card_contents_info"}>
          <h3>{title}</h3>
          <p>
            평균 평점: {total_rating}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FocusComboCard;
