import React from "react";

interface IStatusText {
  text: string;
  status: number | string;
}

const Statustitle: React.FC<IStatusText> = ({ text,status }) => {
  return (
    <>
      {text.length > 0 && (
        <div
          className={`position absolute tracking-wider rounded ${
            status=='200' || status=='201' ? "bg-green-600" : "bg-red-600"
          } px-4 py-2 text-white right-12 top-8 text-sm`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Statustitle;
