import { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchScholarships } from "../../redux/reducers/getAllscholarships";
import Title from "../../atoms/Layout/Title";

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
  const data = useAppSelector((state) => state.getAllscholarships.data);
  const dispacth = useAppDispatch();

  useEffect(() => {
    dispacth(fetchScholarships());
  }, []);

  console.log(data);

  return (
    <Layout>
      <Title text="Ümumi təqaüdlərin sayı: " dat={data?.count} />

      <div className="grid grid-cols-3 border w-full gap-4">
        {data?.scholarships?.map((item: IData) => {
          return (
            <div className="col-span-1 flex flex-col mb-4 px-8 py-4 border">
              <span className="mb-4 block">{item.name.slice(0, 20)}</span>
              <span className="mb-4 block">{item.country}</span>
              <span className="mb-4 block">{item.region}</span>
              <span className="mb-4 block">{item.country}</span>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Scholarships;
