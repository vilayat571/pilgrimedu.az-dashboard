import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import UserDelete from "../../atoms/Users/UserDelete";
import Seehole from "../../atoms/Users/Seehole";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getUsers, IUSERS } from "../../redux/reducers/fetchUsers";
import SearchQuestions from "../../atoms/Questions/SearchQuestions";
import { ToastContainer } from "react-toastify";
import Title from "../../atoms/Layout/Title";

const AllUsers = () => {
  const [users, setAllUsers] = useState<IUSERS[] | null>(null);
  const loading = useAppSelector((state) => state.fetchUsers.loading);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState("");

  const changeInpvalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(getUsers()).then((res) => setAllUsers(res.payload.users));
  }, [setAllUsers, dispatch]);

  const filteredUsers = users?.filter((user) => {
    return (user.username + user.email)
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  return (
    <Layout>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center text-3xl text-center">
          <p className="relative bottom-20 bg-[#210442] px-5 py-3 rounded text-white">
            Məlumatlar yüklənir..
          </p>
        </div>
      ) : (
        <>
          <div className="pt-0">
            
            <Title text="istifadəçi" count={users?.length} />

            <ToastContainer />

            <SearchQuestions query={query} changeValue={changeInpvalues} />
            <div className="mt-0 flex gap-4 flex-col">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers?.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className={` bg-white
              py-4 px-3 border-[#a3a3a3]  rounded flex flex-row items-center justify-between `}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-10 h-10 flex items-center justify-center text-white rounded-full mr-3`}
                          style={{ backgroundColor: "#210442" }}
                        >
                          {user.username.slice(0, 1)}
                        </span>
                        <span>{user.username.slice(0, 6)}..</span>
                        <span className=" text-[#2c2c2c] text-sm ml-3">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <UserDelete
                          setQuery={setQuery}
                          id={user._id}
                          setAllUsers={setAllUsers}
                        />
                        <Seehole
                          setQuery={setQuery}
                          setAllUsers={setAllUsers}
                          user={user}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-start gap-y-3 px-2">
                  <p className="text-3xl">
                    Təəssüf ki, axtarışa uyğun <br /> istifadəçi tapılmadı.
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="text-base rounded-[3px] bg-white text-black
                hover:bg-red-600 hover:text-white transition duration-200
               px-5 py-3"
                  >
                    Yenidən axtar
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AllUsers;
