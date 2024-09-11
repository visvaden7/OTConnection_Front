import React, {useEffect, useState} from "react";
import {Card} from "antd";
import axios from "axios";
import { API_ENDPOINT } from "../../assets/const/constant.ts";

interface WebtoonData {
  ip_id: number;
  title: string;
  webtoon_profile_link: string;
  interest: number;
}

const InterestedWebtoonList: React.FC = () => {
  const [interestedWebtoon, setInterestedWebtoon] = useState<WebtoonData[]>([]);
  
  useEffect(() => {
    const url = `${API_ENDPOINT}/chart/interestWebtoon5`;
    axios.get(url).then((rep) => setInterestedWebtoon(rep.data.data));
  }, []);
  
  return (
    <Card
      title="인기 웹툰"
      bordered={false}
      style={{height: "100%", margin: 0}}
    >
      {interestedWebtoon.map((num, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            height: "130px",
          }}
        >
          <h2 style={{width: "100px", margin: "5px", alignContent: "center"}}>
            {index + 1}
          </h2>
          <img
            src={num.webtoon_profile_link}
            alt={num.title}
            style={{width: "90px", padding: "5px 0"}}
          />
          <div style={{alignContent: "center", margin: "0 0 0 20px"}}>
            <p key={num.ip_id}>{num.title}</p>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default InterestedWebtoonList;
