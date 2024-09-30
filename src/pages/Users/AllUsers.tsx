import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import UserDelete from "../../atoms/Users/UserDelete";
import Seehole from "../../atoms/Users/Seehole";

export interface IUSERS {
  degree: string; // "Dokturantura"
  email: string; // "azar@gmail.com"
  password: string; // "$2a$10$IJbVk.kOdS3cx8aCPj/pjO4B24FooeyS10t.5T6ugfs1o3COrejvq"
  phone: string; // "0508908727"
  resetPasswordExpire: string; // "2024-09-23T11:20:56.491Z"
  resetPasswordToken: string; // "616928e50f6baa68edd8638e09e9efe42f9bc43fcec838c98e94c452667e80af"
  service: string; // "Xaricdə layihə"
  status: string; // "Qeydiyyatdan keçdi"
  username: string; // "azazazazaza"
  _id: string; // "66ebeec713f2cd35623c415a"
}

const AllUsers = () => {
  const [users, setAllUsers] = useState<IUSERS[] | null>(null);

  useEffect(() => {
    const url = "http://localhost:3001/api/v1/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllUsers(data.users));
  }, [setAllUsers]);

  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-4xl text-black mb-4">
          Ümumi istifadəçi sayı : {users && users.length}
        </h1>
        <div className="mt-10 flex flex-col">
          {users && users.length > 0 ? (
            users?.map((user, index) => {
              return (
                <div
                  className={`border-l-0 border-r-0 border-[1px] 
              py-4 px-3 border-[#a3a3a3] border-t flex flex-row items-center justify-between ${
                index == users.length - 1 ? "border-b" : "border-b-0"
              }`}
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
                    <UserDelete id={user._id} setAllUsers={setAllUsers} />
                    <Seehole user={user} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-3xl ">Yüklənir..</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
