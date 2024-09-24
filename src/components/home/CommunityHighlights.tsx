import {FunctionComponent} from "react";
import {Card} from "antd";

const CommunityHighlights: FunctionComponent = () => {
  return (
    <Card
      title="커뮤니티 하이라이트"
      bordered={false}
      style={{height: "100%", width: "100%"}}
    >
      <Card title="원작과의 비교" bordered={false}>
        <img
          src={"/content-test1.png"}
          alt={"test"}
          style={{width: "100%"}}
        />
      </Card>
      <Card title="가상 캐스팅" bordered={false}>
        <img
          src={"/content-test2.png"}
          alt={"test"}
          style={{width: "100%"}}
        />
      </Card>
    </Card>
  );
};

export default CommunityHighlights;
