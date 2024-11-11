import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { IITEM } from "../../redux/reducers/fetchBlogs";

const PopupBlogs: React.FC<{
  popup: IITEM | null;
  setBlogs: React.Dispatch<React.SetStateAction<IITEM[] | null>>;
  setPopup: React.Dispatch<React.SetStateAction<IITEM | null>>;
}> = ({ popup, setPopup, setBlogs }) => {
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState<string>(popup?.body || ""); // Set initial state to an empty string if popup.body is undefined
  const [editedBlog, setEditedBlog] = useState<IITEM>({
    title: popup?.title || "",
    description: popup?.description || "",
    thumbnail: popup?.thumbnail || "",
  });

  const [popupData, setPopupData] = useState<IITEM | null>(popup);
  const [thumbnail, setThumbnail] = useState<File | string | undefined>(
    popup?.thumbnail
  );

  // Update the state when popup changes
  useEffect(() => {
    setPopupData(popup);
    if (popup) {
      setEditedBlog({
        title: popup.title,
        thumbnail: popup.thumbnail,
        description: popup?.description || "",
      });
      setBody(popup.body || ""); // Ensure the current body is set
      setThumbnail(popup.thumbnail); // Ensure the current thumbnail is set
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
      setThumbnail(selectedFile);
    } else {
      setThumbnail(popup?.thumbnail);
    }
  };

  const isChanged = () => {
    return (
      popup?.body !== body ||
      popup?.description !== editedBlog.description ||
      popup?.title !== editedBlog.title ||
      thumbnail !== editedBlog.thumbnail
    );
  };

  const [toast, setToast] = useState("");

  const sendEditedBlog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", editedBlog.title || "");
    formData.append("body", body || "");
    formData.append("description", editedBlog.description || "");

    formData.append("thumbnail", thumbnail || ''); // Append the file correctly

    try {
      if (isChanged()) {
        const response = await fetch(
          `https://pilgrimedu.az/api/v1/blogs/put/${popup?._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        const result = await response.json();
        setToast(result.message);
        setTimeout(() => {
          setToast("");
        }, 2000);
        if (result.status === "OK") {
          setBlogs(result.blogs);
          setPopupData(result.editedBlog);
        }
      } else {
        alert("Hər hansı bir dəyişiklik yoxdur!");
      }
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

  return (
    <>
      {edit ? (
        <div className="flex fixed bg-[#fff] left-0 top-0 overflow-x-hidden w-full h-screen pb-[200px] pt-12 items-start justify-center">
          {toast.length > 0 && (
            <div className="fixed z-50 top-6 right-6 p-4 rounded text-white bg-black ">
              {toast}
            </div>
          )}
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            onClick={() => {
              setEdit(false);
              window.scrollTo(0, 0);
            }}
            className="absolute right-12 px-5 py-4 text-2xl cursor-pointer top-6
              border-[1px] border-[#767676] transition duration-300 hover:border-red-600
              hover:bg-red-600 hover:text-white  text-black rounded"
          />
          <div className="flex items-start w-4/5 gap-y-12 flex-col pt-6">
            <p className="text-3xl bg-black text-white px-4 py-3 rounded">
              Bloqda yeniləmə et:
            </p>
            <label htmlFor="file">
              <p className="text-2xl mb-4">Şəkil:</p>
              <input onChange={handleFileChange} id="thumbnail" type="file" />
              {thumbnail && typeof thumbnail === "string" && (
                <div className="mt-4 text-lg">
                  <p>Cari şəkil:</p>
                  <img
                    src={`https://pilgrimedu.az/medias/${thumbnail}`}
                    alt="Current thumbnail"
                    className="w-20 mt-1 h-20 object-cover rounded"
                  />
                </div>
              )}
            </label>
            <label htmlFor="title" className="w-full">
              <p className="text-2xl mb-4">Başlıq:</p>
              <input
                onChange={handleChange}
                className="w-full px-5 py-4 rounded bg-[#DADADA]"
                placeholder="Başlıq"
                id="title"
                value={editedBlog.title}
                type="text"
              />
            </label>
            <label htmlFor="description" className="w-full">
              <p className="text-2xl mb-4">Açıqlama:</p>
              <input
                onChange={handleChange}
                className="w-full px-5 py-4 rounded bg-[#DADADA]"
                placeholder="Açıqlama"
                id="description"
                value={editedBlog.description}
                type="text"
              />
            </label>
            <label htmlFor="body" className="w-full">
              <p className="text-2xl mb-4">Mətn:</p>
              <ReactQuill
                theme="snow"
                value={body}
                id="body"
                className="mt-3 h-60"
                onChange={setBody}
                modules={modules}
              />
            </label>

            <div className="text-base gap-4 flex font-semibold text-justify px-2 mt-8 tracking-wider leading-[35px]">
              <button
                onClick={() => {
                  setEdit(false);
                  window.scrollTo(0, 0);
                }}
                className="text-lg rounded-[3px]
                  hover:bg-[#210442] hover:text-white transition duration-200 hover:border-[#210442]
                  border-[1px] border-[#b3b3b3]
                 px-8 py-4"
              >
                Geri dön
              </button>
              <button
                onClick={sendEditedBlog}
                className="text-lg rounded-[3px]
                  hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600
                  border-[1px] border-[#b3b3b3]
                 px-8 py-4"
              >
                Bloqu yenilə
              </button>
            </div>
          </div>
        </div>
      ) : (
        popupData != null && (
          <div className="flex fixed bg-white left-0 top-0 w-full h-auto pt-24 items-center pb-[200px] overflow-x-hidden justify-center">
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              onClick={() => {
                setPopup(null), window.location.reload();
              }}
              className="absolute right-12 px-5 py-4 text-2xl cursor-pointer top-6
              border-[1px] border-[#767676] transition duration-300 hover:border-red-600
              hover:bg-red-600 hover:text-white  text-black rounded"
            />
            <div className="flex flex-col px-4 py-5 w-3/4 items-start justify-center h-auto rounded">
              <p className="text-3xl bg-[#210442] cursor-pointer text-white px-4 py-3 rounded text-left mb-6">
                Cari bloq:
              </p>

              <div className="w-full flex items-center flex-col justify-center ">
                <div className="w-full text-left my-5">
                  <h1 className="text-4xl font-semibold ">{popupData.title}</h1>
                </div>
                <img
                  src={`https://pilgrimedu.az/medias/${popupData?.thumbnail}`}
                  className="w-full rounded h-[600px] border object-cover"
                  alt="thumbnail"
                />
                <div className="w-full text-left">
                  <div className="mt-6">
                    <h2 className="text-2xl mt-4">{popupData.description}</h2>
                  </div>
                  <div className="mt-6">
                    <p
                      dangerouslySetInnerHTML={{ __html: popupData.body || "" }}
                      className="text-lg"
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-x-5">
                  <button
                    onClick={() => setEdit(true)}
                    className="text-lg rounded-[3px]
                      hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600
                      border-[1px] border-[#b3b3b3]
                     px-8 py-4"
                  >
                    Yenilə
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default PopupBlogs;
