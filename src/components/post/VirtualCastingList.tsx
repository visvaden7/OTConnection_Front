import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./VirtualCastingList.css"

interface VirtualCastingPost {
  post_id: number;
  ip_id: number;
  virtual_casting_id: number;
  type: string;
  title: string;
  webtoon_title: string;
  virtual_casting_image_url: string;
  char_main: string;
  char_main_url: string;
  char_sub1: string;
  char_sub1_url: string;
  char_sub2: string;
  char_sub2_url: string;
  char_sub3: string;
  char_sub3_url: string;
}

export const VirtualCastingList: FunctionComponent = () => {
  const [virtualCastingData, setVirtualCastingData] = useState<VirtualCastingPost[]>([]);
  
  const getVirtualCastingPost = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/post/virtual-casting");
      setVirtualCastingData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    void getVirtualCastingPost();
  }, []);
  
  return virtualCastingData.length ? (
    <div className="virtual-casting-container">
      <h1>가상 캐스팅</h1>
      <div style={{ backgroundColor: "black", height: "5px", width: "100%" }}></div>
      {virtualCastingData.map((item, idx) => (
        <Link to={`/community/virtual-casting/${item.post_id}`} key={idx}>
          <div className="virtual-casting-card">
            <div className="virtual-casting-header">
              <h2>{item.title} 가상캐스팅</h2>
            </div>
            <div className="virtual-casting-body">
              {/* 메인 캐릭터 이미지 및 정보 */}
              <div className="main-casting-image">
                <img width="300" height="400" src={item.virtual_casting_image_url} alt={`${item.title} 메인 캐스팅 이미지`} />
              </div>
              
              {/* 서브 캐릭터 이미지 및 정보 */}
              <div className="casting-details">
                <div className="character-card">
                  <p>{item.char_main}</p>
                  <img  src={item.char_main_url} alt={`${item.char_main} 캐릭터`} />
                </div>
                <div className="character-card">
                  <p>{item.char_sub1}</p>
                  <img  src={item.char_sub1_url} alt={`${item.char_sub1} 캐릭터`} />
                </div>
                <div className="character-card">
                  <p>{item.char_sub2}</p>
                  <img  src={item.char_sub2_url} alt={`${item.char_sub2} 캐릭터`} />
                </div>
                <div className="character-card">
                  <p>{item.char_sub3}</p>
                  <img  src={item.char_sub3_url} alt={`${item.char_sub3} 캐릭터`} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div>데이터를 불러오는 중입니다...</div>
  );
};
