import { useParams } from "react-router-dom";
//import { IITEM } from "./Allblogs";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../../layout/Layout";
import { newDate } from "../../constants/fullDate.ts";

export interface IAUTHOR {
  name: string;
  _id: string;
  email: string;
}

const Singleblog = () => {
/*   const [blog, setBlog] = useState<IITEM | null>(null);
 */  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.blog.title || "",
          description: data.blog.description || "",
        });
        setBody(data.blog.body || "");
      });
  }, [id]);

  const [thumbnail, setThumnbail] = useState("");
  const [body, setBody] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setThumnbail(e.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("thumbnail", thumbnail); // Assuming thumbnail is a File object
    formData.append("date", newDate);
    formData.append("description", form.description);
    formData.append("body", body);
  
  /*   const url = `http://localhost:5000/api/v1/blogs/put/${id}`;
  
    const response = await fetch(url, {
      method: "PUT",
      body: formData, // Send FormData directly
    });
  }; */
  
  }
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
          <span className="text-xl font-bold">Kover şəkli:</span>
          <input
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
          className="mt-10 px-6 rounded py-3 bg-green-500 text-white"
          type="submit"
        >
          Düzəliş et
        </button>
      </form>
    </Layout>
  );
};

export default Singleblog;
