import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { IITEM } from "../../pages/Blogs/Allblogs";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

const PopupBlogs: React.FC<{
  popup: IITEM | null;
  setPopup: React.Dispatch<React.SetStateAction<IITEM | null>>;
}> = ({ popup, setPopup }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState(popup?.body || "");

  const [editedBlog, setEditedBlog] = useState<IITEM>({
    title: popup?.title || "",
    thumbnail: popup?.thumbnail || "",
    description: popup?.description || "",
  });

  // Update the state when popup changes
  useEffect(() => {
    if (popup) {
      setEditedBlog({
        title: popup.title || "",
        thumbnail: popup.thumbnail || "",
        description: popup?.description || "",
      });
      setBody(popup.body || "");
    }
  }, [popup]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedBlog({ ...editedBlog, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setEditedBlog({ ...editedBlog, thumbnail: selectedFile });
      console.log(editedBlog.thumbnail);
    }
  };

  const sendEditedBlog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", editedBlog.title);
    formData.append("body", body || "");
    formData.append("description", editedBlog.description || "");

    if (editedBlog.thumbnail instanceof File) {
      formData.append("thumbnail", editedBlog.thumbnail); // File input
    }

    try {
      const response = await fetch(
        `https://pilgrimbackend.onrender.com/api/v1/blogs/put/${popup?._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error while updating blog:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["link", "image"],
    ],
  };

  const getImageSrc = () => {
    if (editedBlog.thumbnail instanceof File) {
      return URL.createObjectURL(editedBlog.thumbnail);
    }
    return editedBlog.thumbnail || "";
  };

  return (
    <>
      {edit ? (
        <div className="flex fixed bg-[#fff] left-0 top-0 w-full h-screen pt-24 items-start py-6 justify-center">
          <div className="flex items-start w-3/4 gap-y-12 flex-col pt-6">
            <label htmlFor="file">
              <p className="text-2xl mb-4"> Şəkil:</p>
              <input
                onChange={(e) => handleFileChange(e)}
                id="thumbnail"
                type="file"
              />
            </label>
            <label htmlFor="title" className="w-full">
              <p className="text-2xl mb-4"> Başlıq:</p>
              <input
                onChange={(e) => handleChange(e)}
                className=" w-full px-5 py-4 rounded bg-[#DADADA]"
                placeholder="Başlıq"
                id="title"
                value={editedBlog.title}
                type="text"
              />
            </label>
            <label htmlFor="description" className="w-full">
              <p className="text-2xl mb-4"> Açıqlama:</p>
              <input
                onChange={(e) => handleChange(e)}
                className=" w-full px-5 py-4 rounded bg-[#DADADA]"
                placeholder="Açıqlama"
                id="description"
                value={editedBlog.description}
                type="text"
              />
            </label>
            <label htmlFor="body" className="w-full">
              <p className="text-2xl mb-4"> Mətn:</p>
              <ReactQuill
                theme="snow"
                value={body}
                className="mt-3 h-60"
                onChange={setBody}
                modules={modules}
              />
            </label>
            <div className="text-base font-semibold text-justify px-5 w-3/4 mt-8 tracking-wider leading-[35px]">
              <button
                onClick={() => goBack()}
                className="px-7 py-2 rounded text-white bg-black"
              >
                Geri dön
              </button>
              <button
                onClick={(e) => sendEditedBlog(e)}
                className="px-7 py-2 rounded text-white bg-green-600 ml-5"
              >
                Göndər
              </button>
            </div>
          </div>
        </div>
      ) : (
        popup != null && (
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
                  src={getImageSrc()}
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
        )
      )}
    </>
  );
};

export default PopupBlogs;
