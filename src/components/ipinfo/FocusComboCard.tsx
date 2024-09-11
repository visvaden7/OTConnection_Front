import React from "react";
import {LOGO_IMAGE_PATH} from "../../assets/const/LogoImagePath.ts";
import {OttPlatform} from "../../assets/enum/OttPlatformEnum.ts";
import "./FocusComboCard.css"

interface ComboCardProps {
  poster: string;
  title: string;
  total_rating: number;
  platform: OttPlatform[]
}

const FocusComboCard: React.FC<ComboCardProps> = ({
                                                    poster,
                                                    title,
                                                    total_rating,
                                                    platform
                                                  }) => {
  return (
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
      <h3>{title}</h3>
      <p>
        평균 평점: {total_rating}
      </p>
    </div>
  );
};

export default FocusComboCard;
