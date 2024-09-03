import React from "react";
import {Footer} from "antd/es/layout/layout";
import  "./Footers.css"

const Footers: React.FunctionComponent = () => {
    return (
        <Footer className="footer-style">
            <div className={"footer-company-info"}>
                <div>주식회사 OTConnection | 대표 웹종자 | 서울특별 강남구 역삼로 160길 9층</div>
                <div>사업자 등록 번호 123-45-67890</div>
                <div>OTConnection © 2024 by OTC, Inc. All rights reserved.</div>
            </div>
            <div className={"footer-translate"}>
                <div>ENG</div>
                <div> |</div>
                <div>KOR</div>
            </div>
        </Footer>
    )
}

export default Footers