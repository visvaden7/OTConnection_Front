import {Card} from 'antd';
import {FunctionComponent} from "react";
import {actor} from "../../@types/domain.ts";
import "./ActorList.css"


const {Meta} = Card;

interface Props {
  actorList: actor[]
}

export const ActorList: FunctionComponent<Props> = ({actorList}) => {
  
  return (
    <div className={"actor-cart-list-box-wrapper"}>
      <div className={"actor-cart-list-box"}>
        {actorList.map((actor, index) => (
          <div key={index} className={"actor-card-list-item"}>
            <Card
              className={"actor-card"}
              hoverable
              cover={<img alt={actor.charName} src={actor.profile}/>}
            >
              <Meta title={actor.charName} description={actor.role}/>
            </Card>
          </div>
        ))}
      </div>
      <div className={"actor-cart-list-box-dimming"} style={{opacity: 1}}/>
    </div>
  );
};


