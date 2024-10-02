import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import Title from "../../atoms/Layout/Title";
import NotResut from "../../atoms/Layout/NotResut";
import { TQuestions } from "../../types/QuestionsType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export interface IITEM {
  _id: string;
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  body?: string | undefined | null;
}

function Allblogs() {
  const [blogs, setBlogs] = useState<IITEM[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, [setBlogs]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    const url = `http://localhost:3001/api/v1/blogs/delete/${id}`;
    await fetch(url, {
      method: "DELETE",
    })
      .then(() => {
        fetch(`http://localhost:3001/api/v1/blogs`)
          .then((res) => res.json())
          .then((data) => setBlogs(data.blogs));
      })
      .then(() => setLoading(false));
  };

  const [popup, setPopup] = useState<IITEM | null>(null);

  const [query, setQuery] = useState<TQuestions<string>>("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredBlogs = blogs?.filter((blog) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  });

  const showData = (data: IITEM) => {
    setPopup(data);
  };

  const mappedPopup = new Map();
  mappedPopup.set("popupData", [
    popup?.author,
    popup?.body,
    popup?.thumbnail,
    popup?.title,
  ]);

  return (
    <Layout>
      <div className="mt-8">
        <Title text="Ümumi bloq sayı: " dat={blogs?.length} />
        <SearchQuestions query={query} changeValue={changeInpvalues} />
      </div>

      {popup != null && (
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
              <button  className="px-7 py-2 rounded text-white bg-black">
                Geri dön
              </button>
              <button className="px-7 py-2 rounded text-white bg-green-600 ml-5" >
                Düzəliş et
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-3xl">Element silinir..</div>
      ) : (
        <div className="grid grid-cols-3 w-full gap-4">
          {filteredBlogs != undefined && filteredBlogs?.length > 0 ? (
            filteredBlogs?.map((item: IITEM) => {
              return (
                <div
                  key={item._id}
                  className="col-span-1 bg-white pb-6 rounded flex flex-col mb-4"
                >
                  <img
                    className=" h-[200px] object-cover rounded-t rounded-b-none"
                    src={item.thumbnail}
                    alt={`the image of ${item.title}`}
                  />
                  <div className="px-3 flex flex-col">
                    <p className="text-[15px] text-black flex gap-4 mt-3"></p>
                    <p className="text-2xl font-semibold mt-3 mb-3">
                      {item.title}
                    </p>
                    <div className="flex flex-row gap-4 mt-1">
                      <button
                        className="bg-[#e22626] w- tracking-wider px-5 py-3 text-white text-[15px] rounded "
                        onClick={() => handleDelete(item._id)}
                      >
                        Sil
                      </button>

                      <button
                        onClick={() => showData(item)}
                        className="bg-[#15a829]  text-center tracking-wider px-5 py-3 text-white text-[15px] rounded "
                      >
                        Tam bax
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NotResut
              text="Təssüf ki, axtarışa uyğun bloq tapılmadı!"
              setQuery={setQuery}
            />
          )}
        </div>
      )}
    </Layout>
  );
}

export default Allblogs;
