import { Link } from "react-router-dom";
import logo from "../../assets/images/pilgrim_logo.png";
import { MdOutlineQuestionAnswer } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="bg-[#0F0916] text-white w-1/4 px-12 py-12 h-screen flex-col items-start">
      <Link to={"/"}>
        <img
          src={logo}
          alt="The logo of Pilgrim MMC"
          className="w-40 h-20 object-cover mb-12 "
        />
      </Link>

      <div id="routes" className="ml-4 text-lg ">
        <Link to={"/suallar"} className="flex items-center">
          <MdOutlineQuestionAnswer />

          <span className="ml-1">Suallar</span>
        </Link>
      </div>

      
    </div>
  );
};

export default Navbar;
