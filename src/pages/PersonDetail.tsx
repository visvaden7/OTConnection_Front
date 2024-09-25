import { FunctionComponent, useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./PersonDetail.css";
import {API_ENDPOINT} from "../const/constant.ts";

type PersonData = {
  people_id: string;
  profile: string;
  name: string;
  role: string;
  brief_story: string[];
};

type TabType = "writer" | "director";

export const PersonDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 people_id를 가져옴
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL의 쿼리 파라미터를 가져옴

  // URL 쿼리 파라미터에서 tab 값을 가져옴 (기본값은 writer)
  const queryParams = new URLSearchParams(location.search);
  const initialTab = (queryParams.get("tab") as TabType) || "writer";

  const [activeTab] = useState<TabType>(initialTab);
  const [personData, setPersonData] = useState<PersonData | null>(null); // 단일 PersonData로 변경
  const [loading, setLoading] = useState<boolean>(true);

  // 백엔드에서 특정 id에 맞는 데이터 가져오기 (axios 사용)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/creator/getCreatorDetail/${id}`
      ); // 백엔드에 people_id로 요청
      const data = response.data;
      setPersonData(data); // 받아온 데이터를 상태에 저장
      setLoading(false);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // id가 변경될 때마다 데이터를 다시 가져옴

  if (loading) {
    return <Spin size="large" />;
  }

  if (!personData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="person-detail">
      {/* 탭 버튼 */}
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === "writer" ? "active" : ""}`}
          onClick={() => {
            navigate(`/creator?tab=writer`); // Creator 페이지로 이동
          }}
        >
          글/그림 작가
        </div>
        <div
          className={`tab ${activeTab === "director" ? "active" : ""}`}
          onClick={() => {
            navigate(`/creator?tab=director`); // Creator 페이지로 이동
          }}
        >
          연출/감독
        </div>
      </div>

      {/* 이미지 왼쪽, 텍스트 오른쪽 배치 */}
      <Row gutter={16} className="custom-row">
        <Col xs={24} sm={16} className="image-container">
          <img
            className="main-image"
            src={personData.profile}
            width={"100%"}
            alt={personData.role}
          />
        </Col>
        <Col xs={24} sm={8} className="text-container">
          <div className="artist-info">
            <h2>{personData.name}</h2>
            {personData.brief_story.map((work, index) => (
              <div key={index}>{`<${work}>`}</div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
