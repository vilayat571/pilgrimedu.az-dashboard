import { Link, useNavigate } from "react-router-dom";
import { hrefs, Route } from "../../constants/navHrefs";
import Logo from "../../atoms/Layout/Logo";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    const question = confirm("Sistemi bağlamaq istəyirsiniz?");
    if (question) {
      localStorage.clear();
    }
    toast("Sistemdən çıxdınız!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      style: {
        backgroundColor: "green",
        color: "white",
        top: "20px",
        fontFamily: "Oceanwide",
      },
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="bg-[#0F0916] text-white w-1/4 px-6 pt-16 h-screen flex-col items-start">
      <ToastContainer />
      <Logo />

      <div
        id="routes"
        className="ml-4 flex flex-col gap-y-1 text-lg pl-2 text mt-5"
      >
        {hrefs.map((item: Route, index: number) => {
          return (
            <Link to={item.href} key={item.id} className="flex items-center ">
              <span
                className=" px-2 py-2 rounded
              hover:bg-white hover:text-black transition duration-300"
              >
                {index + 1}. {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-8 left-8 ">
        <button
          onClick={() => logOut()}
          className="text-black bg-white px-5 py-3 rounded"
        >
          Sistemi bağla
        </button>
      </div>
    </div>
  );
};

export default Navbar;
