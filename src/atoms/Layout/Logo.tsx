import { Link } from "react-router-dom";
import logo from "../../assets/images/pilgrim_logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={logo} alt="The logo of Pilgrim MMC" className="mb-4 w-52" />
    </Link>
  );
};

export default Logo;
