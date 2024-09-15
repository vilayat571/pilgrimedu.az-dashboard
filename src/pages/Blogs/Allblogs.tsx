import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { apiURL } from "../../constants/URL";


export interface IITEM{
  _id:string, 
  title:string,
  author:string,
  date:string,
  thumbnail:string
  body?:string | undefined | null
}

function Allblogs() {
  const [blogs, setBlogs] = useState<IITEM[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, []);

  const handleDelete = async (id:string) => {
    const url = `${apiURL}/blogs/delete/${id}`;
    await fetch(url, {
      method: "DELETE",
    }).then(() => {
      fetch(`${apiURL}/blogs`)
        .then((res) => res.json())
        .then((data) => setBlogs(data.blogs));
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 w-full gap-4">
        {blogs != null &&
          blogs?.map((item:IITEM) => {
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
                  <div className="flex flex-row gap-4">
                    <button
                      className="bg-[#e22626] w-24 tracking-wider px-5 py-3 text-white text-[15px] rounded "
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>

                    <Link
                      className="bg-[#15a829] w-20 text-center tracking-wider px-5 py-3 text-white text-[15px] rounded "
                      to={`/bloqlar/${item._id}`}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export default Allblogs;
