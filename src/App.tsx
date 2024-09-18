import "./App.css";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { Creator } from "./pages/Creator";
import { Home } from "./pages/Home";
import { IpInfo } from "./pages/Ipinfo.tsx";
import { PersonDetail } from "./pages/PersonDetail";
import { IpDetail } from "./pages/IpDetail.tsx";
import AnalyzeData from "./pages/AnalyzeData.tsx";

export const App: FunctionComponent = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/IpInfo" element={<IpInfo />} />
      <Route path="/Creator" element={<Creator />} />
      <Route path="/creator/:id" element={<PersonDetail />} />
      <Route path="creator/detail/:id" element={<PersonDetail />} />
      <Route path="/" element={<Creator />} />
      <Route path="/IpInfo/:id" element={<IpDetail />} />
      {/* <Route path="/DramaList" element={<contactPage />} /> */}
      <Route path="/analyzeData" element={<AnalyzeData />} />
      {/* <Route path="/community" element={<contactPage />} /> */}
      {/* <Routes path="/mypage" element={} /> */}
    </Routes>
  </AppLayout>
);
