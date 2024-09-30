import React from "react";

const NotResut: React.FC<{
  text: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ text, setQuery }) => {
  return (
    <div className="text-4xl mt-4 w-full">
      <p className="w-full text-nowrap"> {text}</p>
      <button
        onClick={() => setQuery("")}
        className="px-5 py-3 mt-3 ml-1 text-base bg-black rounded text-white"
      >
        {"Axtarışı sıfırla"}
      </button>
    </div>
  );
};

export default NotResut;
