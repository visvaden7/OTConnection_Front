import { FunctionComponent } from "react";
import "chart.js/auto";
import Top from "../components/Button/Top";
import "./AnalyzeData.css";

export const AnalyzeData: FunctionComponent = () => {
  return (
    <div className="container" style={{ height: "2200px" }}>
      <h2 className="circle-title1">
        웹툰, OTT콘텐츠 데이터를 한 눈으로 확인할 수 있는
      </h2>
      <h1 className="circle-title2">OTConnection</h1>

      <div
        className="description-box"
        style={{ width: "960px", height: "400px" }}
      >
        <p className="circle-p">
          웹툰과 OTT 플랫폼에서 제작된 웹툰 기반 드라마에 대한
          <br />
          <span className="highlight">정보와 커뮤니티</span>를 제공합니다.
          웹툰과 드라마의 차이를
          <br />
          분석하고 연결합니다.
        </p>

        <div className="circle-container">
          <div className="circle">
            <p>
              웹툰
              <br />
              웹소설
            </p>
          </div>
          <div className="connection-line"></div>
          <div className="main-circle">
            <p>OTConnection</p>
          </div>
          <div className="connection-line"></div>
          <div className="circle">
            <p>
              드라마
              <br />
              영화
            </p>
          </div>
        </div>
      </div>

      <div
        className="data-visualization"
        style={{ width: "1000px", height: "650px" }}
      >
        <p className="data-visualization-top-p">
          작품 정보와 작가 정보를 제공하며, 플랫폼별 작품 수,
          <br />
          시청률, 조회수, 평점 비교{" "}
          <span className="highlight">데이터를 시각화</span>하여 쉽게 확<br />
          인할 수 있습니다.
        </p>
        <img
          className="laptop-image"
          src="/Introduce_MAC_LINE.png"
          alt="데이터 시각화 예시 이미지"
          style={{
            width: "50%",
            height: "auto",
            marginBottom: "80px",
          }}
        />
        <p className="data-visualization-bottom-p">
          향후 B2C 서비스를 넘어,{" "}
          <span className="highlight">
            유저 데이터를 바탕으로 B2B
            <br />
            서비스로 확장
          </span>
          해 제작자들에게 인기 장르와 트렌드 인사이트를 <br />
          제공할 예정입니다.
        </p>
      </div>
      <div>
        <img src="/Report_Section.png"></img>
      </div>
      <h2
        className="LastMessage"
        style={{
          marginTop: "100px",
          position: "relative",
          left: "35px",
        }}
      >
        웹툰과 드라마의 다양한 연결점을 발견하고,
        <br />
        데이터를 통해 새로운 시각으로 콘텐츠를 즐겨보세요.
      </h2>
      <Top />
    </div>
  );
};
