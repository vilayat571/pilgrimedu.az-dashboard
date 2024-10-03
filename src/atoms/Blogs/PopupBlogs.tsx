import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { IITEM } from "../../pages/Blogs/Allblogs";
import { useNavigate } from "react-router-dom";

const PopupBlogs: React.FC<{
  popup: IITEM | null;
  setPopup: React.Dispatch<React.SetStateAction<IITEM | null>>;
}> = ({ popup, setPopup }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [edit, setEdit] = useState(false);



  return (
    <>
      {edit
        ? ""
        : popup != null && (
            <div className="flex fixed bg-white left-0 top-0 w-full h-auto pt-24 items-center pb-12 justify-center">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => setPopup(null)}
                className="absolute right-4 px-5 py-4 text-lg cursor-pointer top-4 bg-red-600 text-white rounded"
              />
              <div className="flex flex-col px-4 py-5 w-full items-center justify-center h-auto rounded">
                <div className="w-full flex items-center flex-col justify-center ">
                  <div className="mt-5 mb-6 px-6 text-3xl w-3/4 text-left ">
                    {popup.title}
                  </div>
                  <img
                    src={popup.thumbnail}
                    className="w-3/4 rounded h-[600px]  object-cover  border"
                    alt={`the image of ${popup.title}`}
                  />
                  <div className="text-3xl font-semibold text-justify px-5 w-3/4 mt-8 tracking-wider leading-[35px]">
                    {popup.title}
                  </div>
                  <div
                    className="text-lg text-justify w-3/4 mt-3 tracking-wider leading-[35px] px-5"
                    dangerouslySetInnerHTML={{ __html: popup.body || "" }}
                  />
                </div>
                <div className="text-base font-semibold text-justify px-5 w-3/4 mt-8 tracking-wider leading-[35px]">
                  <button
                    onClick={() => goBack()}
                    className="px-7 py-2 rounded text-white bg-black"
                  >
                    Geri dön
                  </button>
                  <button
                    onClick={() => setEdit(!edit)}
                    className="px-7 py-2 rounded text-white bg-green-600 ml-5"
                  >
                    Düzəliş et
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default PopupBlogs;
