import "./App.css";
import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Creator } from "./pages/Creator";
import { Home } from "./pages/Home";
import { IpInfo } from "./pages/IpInfo.tsx";
import { PersonDetail } from "./pages/PersonDetail";
import { IpDetail } from "./pages/IpDetail.tsx";
import {AnalyzeData} from "./pages/AnalyzeData.tsx";
import {MyPage} from "./pages/MyPage.tsx";
import {Community} from "./pages/Community.tsx";
import {CompareList} from "./components/post/CompareList.tsx";
import {VirtualCastingList} from "./components/post/VirtualCastingList.tsx";
import {Post} from "./pages/Post.tsx";

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
      <Route path="/analyzeData" element={<AnalyzeData />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/community" element={<Community/>}/>
      <Route path="/community/compare" element={<CompareList/>}/>
      <Route path="/community/virtual-casting" element={<VirtualCastingList/>}/>
      <Route path="/community/compare/:postId" element={<Post/>}/>
      <Route path="/community/virtual-casting/:postId" element={<Post/>}/>
    </Routes>
  </AppLayout>
);
