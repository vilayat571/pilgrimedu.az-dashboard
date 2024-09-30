import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";


interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <motion.div
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
      <div
        className="flex
     flex-row justify-between items-start"
      >
        <Navbar />
        <div className="w-3/4 bg-[#DADADA] h-screen overflow-x-hidden px-12 pt-16 pb-4">
          {children}
        </div>
      </div>
{/*       <div className="sm:flex md:flex xl:hidden lg:hidden w-full h-screen justify-center items-center">
        <p className="text-center w-full font-semibold mx-4 text-3xl">
          Üzr istəyirik, bu sayt sadəcə
          <br />
          desktop komputerlərdə çalışır.
        </p>
      </div> */}
    </motion.div>
  );
};

export default Layout;
