import "./App.css";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { Creator } from "./pages/Creator";
import { Home } from "./pages/Home";
import IpDetail from "./pages/IpDetail";
import { IpInfo } from "./pages/IpInfo";

export const App: FunctionComponent = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/IpInfo" element={<IpInfo />} />
      <Route path="/Creator" element={<Creator />} />
      <Route path="/IpInfo/:id" element={<IpDetail />} />
      {/* <Route path="/DramaList" element={<contactPage />} /> */}
      {/*<Route path="/analyzeData" element={<ContactPage />} />*/}
      {/*<Route path="/community" element={<ContactPage />} />*/}
      {/* <Route path="/mypage" element={} /> */}
    </Routes>
  </AppLayout>
);
