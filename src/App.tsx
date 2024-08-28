import './App.css'
import {Route, Routes} from "react-router-dom";
import Page1 from "./pages/Page1.tsx";
import MyLayout from "./layout/MyLayout.tsx";
import Page2 from "./pages/Page2.tsx";


function App() {
    return (
        <MyLayout>
            <Routes>
                <Route path="/IpInfo" element={<Page1/>}/>
                <Route path="/creator" element={<Page2 />} />
                {/*<Route path="/analyzeData" element={<ContactPage />} />*/}
                {/*<Route path="/community" element={<ContactPage />} />*/}
                {/*<Route path="/mypage" element={<ContactPage />} />*/}
            </Routes>
        </MyLayout>
    )
}

export default App
