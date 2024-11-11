import React from "react";
import NotResut from "../Layout/NotResut";
import { IITEM } from "../../redux/reducers/fetchBlogs";

const FilteredBlogs: React.FC<{
  loading: boolean;
  filteredBlogs: IITEM[] | undefined;
  handleDelete: (id: string | undefined) => void;
  showData: (data: IITEM) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ filteredBlogs, handleDelete, showData, setQuery }) => {
  return (
    <>
      <div className="grid grid-cols-3 w-full gap-4">
        {filteredBlogs != undefined && filteredBlogs?.length > 0 ? (
          filteredBlogs?.map((item: IITEM) => {
            return (
              <div
                key={item._id}
                className="col-span-1 bg-white pb-6 rounded flex flex-col mb-4"
              >
                <img
                  className="h-60 object-cover rounded-t rounded-b-none"
                  src={`https://pilgrimedu.az/medias/${item?.thumbnail}`}
                  alt={`the image of ${item.title}`}
                />
                <div className="px-3 flex flex-col">
                  <p className="text-lg text-black flex gap-4 mt-5 my-3">
                    {item.title}
                  </p>
                      <p
                    dangerouslySetInnerHTML={{ __html: item.body || "" }}
                    className="text-lg font-semibold mt-3 mb-3 line-clamp-3"
                  /> 
                  <div className="flex flex-row gap-2 mt-1">
                    <button
                      className="text-base rounded-[3px]
                        hover:bg-[#210442] hover:text-white transition duration-200 hover:border-[#210442]
                        border-[1px] border-[#b3b3b3]
                       px-6 py-3"
                      onClick={() => handleDelete(item._id)}
                    >
                      Bloqu sil
                    </button>

                    <button
                      onClick={() => showData(item)}
                      className="text-base rounded-[3px]
                        hover:bg-green-600 hover:text-white transition duration-200 hover:border-green-600
                        border-[1px] border-[#b3b3b3]
                       px-6 py-3"
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
    </>
  );
};

export default FilteredBlogs;
