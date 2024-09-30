import React from "react";
import { IUSERS } from "../../pages/Users/AllUsers";

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
      .then((data) => setAllUsers(data.users));
  };

  return (
    <>
      <button
        onClick={() => deleteUser()}
        className="px-5 py-2 rounded bg-red-600 text-white"
      >
        sil
      </button>
    </>
  );
};

export default UserDelete;
