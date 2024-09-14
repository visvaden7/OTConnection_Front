import {FunctionComponent} from "react";
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Doughnut} from "react-chartjs-2";
import "./ImdbDoughChart.css"

interface Props {
  imdb_rating: number;
}

export const ImdbDoughChart: FunctionComponent<Props> = ({imdb_rating}) => {
  const percentage = (imdb_rating / 10) * 100;
  const options = {
    rotation: -90, // 그래프 시작 위치를 -90도로 설정 (위쪽에서 시작)
    circumference: 180, // 반원형으로 만들기 위해 180도 설정
    plugins: {
      legend: {display: false}, // 범례 숨김
      tooltip: {enabled: false}, // 툴팁 숨김
    },
  };
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#fFa500", "#e0e0e0"], // 노란색
        borderWidth: 0,
        datalabels: {
          display: false, // 데이터 레이블 숨기기
        },
        cutout: "80%", // 도넛 안쪽 비율
      },
    ],
  };
  return (
    <div className={"imdb-chart"}>
      <div className={"tooltip"}>
        <Tooltip title="IMDB 정보">
          <QuestionCircleOutlined style={{fontSize: "17px"}}/>
        </Tooltip>
      </div>
      <div>
        <img
          src="/iconLogo/IMDB_Logo_2016.svg.png" // 로고 경로 변경
          alt="IMDB Logo"
        />
        <Doughnut data={data} options={options}/>
        <span className={"imdb-chart-rating"}>
                <h2>IMDB</h2>
          {`${imdb_rating} / 10`}
              </span>
      </div>
    </div>
  )
}