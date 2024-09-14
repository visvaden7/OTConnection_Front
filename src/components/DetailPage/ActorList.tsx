import {Card} from 'antd';
import {FunctionComponent} from "react";
import {actor} from "../../@types/domain.ts";
import "./ActorList.css"


const {Meta} = Card;

interface Props {
  actorList: actor[]
}

export const ActorList: FunctionComponent<Props> = ({actorList}) => {
  //TODO: 디밍 조절 기능 추가
  // const [dimming, setDimming] = useState(1)
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  // const handleScroll = () => {
  //   const scrollElement = scrollContainerRef.current;
  //   if(scrollElement){
  //     const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth
  //     const scrollLeft = scrollElement.scrollLeft
  //     const opacity = 1 - scrollLeft / maxScrollLeft
  //     console.log(opacity)
  //     setDimming(opacity)
  //   }
  // }
  
  return (
    // <div className={"actor-cart-list-box"} onScroll={handleScroll} ref={scrollContainerRef}>
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
      {/*<div className={"actor-cart-list-box-dimming"} style={{opacity: dimming}}/>*/}
    </div>
  );
};


