import {FunctionComponent} from "react";
import {Bar} from "react-chartjs-2";
import "./ByAgeInterestChart.css"

interface Props {
  chartData: number[]
}

export const ByAgeInterestChart: FunctionComponent<Props> = ({chartData}) => {
  const maxAgeData = Math.max(...chartData)
  
  const maxDataLabelColor = chartData.map((data) => {
    if (data === maxAgeData) {
      return "#722ED1"
    }
    return "#D0D0D0"
  })
  
  const data = {
    labels: [
      "10대", "20대", "30대", "40대", "50대"
    ],
    datasets: [
      {
        data: chartData,
        backgroundColor: maxDataLabelColor,
        borderRadius: {
          topLeft: 5,  // 왼쪽 상단을 둥글게
          topRight: 5, // 오른쪽 상단을 둥글게
          bottomLeft: 0, // 하단 모서리는 둥글지 않음
          bottomRight: 0, // 하단 모서리는 둥글지 않음
        },
        barThickness: 27   // 막대의 두께 조정
      },
      {
        label: '전체',
        data: [100, 100, 100, 100, 100], // 모든 나이대에 대해 100% 값
        backgroundColor: '#EFEFEF', // 회색 배경
        barThickness: 27, // 막대 두께
        datalabels: { // 회색 막대에 대한 datalabels 비활성화
          display: false,
        },
      },
    ]
  };
  
  const options: {} = {
    plugins: {
      title: {
        display: true,
        text: '나이대별 관심',
        align: 'start',  // 제목 왼쪽 정렬
        font: {
          size: 13,
          weight: 'bold'
        },
      },
      legend: {
        display: false  // 범례 숨기기
      },
      datalabels: {
        color: '#000',  // 데이터 레이블의 색상
        anchor: 'end',  // 레이블을 막대의 정가운데에 배치
        align: 'end',   // 중앙에 정렬
        offset: -2,
        formatter: (value: any) => value + '%',  // 백분율 형식으로 데이터 표시
        font: {
          size: 9,  // 레이블의 폰트 크기 설정
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false  // x축 그리드 라인 제거
        },
        ticks: {
          display: true,
          font: {
            size: 12,  // x축 레이블 폰트 크기
            weight: 'bold'
          }
        },
        padding: 0
      },
      y: {
        stacked: true,
        display: false,
        beginAtZero: true,
        max: 100,
        grid: {
          display: false  // y축 그리드 라인 제거
        },
        ticks: {
          display: false  // y축 값 숨기기
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,  // 반응형을 위한 비율 유지 끄기
    layout: {
      padding: {
        top: 0,  // 차트 상단 패딩 추가
        bottom: 0  // 차트 하단 패딩 추가
      }
    }
  }
  return (
    <div className={"byAge-interest-chart"}>
      <Bar data={data} options={options}/>
    </div>
  )
}