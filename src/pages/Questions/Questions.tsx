import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getQuestion } from "../../redux/reducers/fetchQuestions";
import { FaTrash } from "react-icons/fa";
import { rmvQuestion } from "../../redux/reducers/removeItem";
import Thead from "../../components/Questions/Table/Thead";
import { countOfQuestions } from "../../redux/reducers/questionsCount";
import TitleOfQuestions from "../../atoms/Questions/TitleOfQuestions";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";

function Questions() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.fetchQuestions.questions);

  useEffect(() => {
    dispatch(getQuestion());
    dispatch(countOfQuestions());
  }, []);

  const deleteQuestion = (id: string) => {
    const answer = confirm("Bu sualı silmək istəyirsiniz?");

    if (answer) {
      dispatch(rmvQuestion({ id })).then(() => {
        dispatch(getQuestion());
        dispatch(countOfQuestions());
      });
    }
  };

  const [query, setQuery] = useState<string>("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredData = questions?.filter((item) => {
    return item.username
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  return (
    <Layout>
      <TitleOfQuestions />

      <SearchQuestions query={query} changeValue={changeInpvalues} />

      <table>
        <Thead />

        <tbody>
          {filteredData?.map((item) => {
            return (
              <tr
                key={item._id}
                className="border cursor-pointer bg-white text-center"
              >
                <td className="flex items-center py-2 px-2">
                  <span>{item.username.slice(0, 15)}..</span>
                  <FaTrash
                    onClick={() => deleteQuestion(item._id)}
                    className="text-red-600 cursor-pointer  relative left-2"
                  />
                </td>
                <td className="py-2">{item.email.slice(0, 10)}..</td>
                <td className="py-2">{item.phone.slice(0, 10)}..</td>
                <td className="py-2">{item.question.slice(0, 10)}..</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <button className="px-6 py-2 border rounded">İrəli</button>
      </div>
    </Layout>
  );
}

export default Questions;
// pagination, searching, showing 