import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import "./Creator.css";
import axios from "axios";
import {API_ENDPOINT} from "../const/constant.ts";

type CreatorRole = "writer" | "director";

interface CreatorData {
  people_id: number;
  name: string;
  role: CreatorRole;
  profile: string;
}

interface Director extends CreatorData {
  role: "director";
}

interface Writer extends CreatorData {
  role: "writer";
}

interface CreatorList {
  creatorList: {
    director: Director[];
    writer: Writer[];
  };
}

export const Creator: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location 사용하여 쿼리 파라미터 접근
  const queryParams = new URLSearchParams(location.search);
  const initialTab = (queryParams.get("tab") as CreatorRole) || "writer"; // 쿼리 파라미터에서 tab 값 가져오기

  const [activeTab, setActiveTab] = useState<CreatorRole>(initialTab);
  const [creators, setCreators] = useState<CreatorList>({
    creatorList: {
      director: [],
      writer: [],
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllCreators = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/creator/getAllCreator`
        );
        setCreators(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "알 수 없는 오류 발생"
        );
      } finally {
        setLoading(false);
      }
    };

    void getAllCreators();
  }, []);

  // 탭 변경 시 URL 에 tab 값을 반영
  const handleTabChange = (tab: CreatorRole) => {
    setActiveTab(tab);
    navigate(`/creator?tab=${tab}`);
  };

  // 클릭한 그리드 항목의 id를 쿼리 파라미터와 함께 상세 페이지로 이동
  const handleGridItemClick = (id: number) => {
    navigate(`/creator/detail/${id}?tab=${activeTab}`);
  };

  const displayedCreators =
    activeTab === "writer"
      ? creators.creatorList.writer
      : creators.creatorList.director;

  return (
    <div className="page-container">
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === "writer" ? "active" : ""}`}
          onClick={() => handleTabChange("writer")}
        >
          글/그림 작가
        </div>
        <div
          className={`tab ${activeTab === "director" ? "active" : ""}`}
          onClick={() => handleTabChange("director")}
        >
          연출/감독
        </div>
      </div>

      {loading && <div>로딩 중...</div>}
      {error && <div>{error}</div>}

      {!loading && !error && (
        <div className="grid-container">
          {displayedCreators.map((creator) => (
            <div
              key={creator.people_id}
              className="grid-item"
              onClick={() => handleGridItemClick(creator.people_id)}
            >
              <div className="creator-box">
                <img
                  src={`${creator.profile}`}
                  alt={`${creator.name}의 프로필 이미지`}
                  className="profile-image"
                />
                <div className="creator-info">
                  <h3>{creator.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
