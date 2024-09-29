import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";
import { App } from "./App.tsx";
import {ScrollTop} from "./utils/ScrollTop.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <ScrollTop/>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>,
  );
}

