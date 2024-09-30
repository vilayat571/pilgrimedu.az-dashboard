import { Link } from "react-router-dom";
import logo from "../../assets/images/pilgrim_logo.png";
import { hrefs, Route } from "../../constants/navHrefs";

const Navbar = () => {
  return (
    <div className="bg-[#0F0916] text-white w-1/4 px-6 pt-16 h-screen flex-col items-start">
      <Link to={"/"}>
        <img src={logo} alt="The logo of Pilgrim MMC" className="mb-4 w-52" />
      </Link>

      <div
        id="routes"
        className="ml-4 flex flex-col gap-y-1 text-lg pl-2 text mt-5"
      >
        {hrefs.map((item: Route) => {
          return (
            <Link to={item.href} key={item.id} className="flex items-center ">
              <span
                className=" px-2 py-2 rounded
              hover:bg-white hover:text-black transition duration-300"
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
