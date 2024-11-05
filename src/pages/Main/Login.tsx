import React, { useEffect, useState } from "react";
import bgCover from "../../assets/images/bgCover.png";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../atoms/Layout/Logo";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ILoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Get the token from localStorage without JSON.parse()
  const token = localStorage.getItem("token");

  useEffect(() => {
    // If token exists, navigate to /statistika
    if (token) {
      navigate("/statistika");
    }
  }, [navigate, token]);

  const handleLogin = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Input validation with toast notifications
    if (loginForm.username.length < 7) {
      toast("İstifadəçi adı ən azı 8 simvoldan ibarət olmalıdır.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "red",
          color: "white",
          fontFamily: "Poppins",
        },
      });
    } else if (loginForm.password.length < 7) {
      toast("Şifrə ən azı 8 simvoldan ibarət olmalıdır.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "red",
          color: "white",
          fontFamily: "Poppins",
        },
      });
    } else {
      try {
        // Send login data to server
        const url = "https://pilgrimedu.az/api/v1/admin";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(loginForm),
        });
        const data = await response.json();

        // Handle response
        if (data.status === "OK") {
          toast(data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            style: {
              backgroundColor: "green",
              color: "white",
              fontFamily: "Oceanwide",
            },
          });

          // Save token to localStorage as a string
          localStorage.setItem("token", data.token);

          // Redirect to /statistika after 1 second
          setTimeout(() => {
            navigate("/statistika");
          }, 2000);
        } else {
          toast(data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            style: {
              backgroundColor: "red",
              color: "white",
              fontFamily: "Oceanwide",
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };

  // Password visibility toggle
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  return (
    <div
      id="formDiv"
      className="flex justify-center items-center bg-[#16022C] w-full h-screen"
    >
      <ToastContainer />
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
        <img
          src={bgCover}
          alt="The cover image of Login page of Pilgrim MMC"
          className="object-cover relative right-12"
        />
      </div>
      <div className="flex flex-col items-center w-full">
        <Logo />
        <form
          autoComplete="off"
          onSubmit={(e) => handleLogin(e)}
          onChange={(e) => handleChange(e)}
          className="lg:w-2/5 z-10 xl:w-1/3 md:w-7/10 sm:w-11/12 flex flex-col items-center mt-6"
        >
          <input
            id="username"
            value={loginForm.username}
            className="h-16 border-[#aca4a4] w-full px-2 py-2 block bg-white text-black rounded 
             placeholder:text-[#343434] indent-3 tracking-wide outline-none focus:outline-none"
            placeholder="Sistem adı"
            required={true}
            type="text" // Change to "text" instead of "username"
          />
          <input
            id="password"
            value={loginForm.password}
            className="h-16 border-[#aca4a4] w-full px-2 py-2 block bg-white text-black rounded 
             placeholder:text-[#000] indent-3 tracking-wide outline-none focus:outline-none mt-6"
            placeholder="Sistem şifrəsi"
            required={true}
            type={isVisiblePassword ? "text" : "password"}
          />
          <p className="text-white w-full mt-4 z-10 text-base flex text-left">
            <input
              type="checkbox"
              className="mr-3"
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            />
            Şifrəni göstər
          </p>
          <div className="flex flex-col items-center gap-2 tracking-wider">
            <button className="bg-[#fff] text-black rounded w-auto text-center px-6 mt-7 py-3">
              Sistemə gir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
