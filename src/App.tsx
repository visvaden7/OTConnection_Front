import "./App.css";
import { Route, Routes } from "react-router-dom";
import MyLayout from "./layout/MyLayout.tsx";
import Home from "./pages/Home.tsx";
import Ipinfo from "./pages/Ipinfo.tsx";
import Creator from "./pages/Creator.tsx";
import Mypage from "./pages/mypage.tsx";

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ipinfo" element={<Ipinfo />} />
        <Route path="/Creator" element={<Creator />} />
        {/*<Route path="/analyzeData" element={<ContactPage />} />*/}
        {/*<Route path="/community" element={<ContactPage />} />*/}
        {/* <Route path="/mypage" element={} /> */}
      </Routes>
    </MyLayout>
  );
}

export default App;
