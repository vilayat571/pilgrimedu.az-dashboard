import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

function Allblogs() {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs));
  }, []);

  console.log('blogs',blogs);
  return (
    <Layout>
      <div className="grid grid-cols-3 border w-full gap-4">
        {blogs!=null && blogs?.map((item) => {
          return (
            <div
              className="col-span-1 flex flex-col mb-4 px-8 py-4 border"
              dangerouslySetInnerHTML={{__html: item.body}}
            />
          );
        })} 
      </div>
    </Layout>
  );
}

export default Allblogs;
