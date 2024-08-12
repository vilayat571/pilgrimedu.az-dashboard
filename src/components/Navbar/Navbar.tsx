import { Link } from "react-router-dom";
import logo from "../../assets/images/pilgrim_logo.png";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { SiGooglescholar, SiSemanticscholar } from "react-icons/si";


const Navbar = () => {
  return (
    <div className="bg-[#0F0916] text-white w-1/4 px-6 pt-4 h-screen flex-col items-start">
      <Link to={"/"}>
        <img
          src={logo}
          alt="The logo of Pilgrim MMC"
          className=" mb-8 "
        />
      </Link>

      <div id="routes" className="ml-4 text ">
        <Link to={"/"} className="flex items-center">
          <MdOutlineQuestionAnswer />

          <span className="mx-1">Ana səhifə</span>
        </Link>
      </div>

      <div id="routes" className="ml-4 text mt-3">
        <Link to={"/suallar"} className="flex items-center">
          <MdOutlineQuestionAnswer />

          <span className="mx-1">Suallar +</span>
        </Link>
      </div>

      <div id="routes" className="ml-4 mt-3 text">
        <Link to={"/teqaudler"} className="flex items-center">
          <SiGooglescholar />

          <span className="mx-1 ">Təqaüdlər</span>
        </Link>
      </div>

      <div id="routes" className="ml-4 mt-3 text">
        <Link to={"/bloqlar"} className="flex items-center">
          <SiGooglescholar />

          <span className="mx-1 ">Bloqlar</span>
        </Link>
      </div>

      
      <div id="routes" className="ml-4 mt-3 text">
        <Link to={"/teqaudler"} className="flex items-center">
          <SiGooglescholar />

          <span className="mx-1 ">İstifadəçilər</span>
        </Link>
      </div>

      <div id="routes" className="ml-4 mt-3 text">
        <Link to={"/teqaudelaveet"} className="flex items-center">
          <SiSemanticscholar />

          <span className="mx-1 ">Təqaüd əlavə et</span>
        </Link>
      </div>

      <div id="routes" className="ml-4 mt-3 text">
        <Link to={"/bloqelaveet"} className="flex items-center">
          <SiSemanticscholar />

          <span className="mx-1 ">Bloq əlavə et</span>
        </Link>
      </div>


    </div>
  );
};

export default Navbar;
