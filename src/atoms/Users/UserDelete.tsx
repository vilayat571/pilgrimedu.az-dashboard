import React from "react";
import { IUSERS } from "../../redux/reducers/fetchUsers";
import useAlert from "../../hooks/useAlert";

const UserDelete: React.FC<{
  id: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setAllUsers: React.Dispatch<React.SetStateAction<IUSERS[] | null>>;
}> = ({ id, setAllUsers, setQuery }) => {
  const { message, setMessage } = useAlert("");

  const deleteUser = () => {
    const url = `http://localhost:3001/api/v1/users/delete/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuery("");

        if (data.status === "OK") {
          setAllUsers(data.users);
          setMessage("İstifadəçi silinmişdir!");
        } else {
          setMessage("Xəta baş verdi!");
        }
      })
  };

  return (
    <>
      {message.length > 0 && (
        <div
          className={`
  absolute top-6 right-6 tracking-wider ${
    !message.toLowerCase().includes("xəta") ? "bg-red-600 " : "bg-green-600"
  } text-white px-5 py-3 rounded
  `}
        >
          {message}
        </div>
      )}
      <button
        onClick={() => deleteUser()}
        className="text-base rounded-[3px]
        hover:bg-red-600 hover:text-white transition duration-200 hover:border-red-600
        border-[1px] border-[#b3b3b3]
       px-5 py-3"
      >
        İstifadəçini sil
      </button>
    </>
  );
};

export default UserDelete;
