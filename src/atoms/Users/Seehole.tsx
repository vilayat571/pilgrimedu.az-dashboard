import React, { useState } from "react";
import { degrees, services, statuses } from "../../constants/formDetails";
import { IUSERS } from "../../redux/reducers/fetchUsers";

const Seehole: React.FC<{ user: IUSERS }> = ({ user }) => {
  const [data, setData] = useState<IUSERS | null>(null);
  const [caseEdit, setCaseEdit] = useState<boolean>(false);

  const handleSeeHole = () => {
    setData(user);
    setDetails({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };

  const [details, setDetails] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const editDetails = (caseStatus: boolean) => {
    setCaseEdit(caseStatus);
    if (!caseStatus) {
      // Save the edited details back to the data state
      setData({
        ...data,
        username: details.username,
        email: details.email,
        phone: details.phone,
      } as IUSERS);
    }
  };


  const sendData=()=>{
    const url = `https://pilgrimbackend.onrender.com/api/v1/users/edit/${user._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.assign({}, formOptions, details)),
    })
      .then((res) => res.json())
      .then((data) => console.log("result", data));
      editDetails(!caseEdit)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const [formOptions, setFormOptions] = useState({
    degree: user.degree,
    service: user.service,
    status: "Cari vəziyyət",
  });

  const allStatuses = [...statuses]; // Create a copy of the original array
  allStatuses.push({ id: 99, name: `Cari vəziyyət ${user.status}` });

  const chooseOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormOptions({ ...formOptions, [e.target.id]: e.target.value });
  };

  return (
    <>
      {data != null && (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center h-screen bg-white">
          <div className="w-1/2 border-[1px] border-[#b0b0b0] rounded flex-col gap-y-5 flex px-8 py-8">
            {caseEdit ? (
              <form 
              onChange={(e)=>handleChange(e)}
              className="flex flex-col bg-white gap-y-2">
                <input
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="username"
                  autoFocus={true}
                  value={details.username} // Bound to `details`
                  type="text"
                />
                <input
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="email"
                  value={details.email} // Bound to `details`
                  type="text"
                />
                <input
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="phone"
                  value={details.phone} // Bound to `details`
                  type="text"
                />

                <select
                  value={formOptions.degree}
                  onChange={(e) => chooseOption(e)}
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="degree"
                >
                  <option key={"1131"} value={user.degree}>
                    Cari təhsil səviyyəsi : {user.degree}
                  </option>
                  {degrees.map((degree) => {
                    return (
                      <option key={degree.id} value={degree.name}>
                        {degree.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={formOptions.service}
                  onChange={(e) => chooseOption(e)}
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="service"
                >
                  <option key={"111"} value={user.service}>
                    Cari xidmət : {user.service}
                  </option>
                  {services.map((service) => {
                    return (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={formOptions.status}
                  onChange={(e) => chooseOption(e)}
                  className="px-4 py-5 border-[1px] border-[#bfbfbf] outline-none  rounded w-full"
                  id="status"
                >
                  {allStatuses.map((status) => {
                    return (
                      <option key={status.id} value={status.name}>
                        {status.name}
                      </option>
                    );
                  })}
                </select>
              </form>
            ) : (
              <>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  İstifadəçi : {data?.username}
                </span>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  E-poçt : {data?.email}
                </span>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  Əlaqə nömrəsi : {data?.phone}
                </span>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  Təhsil səviyyəsi : {data?.degree}
                </span>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  Göstərilən xidmət : {data?.service}
                </span>
                <span className="px-4 py-5 border-[1px] border-[#fff] outline-none  rounded w-full bg-white">
                  Cari vəziyyət : {data?.status}
                </span>
              </>
            )}
            <div className="mt-1">
              <button
                onClick={() => setData(null)}
                className="text-base rounded-[3px]
                hover:bg-red-600 hover:text-white transition duration-200 hover:border-red-600
                border-[1px] border-[#b3b3b3]
               px-5 py-3"              >
                Bağla
              </button>
              {caseEdit && (
                <button
                  onClick={() => editDetails(!caseEdit)}
                  className="bg-[#210442] text-white text-nowrap px-4 py-3 w-auto ml-3 rounded"
                >
                  Geri dön
                </button>
              )}

              {!caseEdit ? (
                <button
                  onClick={() => editDetails(!caseEdit)}
                  className="bg-green-500 text-white text-nowrap px-4 py-3 w-auto ml-3 rounded"
                >
                  Düzəliş et
                </button>
              ) : (
                <button
                  onClick={() => sendData()}
                  className="bg-green-500 text-white text-nowrap px-4 py-3 w-auto ml-3 rounded"
                >
                  Göndər
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleSeeHole}
        className="text-base rounded-[3px]
        hover:bg-[#210442] hover:text-white transition duration-200 hover:border-[#210442]
        border-[1px] border-[#b3b3b3]
       px-5 py-3"      >
        Tam bax
      </button>
    </>
  );
};

export default Seehole;
