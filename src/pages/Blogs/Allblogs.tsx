import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import Title from "../../atoms/Layout/Title";
import FilteredBlogs from "../../atoms/Blogs/FilteredBlogs";
import { TQuestions } from "../../types/QuestionsType";
import PopupBlogs from "../../atoms/Blogs/PopupBlogs";

export interface IITEM {
  _id: string;
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  body?: string | undefined | null;
}

function Allblogs() {
  const [blogs, setBlogs] = useState<IITEM[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, [setBlogs]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    const url = `http://localhost:3001/api/v1/blogs/delete/${id}`;
    await fetch(url, {
      method: "DELETE",
    })
      .then(() => {
        fetch(`http://localhost:3001/api/v1/blogs`)
          .then((res) => res.json())
          .then((data) => setBlogs(data.blogs));
      })
      .then(() => setLoading(false));
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

  const mappedPopup = new Map();
  mappedPopup.set("popupData", [
    popup?.author,
    popup?.body,
    popup?.thumbnail,
    popup?.title,
  ]);

  return (
    <Layout>
      <div className="mt-8">
        <Title text="Ümumi bloq sayı: " dat={blogs?.length} />
        <SearchQuestions query={query} changeValue={changeInpvalues} />
      </div>

      <PopupBlogs popup={popup} setPopup={setPopup} />

      <FilteredBlogs
        filteredBlogs={filteredBlogs}
        showData={showData}
        handleDelete={handleDelete}
        loading={loading}
        setQuery={setQuery}
      />
    </Layout>
  );
}

export default Allblogs;
