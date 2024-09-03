import * as React from "react";
import {useState} from "react"; // CSS 파일 임포트
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import './MyLayout.css';
import LoginModal from "../components/LoginModal.tsx";
import {AuthProvider} from "../context/AuthContext.tsx";
import Headers from "./Headers.tsx";
import Footers from "./Footers.tsx";

type MyLayoutProps = {
    children: React.ReactNode;
};

const MyLayout: React.FC<MyLayoutProps> = ({children}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="layout-container">
            <Layout className="full-layout">
                <AuthProvider>
                    <Headers openModal={openModal}/>
                    <Content className="content-style">
                        {children}
                        <LoginModal isOpen={isModalOpen} onClose={closeModal}/>
                    </Content>
                    <Footers/>
                </AuthProvider>
            </Layout>
        </div>
    );
};

export default MyLayout;
