import React from "react";
import { IUSERS } from "../../redux/reducers/fetchUsers";
import { toast, ToastContainer } from "react-toastify";

const UserDelete: React.FC<{
  id: string;
  setAllUsers: React.Dispatch<React.SetStateAction<IUSERS[] | null>>;
}> = ({ id, setAllUsers }) => {
  const deleteUser = () => {
    const url = `http://localhost:3001/api/v1/users/delete/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data.users),
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

  return (
    <>
      <ToastContainer />
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
