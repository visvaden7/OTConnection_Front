import {FunctionComponent, useEffect, useState} from "react";
import axios from "axios";
import {API_ENDPOINT} from "../../const/constant.ts";
import {VirtualCastingPost} from "../../@types/domain.ts";
import "./VirtualCastingPost.css"
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

interface Props {
  postId: string;
}

export const VirtualCastingDetail: FunctionComponent<Props> = ({postId}) => {
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
      if (typeof virtualCastingData[actor] === "number") {
        try {
          const updatedData = {
            ...virtualCastingData,
            [actor]: virtualCastingData[actor] + 1
          };
          const {
            actor_main_casting1_recommend,
            actor_main_casting2_recommend,
            actor_sub1_casting1_recommend,
            actor_sub1_casting2_recommend,
            actor_sub2_casting1_recommend,
            actor_sub2_casting2_recommend,
            actor_sub3_casting1_recommend,
            actor_sub3_casting2_recommend
          } = updatedData;
          const {status} = await axios.post(`${API_ENDPOINT}/post/virtual-casting`, {
            postId,
            actor_main_casting1_recommend,
            actor_main_casting2_recommend,
            actor_sub1_casting1_recommend,
            actor_sub1_casting2_recommend,
            actor_sub2_casting1_recommend,
            actor_sub2_casting2_recommend,
            actor_sub3_casting1_recommend,
            actor_sub3_casting2_recommend
          });
          if (status === 200) {
            setVirtualCastingData(updatedData);
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
  
  useEffect(() => {
    void getVirtualCastingDetail();
  }, [postId]);
  
  return virtualCastingData ? (
    <div className="virtual-casting-detail-container">
      <div className="virtual-casting-header">
        {/*/TODO: api 수정*/}
        <h2>{virtualCastingData.virtual_casting_title} 등장 인물 및 가상캐스팅</h2>
      </div>
      <div className="virtual-casting-card">
        <div className="virtual-casting-body">
          {/* 메인 캐릭터 이미지 및 정보 */}
          <div className="main-casting-image">
            <img width="300" height="400" src={virtualCastingData.virtual_casting_image_url}
                 alt={`${virtualCastingData.virtual_casting_title} 메인 캐스팅 이미지`}/>
          </div>
          {/* 서브 캐릭터 이미지 및 정보 */}
          <div className="casting-details">
            <div className="character-card">
              <p>{virtualCastingData.char_main}</p>
              <img src={virtualCastingData.char_main_url} alt={`${virtualCastingData.char_main} 캐릭터`}/>
            </div>
            <div className="character-card">
              <p>{virtualCastingData.char_sub1}</p>
              <img src={virtualCastingData.char_sub1_url} alt={`${virtualCastingData.char_sub1} 캐릭터`}/>
            </div>
            <div className="character-card">
              <p>{virtualCastingData.char_sub2}</p>
              <img src={virtualCastingData.char_sub2_url} alt={`${virtualCastingData.char_sub2} 캐릭터`}/>
            </div>
            <div className="character-card">
              <p>{virtualCastingData.char_sub3}</p>
              <img src={virtualCastingData.char_sub3_url} alt={`${virtualCastingData.char_sub3} 캐릭터`}/>
            </div>
          </div>
        </div>
      </div>
      <h2>누가 더 잘 어울릴까요? 더 잘 어울리는 연예인에게 투표해주세요!</h2>
      <div className="virtual-casting-detail-card">
        <div className="virtual-casting-detail-body">
          {/* 메인 캐릭터 */}
          <div className="virtual-casting-section">
            <div className="virtual-casting-actors">
              <div className={"virtual-character"}>
                <img src={virtualCastingData.char_main_url} alt={virtualCastingData.char_main} width="150"/>
                <span>{virtualCastingData.char_main}</span>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_main_casting1_recommend")}>
                <img src={virtualCastingData.actor_main_casting1_url} alt={virtualCastingData.actor_main_casting1}/>
                <span>{virtualCastingData.actor_main_casting1}</span>
                <button >
                  {virtualCastingData.actor_main_casting1_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_main_casting1_recommend}
                </button>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_main_casting2_recommend")}>
                <img src={virtualCastingData.actor_main_casting2_url} alt={virtualCastingData.actor_main_casting2}/>
                <span>{virtualCastingData.actor_main_casting2}</span>
                <button>
                  {virtualCastingData.actor_main_casting2_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_main_casting2_recommend}
                </button>
              </div>
            </div>
          </div>
          
          {/* 서브 캐릭터 1 */}
          <div className="virtual-casting-section">
            <div className="virtual-casting-actors">
              <div className={"virtual-character"}>
                <img src={virtualCastingData.char_sub1_url} alt={virtualCastingData.char_main} width="150"/>
                <span>{virtualCastingData.char_sub1}</span>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub1_casting1_recommend")}>
                <img src={virtualCastingData.actor_sub1_casting1_url} alt={virtualCastingData.actor_main_casting1}/>
                <span>{virtualCastingData.actor_sub1_casting1}</span>
                <button >
                  {virtualCastingData.actor_sub1_casting1_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub1_casting1_recommend}
                </button>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub1_casting2_recommend")}>
                <img src={virtualCastingData.actor_sub1_casting2_url} alt={virtualCastingData.actor_main_casting2}/>
                <span>{virtualCastingData.actor_sub1_casting2}</span>
                <button >
                  {virtualCastingData.actor_sub1_casting2_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub1_casting2_recommend}
                </button>
              </div>
            </div>
          </div>
          
          {/* 서브 캐릭터 2 */}
          <div className="virtual-casting-section">
            <div className="virtual-casting-actors">
              <div className={"virtual-character"}>
                <img src={virtualCastingData.char_sub2_url} alt={virtualCastingData.char_sub2} width="150"/>
                <span>{virtualCastingData.char_sub2}</span>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub2_casting1_recommend")}>
                <img src={virtualCastingData.actor_sub2_casting1_url} alt={virtualCastingData.actor_sub2_casting1}/>
                <span>{virtualCastingData.actor_sub2_casting1}</span>
                <button >
                  {virtualCastingData.actor_sub2_casting1_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub2_casting1_recommend}
                </button>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub2_casting2_recommend")}>
                <img src={virtualCastingData.actor_sub2_casting2_url} alt={virtualCastingData.actor_sub2_casting2}/>
                <span>{virtualCastingData.actor_sub2_casting2}</span>
                <button >
                  {virtualCastingData.actor_sub2_casting2_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub2_casting2_recommend}
                </button>
              </div>
            </div>
          </div>
          
          {/* 서브 캐릭터 3 */}
          <div className="virtual-casting-section">
            <div className="virtual-casting-actors">
              <div className={"virtual-character"}>
                <img src={virtualCastingData.char_sub3_url} alt={virtualCastingData.char_sub3} width="150"/>
                <span>{virtualCastingData.char_sub3}</span>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub3_casting1_recommend")}>
                <img src={virtualCastingData.actor_sub3_casting1_url} alt={virtualCastingData.actor_sub3_casting1}/>
                <span>{virtualCastingData.actor_sub3_casting1}</span>
                <button >
                  {virtualCastingData.actor_sub3_casting1_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub3_casting1_recommend}
                </button>
              </div>
              <div className="actor" onClick={() => handleRecommendClick("actor_sub3_casting2_recommend")}>
                <img src={virtualCastingData.actor_sub3_casting2_url} alt={virtualCastingData.actor_sub3_casting2}/>
                <span>{virtualCastingData.actor_sub3_casting2}</span>
                <button >
                  {virtualCastingData.actor_sub3_casting2_recommend > 0 ? <HeartFilled style={{color:"red"}}/> : <HeartOutlined/>} {virtualCastingData.actor_sub3_casting2_recommend}
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
