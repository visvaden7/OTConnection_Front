import {FunctionComponent} from "react";
import "./CardItem.css";
import {ItemData} from "./GenreSearch.tsx";

interface Props {
  item: ItemData;
}

export enum OttPlatform {
  NETFLIX = "NETFLIX",
  WAVVE = "WAVVE",
  TVING = "TVING",
  DISNEY_PLUS = "DISNEY_PLUS"
}

export const LOGO_IMAGE_PATH: Record<OttPlatform, string> = {
  [OttPlatform.NETFLIX]: "/iconLogo/btn_squircle_netflix.png",
  [OttPlatform.WAVVE]: "/iconLogo/btn_squircle_wavve.png",
  [OttPlatform.TVING]: "/iconLogo/btn_squircle_tving.png",
  [OttPlatform.DISNEY_PLUS]: "/iconLogo/btn_squircle_disneyplus.png",
}

const CardItem: FunctionComponent<Props> = ({item: {title, profile, platform, type, genre}}) => {
  return (
    <div className="card-item">
      <div className="card-image">
        <div className={"card-platform-logo-div"}>
          {type === "ott" &&
            platform.map((platformType) => (
              <img className="card-platform-logo" key={platformType} alt={platformType}
                   src={LOGO_IMAGE_PATH[platformType]}/>
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
