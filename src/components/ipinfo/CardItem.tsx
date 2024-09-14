import { FunctionComponent } from "react";
import "./CardItem.css";
import { Link } from "react-router-dom";
import { LOGO_IMAGE_PATH } from "../../assets/const/LogoImagePath.ts";
import {ItemData} from "../../@types/domain.ts";

interface Props {
  item: ItemData;
}

export const CardItem: FunctionComponent<Props> = ({ item: { ip_id, title, profile, platform, type, genre } }) => (
  <div className="card-item">
    <Link to={`/ipInfo/${ip_id}`}>
      <div className="card-image">
        <div className={"card-platform-logo-div"}>
          {type === "ott" &&
            platform.map((platformType) => (
              <img className="card-platform-logo" key={platformType} alt={platformType}
                //TODO: check 이부분 체크하기
                   src={LOGO_IMAGE_PATH[platformType]} />
            ))}
        </div>
        <img className={"card-poster"} src={profile} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
    </Link>
  </div>
);
