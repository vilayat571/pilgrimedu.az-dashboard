import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchScholarships } from "../../redux/reducers/getAllscholarships";
import Title from "../../atoms/Layout/Title";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";

export interface IData {
  name: string;
  country: string;
  region: string;
  type: string;
  degree: string;
  description: string;
  deadline: string;
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
    return item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  });

  return (
    <Layout>
      <Title text="Ümumi təqaüdlərin sayı: " dat={scholarships?.length} />

      <SearchQuestions query={query} changeValue={changeInpvalues} />

      <div className="grid grid-cols-3  w-full gap-4">
        {filteredData?.map((item: IData) => {
          return (
            <div className="col-span-1 flex flex-col mb-4 px-8 py-4  bg-white rounded">
              <span className="mb-4 block">{item.name.slice(0, 20)}</span>
              <span className="mb-4 block">{item.country}</span>
              <span className="mb-4 block">{item.region}</span>
              <span className="mb-4 block">{item.degree}</span>
              <span className="mb-4 block">{item.type}</span>
              <span className="mb-4 block">{item.description}</span>
              <span className="mb-4 block">{item.deadline}</span>
              <div className="flex gap-4">
                <button className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2">
                  Sil
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
        {data !== null && (
          <div className="flex w-full h-screen absolute top-0 left-0 z-10 bg-[#DADADA] items-center justify-center">
            <div className="col-span-1 flex flex-col mb-4 px-8 py-4  bg-white rounded">
              <span className="mb-4 block">{data.name}</span>
              <span className="mb-4 block">{data.country}</span>
              <span className="mb-4 block">{data.region}</span>
              <span className="mb-4 block">{data.degree}</span>
              <span className="mb-4 block">{data.type}</span>
              <span className="mb-4 block">{data.description}</span>
              <span className="mb-4 block">{data.deadline}</span>
              <div className="flex gap-4">
                <button className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2">
                  Sil
                </button>
                <button
                  className=" bg-[#0F0916] text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                  onClick={() => setData(null)}
                >
                  Bağla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Scholarships;
