import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { apiURL } from "../../constants/URL";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";

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

  const [query, setQuery] = useState<string>("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredBlogs = blogs?.filter((blog) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  });

  const showData = (data: IITEM) => {
    setPopup(data);
  };

  return (
    <Layout>
      <div className="mt-8">
        <p className="mb-5 text-3xl"> Ümumi bloq sayı : {blogs?.length}</p>
        <SearchQuestions query={query} changeValue={changeInpvalues} />
      </div>

      <div></div>

      {loading ? (
        <div className="text-3xl">Element silinir..</div>
      ) : (
        <div className="grid grid-cols-4 w-full gap-4">
          {blogs != null &&
            filteredBlogs?.map((item: IITEM) => {
              return (
                <div key={item._id} className="col-span-1 flex flex-col mb-4">
                  <img
                    className="w-[300px] h-[200px] object-cover rounded"
                    src={item.thumbnail}
                    alt=""
                  />
                  <div className="px-3 flex flex-col">
                    <p className="text-[15px] text-black flex gap-4 mt-3">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                    </p>
                    <p className="text-[20px] font-semibold mt-1 mb-2">
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
            })}
        </div>
      )}
    </Layout>
  );
}

export default Allblogs;
