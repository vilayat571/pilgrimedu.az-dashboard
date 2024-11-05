import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import Title from "../../atoms/Layout/Title";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  options,
  typeOfscholarships,
} from "../../constants/scholarshipsDetails";
import { getAllscholarships } from "../../redux/reducers/fetchScholarships";

export interface IData {
  name?: string;
  country?: string;
  region?: string;
  type?: string;
  degree?: string;
  description?: string;
  deadline?: string;
  _id?: string;
  date?: string;
}

const Scholarships = () => {
  const [scholarshipsData, setScholarshipsData] = useState<IData[] | null>(
    null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllscholarships()).then((data) =>
      setScholarshipsData(data.payload.scholarships)
    );
  }, [dispatch]);

  const [data, setData] = useState<IData | null>(null);
  const [query, setQuery] = useState<string>("");
  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredData = scholarshipsData?.filter((item) => {
    return item.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editing, setEditing] = useState(false);
  const editData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setEditing(true);
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const sendData = (id: string) => {
    fetch(`https://pilgrimedu.az/api/v1/scholarships/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setScholarshipsData(data.scholarships);
        toast(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: data.status === "OK" ? "green" : "red",
            color: "white",
            fontFamily: "Oceanwide",
          },
        });
      });
  };

  const deleteScholarship = (id: string) => {
    const url = `https://pilgrimedu.az/api/v1/scholarships/delete/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setScholarshipsData(data.scholarships);
        toast(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: data.status === "OK" ? "green" : "red",
            color: "white",
            fontFamily: "Oceanwide",
          },
        });
      });
  };

  const loading = useAppSelector((state) => state.fetchScholarships.loading);

  return (
    <Layout>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
          <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">
            Məlumatlar yüklənir..
          </p>
        </div>
      ) : (
        <>
          <ToastContainer />
          <Title text="təqaüd proqramı " count={scholarshipsData?.length} />
          <SearchQuestions query={query} changeValue={changeInpvalues} />
          <div className="grid grid-cols-2  w-full gap-4">
            {filteredData?.map((item: IData) => (
              <div key={item._id} className="col-span-1 flex flex-col gap-4 mb-4 px-8 py-6 bg-white rounded">
                <p>Ad : {item.name}</p>
                <p>Ölkə : {item.country}</p>
                <p>Region : {item.region}</p>
                <p>Təhsil səviyyəsi : {item.degree}</p>
                <p>Təqaüdün tipi : {item.type}</p>
                <p className="line-clamp-1 ">Haqqında : {item.description}</p>
                <p>Son müraciət tarixi : {item.deadline}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      deleteScholarship(item._id!);
                      setQuery("");
                    }}
                    className="text-base rounded-[3px]
                      hover:bg-red-600 hover:text-white transition duration-200 hover:border-red-600
                      border-[1px] border-[#b3b3b3]
                      px-5 py-3"
                  >
                    Təqaüdü sil
                  </button>

                  <button
                    className="text-base rounded-[3px]
                      hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600
                      border-[1px] border-[#b3b3b3]
                      px-5 py-3"
                    onClick={() => {
                      setQuery("");
                      setIsEdit(true);
                      setData(item);
                    }}
                  >
                    Düzəliş et
                  </button>
                  <button
                    className="text-base rounded-[3px]
                      hover:bg-[#210442] hover:text-white transition duration-200 hover:border-[#210442]
                      border-[1px] border-[#b3b3b3]
                      px-5 py-3"
                    onClick={() => {
                      setQuery("");
                      setData(item);
                    }}
                  >
                    Tam bax
                  </button>
                </div>
              </div>
            ))}
            {data !== null && isEdit ? (
              <div className="flex w-full h-screen absolute top-0 left-0 z-10 bg-[#DADADA] items-center justify-center">
                <FontAwesomeIcon
                  icon={faArrowCircleLeft}
                  onClick={() => {
                    setIsEdit(false);
                    setQuery("");
                  }}
                  className="absolute right-12 px-5 py-4 text-2xl cursor-pointer top-6
                  border-[1px] border-[#767676] transition duration-300 hover:border-red-600
                  hover:bg-red-600 hover:text-white text-black rounded"
                />
                <form
                  className="col-span-1 flex gap-4 flex-col mb-4 px-4 py-4 w-1/2 bg-white rounded"
                >
                  <input
                                    onChange={(e) => editData(e)}

                    id="name"
                    value={data.name}
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />

                  <input
                                    onChange={(e) => editData(e)}

                    id="country"
                    value={data.country}
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />

                  <input
                                    onChange={(e) => editData(e)}

                    value={data.description}
                    id="description"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />

                  <input
                                    onChange={(e) => editData(e)}

                    value={data.deadline}
                    id="deadline"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />

                  <input
                                    onChange={(e) => editData(e)}

                    value={data.degree}
                    id="degree"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />

                  <select
                                    onChange={(e) => editData(e)}

                    required
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                    value={data.region}
                    id="region"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                                    onChange={(e) => editData(e)}

                    required
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                    value={data.type}
                    id="type"
                  >
                    {typeOfscholarships.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <button
                      disabled={!editing}
                      className={`text-base rounded-[3px]                
                      transition duration-200 border-[1px] border-[#b3b3b3]
                      px-5 py-3 ${editing ? "hover:bg-[#210442] hover:text-white" : "bg-gray-300"}`}
                      onClick={() => {
                        if (data && data._id) {
                          sendData(data._id);
                        }
                        setQuery("");
                        setIsEdit(false);
                      }}
                    >
                      Təsdiq et
                    </button>
                    <button
                      className="text-base rounded-[3px]
                      hover:bg-gray-300 transition duration-200 border-[1px] border-[#b3b3b3]
                      px-5 py-3"
                      onClick={() => {
                        setIsEdit(false);
                        setQuery("");
                      }}
                    >
                      İmtina et
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Scholarships;
