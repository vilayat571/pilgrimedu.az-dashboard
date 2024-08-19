import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getQuestion } from "../../redux/reducers/fetchQuestions";
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

  const loading: boolean = useAppSelector(
    (state) => state.fetchQuestions.loading
  );

  const [text, setText] = useState<string>("");

  const deleteQuestion = (id: string) => {
    const answer = confirm("Bu sualı silmək istəyirsiniz?");

    if (answer) {
      dispatch(rmvQuestion({ id }))
        .then(() => {
          dispatch(getQuestion());
          dispatch(countOfQuestions());
        })
        .then(() => setText("Sual silindi!"))
        .then(() => {
          setTimeout(() => {
            setText("");
          }, 2000);
        }).then(()=>setData(null))
    }
  };

  const [query, setQuery] = useState<string>("");


  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredData = questions?.filter((item) => {
    return item.username
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  const [data, setData] = useState<null | {
    email: string;
    username: string;
    phone: string;
    date: string;
    question: string;
    _id: string;
  }>(null);


  return (
    <>
      {loading ? (
        <div
          className="bg-[#DADADA] w-full h-screen text-center 
        flex justify-center items-center"
        >
          <p className="text-4xl text-black">Yüklənir</p>
        </div>
      ) : (
        <Layout>
          {questions?.length == 0 && "Sual mövcud deyil!"}
          {questions?.length && (
            <>
              <TitleOfQuestions />
              <div className="absolute right-12 top-12 text-lg">{text}</div>
              <SearchQuestions query={query} changeValue={changeInpvalues} />

              <table>
                <Thead />
                {data !== null && (
                  <div
                    className="w-full h-screen bg-[#DADADA] z-10 absolute top-0 left-0
                  flex justify-center items-center"
                  >
                    <div className=" cursor-pointer bg-white text-left flex gap-y-2 p-8 rounded-md flex-col">
                      <span className="text-xl">{data.username}</span>

                      <span className="text-xl">{data.email}</span>

                      <span className="text-xl">{data.phone}</span>

                      <span className="text-xl">{data.question}</span>

                      <div className="flex gap-4 mt-3">
                        <button
                          onClick={() => deleteQuestion(data._id)}
                          className="bg-red-600 text-white tracking-widest py-3 w-24 rounded text-sm mt-2"
                        >
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
                <tbody>
                  {filteredData?.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className=" border cursor-pointer bg-white text-center px-8 py-4"
                      >
                        <td className=" cursor-pointer flex items-center px-2 pl-6 py-4 ">
                          {item.username}
                        </td>
                        <td className="px-2 py-2  tracking-wider ">
                          <button
                            onClick={() => deleteQuestion(item._id)}
                            className="bg-red-600 text-white cursor-pointer mx-1 px-3 py-2 rounded-sm"
                          >
                            Sil
                          </button>
                          <button
                            onClick={() => setData(item)}
                            className="bg-green-600 text-white cursor-pointer mx-1 px-3 py-2 rounded-sm"
                          >
                            Bax
                          </button>
                        </td>
                        <td className="px-2 py-2">
                          {item.email.slice(0, 10)}..
                        </td>
                        <td className="px-2 py-2">
                          {item.phone.slice(0, 10)}..
                        </td>
                        <td className="px-2 py-2">
                          {item.question.slice(0, 10)}..
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Layout>
      )}
    </>
  );
}

export default Questions;
