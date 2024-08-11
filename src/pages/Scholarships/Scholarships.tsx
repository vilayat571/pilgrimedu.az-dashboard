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
  const scholarships: IData[] | null = useAppSelector(
    (state) => state.getAllscholarships.scholarships
  );
  const dispacth = useAppDispatch();

  useEffect(() => {
    dispacth(fetchScholarships());
  }, []);

  return (
    <Layout>
      <Title text="Ümumi təqaüdlərin sayı: " dat={scholarships?.length} />

      <div className="grid grid-cols-3 border w-full gap-4">
        {scholarships?.map((item: IData) => {
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
