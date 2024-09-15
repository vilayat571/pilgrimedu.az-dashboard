import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../../layout/Layout";
import { newDate } from "../../constants/fullDate.ts";
import { apiURL } from "../../constants/URL.tsx";

export interface IAUTHOR {
  name: string;
  _id: string;
  email: string;
}

const Addblog = () => {
  const [thumbnail, setThumnbail] = useState("");
  const [body, setBody] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
  });

  const [authors, setAuthors] = useState<null | IAUTHOR[]>(null);

  useEffect(() => {
    fetch(`${apiURL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data.data));
  }, []);

  console.log(authors);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | any) =>
    setThumnbail(e.target.files[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const maxAllowedSize = 5 * 1024 * 1024;

    if (thumbnail.length > maxAllowedSize) {
      alert("File is too big!");
      setThumnbail("");
    } else {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("thumbnail", thumbnail);
      formData.append("date", newDate);
      formData.append("description", form.description);
      formData.append("body", body);
      formData.append("author", form.author);

      const url = `${apiURL}/blogs/add`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        title: "",
        description: "",
        author: "",
      });
      setThumnbail("");
      setBody("");
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

  const handleForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <Layout>
      <form id="blogId" className="" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-10">
          <span className="text-xl font-bold">Başlıq :</span>
          <input
            required={true}
            type="text"
            id="title"
            className="block outline-none w-1/2 py-4 
            text-sm indent-5 font-light
             rounded mt-3 border "
            placeholder="Başlıq yazın..."
            value={form.title}
            onChange={(e) => handleForm(e)}
          />
        </div>

        <div className="mb-10">
          <span className="text-xl font-bold">Açıqlama :</span>
          <input
            required={true}
            type="text"
            id="description"
            className="block w-3/4 outline-none py-4 
            text-sm indent-5 font-light
             rounded mt-3 border "
            placeholder="Açıqlama yazın..."
            value={form.description}
            onChange={(e) => handleForm(e)}
          />
        </div>

        <div className="mb-10">
          <span className="text-xl font-bold">Müəllif:</span>
          <select
            required
            onChange={(e) => handleForm(e)}
            className="mb-6 h-14 px-2 py-2 block mt-4 rounded-md text-[#000000] 
             placeholder:text-[#000000] indent-3 border-[1px]
              border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            value={form.author}
            id="author"
          >
            <option value="Müəlliflər">Müəlliflər</option>
            {authors?.map((author: IAUTHOR) => {
              return (
                <option key={Math.random()} value={author.name}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-10">
          <span className="text-xl font-bold">Kover şəkli:</span>
          <input
            required={true}
            type="file"
            id="thumbnail"
            className="block  mt-3"
            accept="thumbnail/*"
            onChange={(e) => handleImageChange(e)}
          />
        </div>

        <div className="mb-10">
          <span className="text-xl font-bold mb-3">Mətn:</span>
          <ReactQuill
            theme="snow"
            value={body}
            className="mt-3 h-60"
            onChange={setBody}
            modules={modules}
          />
        </div>

        <button
          className="mt-10 px-6 rounded py-3 bg-black text-white"
          
          type="submit"
        >
          Bloq əlavə et
        </button>
      </form>
    </Layout>
  );
};

export default Addblog;
