import {FunctionComponent} from "react";
import {ComparisonIp} from "../components/post/ComparisonIp.tsx";
import {Comments} from "../components/community/Comments.tsx";

export const Community: FunctionComponent = () => {
  return (
    <div>
      <ComparisonIp/>
      <Comments postId={"1"}/>
    </div>
  )
}