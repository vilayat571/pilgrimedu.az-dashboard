import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getQuestion } from "../../redux/reducers/fetchQuestions";
import { rmvQuestion } from "../../redux/reducers/removeItem";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import Popupquestions from "../../atoms/Questions/Popupquestions";
import { IQuestions, TQuestions } from "../../types/QuestionsType";
import NotfoundData from "../../atoms/Layout/NotfoundData";
import NotResut from "../../atoms/Layout/NotResut";
import Title from "../../atoms/Layout/Title";

function Questions() {
  const dispatch = useAppDispatch();
  const questions: IQuestions[] | null = useAppSelector(
    (state) => state.fetchQuestions.questions
  );

  const loading: boolean = useAppSelector(
    (state) => state.fetchQuestions.loading
  );

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const [text, setText] = useState<TQuestions<string>>("");
  const [query, setQuery] = useState<TQuestions<string>>("");

  const deleteQuestion = (id: TQuestions<string>, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const answer = confirm("Bu sualı silmək istəyirsiniz?");

    if (answer) {
      e.preventDefault()

      dispatch(rmvQuestion({ id }))
        .then(() => {
          dispatch(getQuestion());
        })
        .then(() => setText("Sual uğurla silinmişdir!"))
        .then(() => {
          setTimeout(() => {
            setText("");
          }, 2000);
        }) 
        .then(() => setData(null));
    }
  };

  const changeInpvalues = (
    e: TQuestions<React.ChangeEvent<HTMLInputElement>>
  ) => {
    setQuery(e.target.value);
  };

  const filteredData: IQuestions[] | undefined = questions?.filter((item) => {
    return item.username.toLowerCase().includes(query.toLowerCase());
  });

  const [data, setData] = useState<null | IQuestions>(null);

  return (
    <Layout>
      {loading ? (
     <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
     <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">Məlumatlar yüklənir..</p>
   </div>
      ) : (
        <>
          {questions?.length == 0 ? (
            <div className="w-full h-screen flex flex-col items-center justify-center">
              <NotfoundData text="Sual mövcud deyil!" path="/bloqlar" />
            </div>
          ) : (
            <>
          <Title text="istifadəçi sualı " count={questions?.length} />
          {text.length > 0 && (
                <div className="absolute right-12 top-12 text-lg bg-green-600 text-white px-5 py-3 rounded">
                  {text}
                </div>
              )}
              <SearchQuestions query={query} changeValue={changeInpvalues} />

              {data !== null && (
                <Popupquestions
                  setQuery={setQuery}
                  setData={setData}
                  data={data}
                />
              )}

              <div className="mt-0 flex gap-4 w-[74%]  flex-col">
                {filteredData && filteredData.length > 0 ? (
                  filteredData?.map(
                    (item: IQuestions, index: TQuestions<number>) => {
                      return (
                        <div
                          key={index}
                          className={` bg-white
              py-4 px-8 rounded flex flex-row items-center justify-between 
              }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-10 h-10 flex items-center justify-center text-white rounded-full mr-3`}
                              style={{ backgroundColor: "#210442" }}
                            >
                              {item.username.slice(0, 1)}
                            </span>
                            <span className="w-32">{item.username}</span>

                            <span className=" text-[#2c2c2c] text-sm ml-3">
                              {item.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => deleteQuestion(item._id, e)}
                              className="text-base rounded-[3px]
                  hover:bg-red-600 hover:text-white transition duration-200 hover:border-red-600
                  border-[1px] border-[#b3b3b3]
                 px-4 py-2"
                            >
                              Sualı sil
                            </button>
                            <button
                              onClick={() => setData(item)}
                              className="text-base rounded-[3px]
                  hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600
                  border-[1px] border-[#b3b3b3]
                 px-4 py-2"
                            >
                              Tam bax
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <NotResut
                    text="Təəssüf ki, axtarışa uyğun nəticə tapılmadı"
                    setQuery={setQuery}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
}

export default Questions;
