import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Creator.css";
import axios from "axios";

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
  const [activeTab, setActiveTab] = useState<CreatorRole>("writer");
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
          `http://localhost:8001/api/creator/getAllCreator`
        );

        if (response.status !== 200) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }

        setCreators(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "알 수 없는 오류 발생"
        );
      } finally {
        setLoading(false);
      }
    };

    getAllCreators();
  }, []);

  const handleGridItemClick = (id: number) => {
    // 현재 활성화된 탭에 따라 상세 페이지로 이동하면서 쿼리 파라미터를 추가
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
          onClick={() => setActiveTab("writer")}
        >
          글/그림 작가
        </div>
        <div
          className={`tab ${activeTab === "director" ? "active" : ""}`}
          onClick={() => setActiveTab("director")}
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

export default Creator;
