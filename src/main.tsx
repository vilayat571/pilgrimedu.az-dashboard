import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./pages/Main/App.tsx";
import { store } from "./redux/store/store.ts";
import Questions from "./pages/Questions/Questions.tsx";
import Scholarships from "./pages/Scholarships/Scholarships.tsx";
import Addscholarship from "./pages/Scholarships/Addscholarship.tsx";
import Addblog from "./pages/Blogs/Addblog.tsx";
import Allblogs from "./pages/Blogs/Allblogs.tsx";
import AllUsers from "./pages/Users/AllUsers.tsx";
import Login from "./pages/Main/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/suallar" element={<Questions />} />
          <Route path="/bloqlar" element={<Allblogs />} />
          <Route path="/teqaudler" element={<Scholarships />} />

          <Route path="/istifadechiler" element={<AllUsers />} />

          <Route path="/statistika" element={<App />} />
          <Route path="/teqaudelaveet" element={<Addscholarship />} />
          <Route path="/bloqelaveet" element={<Addblog />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
