import { useAppSelector } from "../../redux/store/store";
import Title from "../Layout/Title";

function TitleOfQuestions() {
  const count = useAppSelector((state) => state.questionsCount.count);

  return count!=0 && <Title text="Ümumi sualların sayı: " dat={count} />;
}

export default TitleOfQuestions;
