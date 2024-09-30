import React from "react";
import { useNavigate } from "react-router-dom";

const NotfoundData: React.FC<{ path: string; text: string }> = ({
  path,
  text,
}) => {
  const navigate = -useNavigate();

  const nextPage = () => {
    navigate(path);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center w-full justify-center text-4x ">
        <span className="text-5xl">{text} mövcud deyil!</span>
      </div>
      <div className="flex items-center w-full justify-center mt-4 mb-28 ">
        <button
          onClick={() => nextPage()}
          className="px-5 py-3 bg-[#0F0916] text-base text-white rounded"
        >
          Növbəti səhifə
        </button>
      </div>
    </div>
  );
};

export default NotfoundData;
