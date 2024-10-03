import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {!loading ? (
        <div className="flex items-center bg-[#000000] justify-center w-full h-screen">
          <img
          className="w-1/5"
            src="https://miro.medium.com/v2/resize:fit:1400/0*3IFEy-hfoIpgFjBl.gif"
            alt="the loading image of dashboard"
          />
        </div>
      ) : (
        <>
          <div
            className="flex
     flex-row justify-between items-start"
          >
            <Navbar />
            <div className="w-3/4 bg-[#DADADA] h-screen overflow-x-hidden px-12 pt-16 pb-4">
              {children}
            </div>
          </div>
          <div className="sm:flex md:flex xl:hidden lg:hidden w-full h-screen justify-center items-center">
            <p className="text-center w-full font-semibold mx-4 text-3xl">
              Üzr istəyirik, bu sayt sadəcə
              <br />
              desktop komputerlərdə çalışır.
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Layout;
