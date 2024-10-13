import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import Title from "../../atoms/Layout/Title";
import FilteredBlogs from "../../atoms/Blogs/FilteredBlogs";
import { TQuestions } from "../../types/QuestionsType";
import PopupBlogs from "../../atoms/Blogs/PopupBlogs";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getBlogs, IITEM } from "../../redux/reducers/fetchBlogs";
import { toast, ToastContainer } from "react-toastify";

function Allblogs() {
  const dispatch = useAppDispatch();

  const [blogs, setBlogs] = useState<IITEM[] | null>(null);

  const loading = useAppSelector((state) => state.fetchBlogs.loading);

  useEffect(() => {
    dispatch(getBlogs()).then((data) => setBlogs(data.payload.blogs));
  }, [dispatch]);

  const handleDelete = async (id: string | undefined) => {
    const url = `http://localhost:3001/api/v1/blogs/delete/${id}`;
    await fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        data.status == "OK" && setBlogs(data.blogs);
        toast(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: data.status == "OK" ? "green" : "red",
            color: "white",
            fontFamily: "Oceanwide",
          },
        });
      });
  };

  const [popup, setPopup] = useState<IITEM | null>(null);
  const [query, setQuery] = useState<TQuestions<string>>("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredBlogs = blogs?.filter((blog) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  });

  const showData = (data: IITEM) => {
    setPopup(data);
  };

  return (
    <Layout>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
          <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">Məlumatlar yüklənir..</p>
        </div>
      ) : (
        <>
          <ToastContainer />
          <div className="mt-8">
            <Title text="bloq" count={blogs?.length} />
            <SearchQuestions query={query} changeValue={changeInpvalues} />
          </div>

          <PopupBlogs setBlogs={setBlogs} popup={popup} setPopup={setPopup} />

          <FilteredBlogs
            filteredBlogs={filteredBlogs}
            showData={showData}
            handleDelete={handleDelete}
            loading={loading}
            setQuery={setQuery}
          />
        </>
      )}
    </Layout>
  );
}

export default Allblogs;
