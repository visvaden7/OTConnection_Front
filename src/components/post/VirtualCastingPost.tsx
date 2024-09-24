import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../const/constant.ts";
import {VirtualCastingPost} from "../../@types/domain.ts";

interface Props {
  postId: string;
}

export const VirtualCastingDetail: FunctionComponent<Props> = ({ postId }) => {
  const [virtualCastingData, setVirtualCastingData] = useState<VirtualCastingPost | null>(null);
  
  const getVirtualCastingDetail = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/post/virtual-casting/${postId}`);
      setVirtualCastingData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleRecommendClick = async (actor: keyof VirtualCastingPost) => {
    if (virtualCastingData) {
      console.log(virtualCastingData[actor])
      if (typeof virtualCastingData[actor] === "number") {
        const updatedCastingData = {
          ...virtualCastingData,
          [actor]: virtualCastingData[actor] + 1, // 클릭한 배우의 추천 수 증가
        };
        setVirtualCastingData(updatedCastingData);
        try {
          await axios.post(`${API_ENDPOINT}/post/virtual-casting`, {
            postId,
            actor_main_casting1_recommend: virtualCastingData.actor_main_casting1_recommend,
            actor_main_casting2_recommend: virtualCastingData.actor_main_casting2_recommend,
            actor_sub1_casting1_recommend: virtualCastingData.actor_sub1_casting1_recommend,
            actor_sub1_casting2_recommend: virtualCastingData.actor_sub1_casting2_recommend,
            actor_sub2_casting1_recommend: virtualCastingData.actor_sub2_casting1_recommend,
            actor_sub2_casting2_recommend: virtualCastingData.actor_sub2_casting2_recommend,
            actor_sub3_casting1_recommend: virtualCastingData.actor_sub3_casting1_recommend,
            actor_sub3_casting2_recommend: virtualCastingData.actor_sub3_casting2_recommend
          });
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
    
    useEffect(() => {
      getVirtualCastingDetail();
    }, [postId]);
    
    return virtualCastingData ? (
      <div className="virtual-casting-container">
        <h1>{virtualCastingData.virtual_casting_title}</h1>
        <div className="virtual-casting-card">
          <h2>{virtualCastingData.virtual_casting_title}</h2>
          <div className="virtual-casting-body">
            {/* 메인 캐릭터 */}
            <div className="casting-section">
              <img src={virtualCastingData.char_main_url} alt={virtualCastingData.char_main} width="150"/>
              <div className="casting-actors">
                <p>{virtualCastingData.char_main}</p>
                <div className="actor">
                  <img src={virtualCastingData.actor_main_casting1_url} alt={virtualCastingData.actor_main_casting1}/>
                  <p>{virtualCastingData.actor_main_casting1}</p>
                  <button onClick={() => handleRecommendClick("actor_main_casting1_recommend")}>
                    ❤️ {virtualCastingData.actor_main_casting1_recommend}
                  </button>
                </div>
                <div className="actor">
                  <img src={virtualCastingData.actor_main_casting2_url} alt={virtualCastingData.actor_main_casting2}/>
                  <p>{virtualCastingData.actor_main_casting2}</p>
                  <button onClick={() => handleRecommendClick("actor_main_casting2_recommend")}>
                    ❤️ {virtualCastingData.actor_main_casting2_recommend}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 서브 캐릭터 1 */}
            <div className="casting-section">
              <img src={virtualCastingData.char_sub1_url} alt={virtualCastingData.char_sub1} width="150"/>
              <div className="casting-actors">
                <p>{virtualCastingData.char_sub1}</p>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub1_casting1_url} alt={virtualCastingData.actor_sub1_casting1}/>
                  <p>{virtualCastingData.actor_sub1_casting1}</p>
                  <button onClick={() => handleRecommendClick("actor_sub1_casting1_recommend")}>
                    ❤️ {virtualCastingData.actor_sub1_casting1_recommend}
                  </button>
                </div>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub1_casting2_url} alt={virtualCastingData.actor_sub1_casting2}/>
                  <p>{virtualCastingData.actor_sub1_casting2}</p>
                  <button onClick={() => handleRecommendClick("actor_sub1_casting2_recommend")}>
                    ❤️ {virtualCastingData.actor_sub1_casting2_recommend}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 서브 캐릭터 2 */}
            <div className="casting-section">
              <img src={virtualCastingData.char_sub2_url} alt={virtualCastingData.char_sub2} width="150"/>
              <div className="casting-actors">
                <p>{virtualCastingData.char_sub2}</p>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub2_casting1_url} alt={virtualCastingData.actor_sub2_casting1}/>
                  <p>{virtualCastingData.actor_sub2_casting1}</p>
                  <button onClick={() => handleRecommendClick("actor_sub2_casting1_recommend")}>
                    ❤️ {virtualCastingData.actor_sub2_casting1_recommend}
                  </button>
                </div>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub2_casting2_url} alt={virtualCastingData.actor_sub2_casting2}/>
                  <p>{virtualCastingData.actor_sub2_casting2}</p>
                  <button onClick={() => handleRecommendClick("actor_sub2_casting2_recommend")}>
                    ❤️ {virtualCastingData.actor_sub2_casting2_recommend}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 서브 캐릭터 3 */}
            <div className="casting-section">
              <img src={virtualCastingData.char_sub3_url} alt={virtualCastingData.char_sub3} width="150"/>
              <div className="casting-actors">
                <p>{virtualCastingData.char_sub3}</p>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub3_casting1_url} alt={virtualCastingData.actor_sub3_casting1}/>
                  <p>{virtualCastingData.actor_sub3_casting1}</p>
                  <button onClick={() => handleRecommendClick("actor_sub3_casting1_recommend")}>
                    ❤️ {virtualCastingData.actor_sub3_casting1_recommend}
                  </button>
                </div>
                <div className="actor">
                  <img src={virtualCastingData.actor_sub3_casting2_url} alt={virtualCastingData.actor_sub3_casting2}/>
                  <p>{virtualCastingData.actor_sub3_casting2}</p>
                  <button onClick={() => handleRecommendClick("actor_sub3_casting2_recommend")}>
                    ❤️ {virtualCastingData.actor_sub3_casting2_recommend}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
