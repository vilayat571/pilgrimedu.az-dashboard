import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./pages/Main/App.tsx";
import { store } from "./redux/store/store.ts";
import Questions from "./pages/Questions/Questions.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/suallar" element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
