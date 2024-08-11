import CountsOfParts from "./CountsOfParts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchScholarships } from "../../redux/reducers/getAllscholarships";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const GridOfDemocrafis = () => {
  const dispacth = useAppDispatch();

  useEffect(() => {
    dispacth(fetchScholarships());
  }, []);

  const countOfScholarships = useAppSelector(
    (state) => state?.getAllscholarships.scholarships
  );

  console.log(countOfScholarships)
  return (
    <div className="grid grid-cols-2 gap-4">
      <CountsOfParts
        text="Saytda mövcud olan toplam təqaüd proqramı sayı!"
        count={countOfScholarships?.length}
        icon={faAward}
      />
    </div>
  );
};

export default GridOfDemocrafis;
