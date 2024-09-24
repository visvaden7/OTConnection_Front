import {FunctionComponent, useEffect, useState} from "react";
import {ComparisonPost} from "../components/post/ComparisonPost.tsx";
import {AlternativeComments} from "../components/community/Alternative_Comments.tsx";
import {useParams} from "react-router-dom";
import {VirtualCastingDetail} from "../components/post/VirtualCastingPost.tsx";
import axios from "axios";
import {API_ENDPOINT} from "../const/constant.ts";

export const Post: FunctionComponent = () => {
  const {postId} = useParams()
  const [type, setType] = useState<string>("")
  const checkType = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/post/post-type/${postId}`)
      const type = response.data.type
      setType(type)
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    void checkType()
  }, []);
  return (
    
    postId? (
      <div>
        {type === "compare" && <ComparisonPost postId={postId}/>}
        {type === "v_casting" && <VirtualCastingDetail postId={postId}/>}
        <AlternativeComments postId={postId}/>
      </div>
    ): null
  )
}