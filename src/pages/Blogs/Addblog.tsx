import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../../layout/Layout";
import { newDate } from "../../constants/fullDate.ts";
import { toast, ToastContainer } from "react-toastify";

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
  });

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

      const url = `https://pilgrimedu.az/api/v1/blogs/add`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res)=> {
         toast(res.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: res.data.status == "OK" ? "green" : "red",
            color: "white",
            top: "20px",
            fontFamily: "Oceanwide",
          },
        });
      })

/*       setForm({
        title: "",
        description: "",
      });
      setThumnbail("");
      setBody(""); */
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
       <ToastContainer />
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
