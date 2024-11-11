import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import Title from "../../atoms/Layout/Title";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import "react-toastify/dist/ReactToastify.css";
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
  const [editing, setEditing] = useState(false);
  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredData = scholarshipsData?.filter((item) =>
    item.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  const editData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditing(true);
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const [toast, setShowToast] = useState("");

  const sendData = async (
    id: string | undefined,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://pilgrimedu.az/api/v1/scholarships/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setScholarshipsData(result.scholarships);
      setShowToast(result.message);
      setTimeout(() => {
        setShowToast("");
      }, 2000);
    } catch (error) {
      setShowToast("Xəta verdi!");
    }
  };

  const deleteScholarship = async (id: string) => {
    try {
      const response = await fetch(
        `https://pilgrimedu.az/api/v1/scholarships/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      setScholarshipsData(result.scholarships);
      setShowToast(result.message);
      setTimeout(() => {
        setShowToast("");
      }, 2000);
    } catch (error) {
      setShowToast("Xəta verdi!");
    }
  };

  const loading = useAppSelector((state) => state.fetchScholarships.loading);

  return (
    <Layout>
      {toast.length > 0 && (
        <div className="absolute z-50 rounded top-6 right-6 px-5 py-4 bg-black text-white">
          {toast}
        </div>
      )}

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
          <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">
            Məlumatlar yüklənir..
          </p>
        </div>
      ) : (
        <>
          <Title text="təqaüd proqramı" count={scholarshipsData?.length} />
          <SearchQuestions query={query} changeValue={changeInpvalues} />
          <div className="grid grid-cols-2 w-full gap-4">
            {filteredData?.map((item) => (
              <div
                key={item._id}
                className="col-span-1 flex flex-col gap-4 mb-4 px-8 py-6 bg-white rounded"
              >
                <p>Ad: {item.name}</p>
                <p>Ölkə: {item.country}</p>
                <p>Region: {item.region}</p>
                <p>Təhsil səviyyəsi: {item.degree}</p>
                <p>Təqaüdün tipi: {item.type}</p>
                <p className="line-clamp-1">Haqqında: {item.description}</p>
                <p>Son müraciət tarixi: {item.deadline}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      deleteScholarship(item._id!);
                      setQuery("");
                    }}
                    className="text-base rounded-[3px] hover:bg-red-600 hover:text-white transition duration-200 hover:border-red-600 border-[1px] border-[#b3b3b3] px-5 py-3"
                  >
                    Təqaüdü sil
                  </button>
                  <button
                    className="text-base rounded-[3px] hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600 border-[1px] border-[#b3b3b3] px-5 py-3"
                    onClick={() => {
                      setEditing(true);
                      setData(item);
                    }}
                  >
                    Düzəliş et
                  </button>
                  <button
                    className="text-base rounded-[3px] hover:bg-[#210442] hover:text-white transition duration-200 hover:border-[#210442] border-[1px] border-[#b3b3b3] px-5 py-3"
                    onClick={() => setData(item)}
                  >
                    Tam bax
                  </button>
                </div>
              </div>
            ))}
            {data && (
              <div className="flex w-full h-screen absolute top-0 left-0 z-10 bg-[#DADADA] items-center justify-center">
                <FontAwesomeIcon
                  icon={faArrowCircleLeft}
                  onClick={() => {
                    setData(null);
                    setQuery("");
                  }}
                  className="absolute right-12 px-5 py-4 text-2xl cursor-pointer top-6 border-[1px] border-[#767676] transition duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white text-black rounded"
                />
                <form className="col-span-1 flex gap-4 flex-col mb-4 px-4 py-4 w-1/2 bg-white rounded">
                  <input
                    onChange={editData}
                    id="name"
                    value={data.name}
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />
                  <input
                    onChange={editData}
                    id="country"
                    value={data.country}
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />
                  <input
                    onChange={editData}
                    value={data.description}
                    id="description"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />
                  <input
                    onChange={editData}
                    value={data.deadline}
                    id="deadline"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />
                  <input
                    onChange={editData}
                    value={data.degree}
                    id="degree"
                    className="block border-[1px] border-[#bbbbbb] rounded px-4 py-3"
                  />
                  <select
                    onChange={editData}
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
                    onChange={editData}
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
                      className={`text-base rounded-[3px] transition duration-200 border-[1px] ${
                        editing
                          ? "hover:bg-green-600 hover:text-white border-green-600"
                          : "cursor-not-allowed border-[#bbbbbb] text-[#bbbbbb]"
                      } px-5 py-3`}
                      onClick={(e) => sendData(data._id, e)}
                    >
                      Yadda saxla
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Scholarships;
