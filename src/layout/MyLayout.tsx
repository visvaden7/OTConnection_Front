import {FunctionComponent, ReactNode, useState} from "react"; // CSS 파일 임포트
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import './MyLayout.css';
import LoginModal from "../components/LoginModal.tsx";
import Headers from "./Headers.tsx";
import Footers from "./Footers.tsx";

type MyLayoutProps = {
    children: ReactNode;
};

const MyLayout: FunctionComponent<MyLayoutProps> = ({children}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="layout-container">
            <Layout className="full-layout">
                <Headers openModal={openModal}/>
                <Content className="content-style">
                    {children}
                    <LoginModal isOpen={isModalOpen} onClose={closeModal}/>
                </Content>
                <Footers/>
            </Layout>
        </div>
    );
};

export default MyLayout;
