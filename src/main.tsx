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
import Singleblog from "./pages/Blogs/Singleblog.tsx";
import AllUsers from "./pages/Users/AllUsers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} /> {/*  əsas səhifə */}
          <Route path="/suallar" element={<Questions />} /> {/*  suallar + (edilmişdir) */}
          <Route path="/teqaudler" element={<Scholarships />} /> {/*  təqaüdlər */}
          <Route path="/teqaudelaveet" element={<Addscholarship />} /> {/*  təqaüd əlavə et */}
          <Route path="/bloqelaveet" element={<Addblog />} /> {/* bloq əlavə et */}
          <Route path="/bloqlar" element={<Allblogs />} /> {/* bütün bloqlar */}
          <Route path="/bloqlar/:id" element={<Singleblog />} /> {/* tək blog */}
          <Route path="/users" element={<AllUsers />} />  {/* istifadəçilər */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
