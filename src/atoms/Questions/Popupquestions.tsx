import React from "react";
import { IQuestions, TQuestions } from "../../types/QuestionsType";
// import Button from "../Layout/Button";

const Popupquestions: React.FC<{
  data: IQuestions;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  deleteQuestion: (_id: TQuestions<string>) => void;
  setData: React.Dispatch<React.SetStateAction<IQuestions | null>>;
}> = ({ data, deleteQuestion, setData, setQuery }) => {
  const set = new Map();
  set.set("data", [data.question, data.email, data.phone, data.username]);
  const popupData: string[] = [...set.get("data")];
  console.log(popupData);
  return (
    <>
      {popupData !== null && (
        <div
          className="w-full h-screen bg-[#DADADA] z-10 absolute top-0 left-0
                  flex justify-center items-center"
        >
          <div className=" cursor-pointer bg-white text-left flex gap-y-2 p-8 rounded-md flex-col">
            {popupData.map((item) => {
              return <span className="text-xl">{item}</span>;
            })}

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => deleteQuestion(data._id)}
                className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
              >
                Sil
              </button>
              {/*               <Button text="Sil" func={deleteQuestion(data._id)} style='bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2' />
               */}{" "}
              <button
                className=" bg-[#0F0916] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                onClick={() => {
                  setData(null), setQuery("");
                }}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popupquestions;
