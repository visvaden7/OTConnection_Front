import {FunctionComponent} from "react";
import "./ByGenderInterestChart.css"

interface Props {
  naver_female_search: number,
  naver_male_search: number
}

export const ByGenderInterestChart: FunctionComponent<Props> = ({naver_male_search, naver_female_search}) => {
  const female = `${naver_female_search}%`
  const male = `${naver_male_search}%`
  return (
    <div className={"byGender-interest-chart"}>
      <div className={"stacked-bar"}>
        {/* 여성 65% */}
        <div className={"female_percent"} style={{width: female}}></div>
        {/* 남성 35% */}
        <div className={"male_percent"} style={{width: male}}></div>
      </div>
      <div className={"stacked-bar-label"}>
        <span>여성 {naver_female_search}%</span>
        <span>남성 {naver_male_search}%</span>
      </div>
    </div>
  )
}