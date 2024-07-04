import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Statustitle from "../../atoms/Scholarships/Statustitle";

function Addscholarship() {
  const [scform, setScform] = useState({
    name: "",
    country: "",
    region: "",
    type: "",
    degree: "", //
    description: "",
    deadline: "",
  });

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScform({ ...scform, [e.target.id]: e.target.value });
  };

  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<string | number>("");

  const sendScholarship = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/v1/scholarships/add`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(scform),
      }
    );

    const data = await response.json();

    setScform({
      name: "",
      country: "",
      region: "",
      type: "",
      degree: "", //
      description: "",
      deadline: "",
    });

    setText(data.message);
    setStatus(response.status);

    setTimeout(() => {
      setText("");
    }, 2000);
  };

  return (
    <Layout>
      <Statustitle text={text} status={status} />
      <div className="tracking-wider">
        <p className="text-2xl text-black">
          Yeni bir təqaüd proqramı əlavə etmək üçün formu doldurun.
        </p>

        <form
          onSubmit={(e) => sendScholarship(e)}
          action="post"
          className="mt-8 flex flex-col"
        >
          <div className="mb-4">
            <span className="block text-lg mb-2">Adı:</span>
            <input
              required={true}
              type="text"
              onChange={(e) => changeValue(e)}
              placeholder="..."
              id="name"
              value={scform.name}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#4b4b4b] 
       placeholder:text-[#000000] indent-3 border-[1px] text-sm
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            />
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Açıqlama:</span>
            <textarea
              required={true}
              onChange={(e) => changeValue(e)}
              placeholder="..."
              id="description"
              value={scform.description}
              className="mb-6 h-32 px-2 py-2 rounded-md text-[#000000] 
       placeholder:text-[#000000] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            />
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Ölkə:</span>
            <input
              required={true}
              type="text"
              onChange={(e) => changeValue(e)}
              placeholder="..."
              id="country"
              value={scform.country}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
       placeholder:text-[#000000] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            />
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Deadline:</span>
            <input
              required={true}
              type="text"
              onChange={(e) => changeValue(e)}
              placeholder="..."
              id="deadline"
              value={scform.deadline}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
       placeholder:text-[#000000] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            />
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Təhsil səviyyəsi:</span>
            <input
              required={true}
              type="text"
              onChange={(e) => changeValue(e)}
              placeholder="..."
              id="degree"
              value={scform.degree}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
       placeholder:text-[#000000] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
            />
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Bölgə:</span>
            <select
              required
              onChange={(e) => changeValue(e)}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
             placeholder:text-[#000000] indent-3 border-[1px]
              border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
              value={scform.region}
              id="region"
            >
              <option value="Regionlar">Regionlar</option>
              <option value="Avropa">Avropa</option>
              <option value="Amerika və kanada">Amerika və kanada</option>
              <option value="Asiya">Asiya</option>
              <option value="İngiltərə">İngiltərə</option>
              <option value="Rusiya və postsovet ölkələri">
                Rusiya və postsovet ölkələri
              </option>
              <option value="Türkiyə və müsəlman ölkələri">
                Türkiyə və müsəlman ölkələri
              </option>
            </select>
          </div>

          <div className="mb-4">
            <span className="block text-lg mb-2">Tipi:</span>
            <select
              required
              onChange={(e) => changeValue(e)}
              className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
             placeholder:text-[#000000] indent-3 border-[1px]
              border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
              value={scform.type}
              id="type"
            >
              <option value="Təqaüdün tipi">Təqaüdün tipi</option>
              <option value="Tam maliyyələşdirilmiş">
                Tam maliyyələşdirilmiş
              </option>
              <option value="Tam maliyyələşdirilmiş">
                Yarım maliyyələşdirilmiş
              </option>
              <option value="Endirimli">Endirimli</option>
            </select>
          </div>

          <div>
            <button className="bg-[#0F0916] text-white px-8 py-3 rounded-sm">
              Əlavə et
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Addscholarship;
