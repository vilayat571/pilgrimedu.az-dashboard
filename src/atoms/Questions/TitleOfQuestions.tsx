import { useAppSelector } from "../../redux/store/store";
import Title from "../Layout/Title";

function TitleOfQuestions() {
  const count = useAppSelector((state) => state.questionsCount.count);

  return <Title text="Ümumi sualların sayı: " dat={count} />;
}

export default TitleOfQuestions;
