import React from "react";
import { IITEM } from "../../pages/Blogs/Allblogs";
import NotResut from "../Layout/NotResut";

const FilteredBlogs: React.FC<{
  loading: boolean;
  filteredBlogs: IITEM[] | undefined;
  handleDelete: (id:any) => void;
  showData: (data: IITEM) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ loading, filteredBlogs, handleDelete, showData, setQuery }) => {
  return (
    <>
      {loading ? (
        <div className="text-3xl">Element silinir..</div>
      ) : (
        <div className="grid grid-cols-3 w-full gap-4">
          {filteredBlogs != undefined && filteredBlogs?.length > 0 ? (
            filteredBlogs?.map((item: IITEM) => {
              return (
                <div
                  key={item._id}
                  className="col-span-1 bg-white pb-6 rounded flex flex-col mb-4"
                >
                  <img
                    className=" h-[200px] object-cover rounded-t rounded-b-none"
                    src={
                      item.thumbnail instanceof File
                        ? URL.createObjectURL(item.thumbnail)
                        : item.thumbnail || ""
                    }
                    alt={`the image of ${item.title}`}
                  />
                  <div className="px-3 flex flex-col">
                    <p className="text-[15px] text-black flex gap-4 mt-3"></p>
                    <p className="text-2xl font-semibold mt-3 mb-3 line-clamp-1">
                      {item.title}..
                    </p>
                    <div className="flex flex-row gap-4 mt-1">
                      <button
                        className="bg-[#e22626] w- tracking-wider px-5 py-3 text-white text-[15px] rounded "
                        onClick={() => handleDelete(item._id)}
                      >
                        Sil
                      </button>

                      <button
                        onClick={() => showData(item)}
                        className="bg-[#15a829]  text-center tracking-wider px-5 py-3 text-white text-[15px] rounded "
                      >
                        Tam bax
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NotResut
              text="Təssüf ki, axtarışa uyğun bloq tapılmadı!"
              setQuery={setQuery}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FilteredBlogs;
