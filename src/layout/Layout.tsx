import React from "react";
import Navbar from "../components/Navbar/Navbar";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="flex flex-row justify-between items-start">
      <Navbar />
      <div className="w-3/4 h-screen overflow-x-hidden px-12 pt-16 pb-4">{children}</div>
    </div>
  );
};

export default Layout;
