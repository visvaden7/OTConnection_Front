import {FunctionComponent} from "react";
import "./CardItem.css";
import {ItemData} from "./RecommendGenre.tsx";
import {LOGO_IMAGE_PATH} from "../../assets/const/LogoImagePath.ts";
import {OttPlatform} from "../../assets/enum/OttPlatformEnum.ts";

interface Props {
  item: ItemData;
}

const CardItem: FunctionComponent<Props> = ({item: {title, profile, platform, type, genre}}) => {
  return (
    <div className="card-item">
      <div className="card-image">
        <div className={"card-platform-logo-div"}>
          {type === "ott" &&
            platform.map((platformType) => (
              <img className="card-platform-logo" key={platformType} alt={platformType}
                   //TODO: check 이부분 체크하기
                   src={LOGO_IMAGE_PATH[platformType as OttPlatform]} />
            ))}
        </div>
        <img className={"card-poster"} src={profile} alt={title}/>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
    </div>
  );
};

export default CardItem;
