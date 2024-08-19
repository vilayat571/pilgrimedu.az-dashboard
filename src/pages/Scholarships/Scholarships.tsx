import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchScholarships } from "../../redux/reducers/getAllscholarships";
import Title from "../../atoms/Layout/Title";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";

export interface IData {
  name?: string;
  country?: string;
  region?: string;
  type?: string;
  degree?: string;
  description?: string;
  deadline?: string;
  _id?: string;
date?:string
}

const Scholarships = () => {
  const scholarships: IData[] | null = useAppSelector(
    (state) => state.getAllscholarships.scholarships
  );
  const dispacth = useAppDispatch();

  useEffect(() => {
    dispacth(fetchScholarships());
  }, []);

  const [data, setData] = useState<IData | null>(null);

  const [query, setQuery] = useState<string>("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredData = scholarships?.filter((item) => {
    return item.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [editing, setEditing] = useState(false);

  const editData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(true);
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const sendData = (id:string) => {
    fetch(`http://localhost:5000/api/v1/scholarships/edit/${id}`, {
      method: "PUT", // Specify the HTTP method as 'PUT'
      headers: {
        "Content-Type": "application/json", // Specify the content type
        // Add any other headers like authorization if needed
      },
      body: JSON.stringify(data),
    }).then(() => dispacth(fetchScholarships()));
    setTimeout(() => {
      setIsEdit(false), setData(null);
    }, 2000);
  };

  return (
    <Layout>
      <Title text="Ümumi təqaüdlərin sayı: " dat={scholarships?.length} />

      <SearchQuestions query={query} changeValue={changeInpvalues} />

      <div className="grid grid-cols-2  w-full gap-4">
        {filteredData?.map((item: IData) => {
          return (
            <div className="col-span-1 flex flex-col mb-4 px-8 py-4  bg-white rounded">
              <span className="mb-4 block ">Ad : {item.name}</span>
              <span className="mb-4 block ">Ölkə : {item.country}</span>
              <span className="mb-4 block ">Region : {item.region}</span>
              <span className="mb-4 block ">
                Təhsil səviyyəsi : {item.degree}
              </span>
              <span className="mb-4 block ">Təqaüdün tipi : {item.type}</span>
              <span className="mb-4 block ">Haqqında : {item.description}</span>
              <span className="mb-4 block ">
                Son müraciət tarixi : {item.deadline}
              </span>
              <div className="flex gap-4">
                <button className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2">
                  Sil
                </button>

                <button
                  className=" bg-[#15A829] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                  onClick={() => {
                    setIsEdit(true), setData(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className=" bg-[#0F0916] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                  onClick={() => setData(item)}
                >
                  Bax
                </button>
              </div>
            </div>
          );
        })}
        {data !== null && isEdit ? (
          <div className="flex w-full h-screen absolute top-0 left-0 z-10 bg-[#DADADA] items-center justify-center">
            <div className="col-span-1 flex flex-col mb-4 px-4 py-4  bg-white rounded">
              <input
                id="name"
                value={data.name}
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                id="country"
                value={data.country}
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                value={data.region}
                id="region"
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                value={data.degree}
                id="degree"
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                value={data.type}
                id="type"
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                value={data.description}
                id="description"
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <input
                value={data.deadline}
                id="deadline"
                onChange={(e) => editData(e)}
                className="mb-4 block outline px-4 py-2"
              />

              <div className="flex gap-4">
                <button className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2">
                  Sil
                </button>
                <button
                  className={` ${
                    !editing ? "bg-[#5f5f5f]" : "bg-[#15A829]"
                  } text-white tracking-widest py-3 w-24 rounded text-sm mt-2`}
                  disabled={!editing ? true : false}
                  onClick={() => {
                    sendData(data._id ?? '');
                  }}
                >
                  Düzəlt
                </button>
                <button
                  className=" bg-[#0F0916] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                  onClick={() => {
                    setData(null), setIsEdit(false);
                  }}
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        ) : (
          data !== null && (
            <div className="flex w-full h-screen absolute top-0 left-0 z-10 bg-[#DADADA] items-center justify-center">
              <div className="col-span-1 flex flex-col mb-4 px-8 py-4  bg-white rounded">
                <span className="mb-4 block ">Ad : {data?.name}</span>
                <span className="mb-4 block ">Ölkə : {data?.country}</span>
                <span className="mb-4 block ">Region : {data?.region}</span>
                <span className="mb-4 block ">
                  Təhsil səviyyəsi : {data?.degree}
                </span>
                <span className="mb-4 block ">
                  Təqaüdün tipi : {data?.type}
                </span>
                <span className="mb-4 block ">
                  Haqqında : {data?.description}
                </span>
                <span className="mb-4 block ">
                  Son müraciət tarixi : {data?.deadline}
                </span>
                <div className="flex gap-4">
                  <button className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2">
                    Sil
                  </button>
                  {isEdit && (
                    <button
                      className=" bg-[#15A829] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                      // onClick={() => setData(null)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className=" bg-[#0F0916] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                    onClick={() => {
                      setData(null), setIsEdit(false);
                    }}
                  >
                    Bağla
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Scholarships;
