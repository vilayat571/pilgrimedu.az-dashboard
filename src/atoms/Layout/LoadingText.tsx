import React from "react";
import { TQuestions } from "../../types/QuestionsType";

const LoadingText: React.FC<{ text: TQuestions<string> }> = ({ text }) => {
  return (
    <div
      className="bg-[#DADADA] w-full h-screen text-center 
  flex justify-center items-center"
    >
      <p className="text-4xl text-black">{text}...</p>
    </div>
  );
};

export default LoadingText;
