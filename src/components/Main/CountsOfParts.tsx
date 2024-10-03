import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface ICounts {
  text: string;
  icon: IconProp;
  count: number | undefined | null;
  path: string;
}

const CountsOfParts: React.FC<ICounts> = ({ text, count, icon, path }) => {
  return (
    <div className=" bg-white hover:bg-[#0F0916] flex flex-col cursor-pointer transition duration-300 rounded-lg w-5/6 h-auto group justify-between px-10 py-8">
      <div className="w-full  flex flex-row justify-between">
        <p className="text-8xl text-left group-hover:text-white text-black">{count}</p>

        <FontAwesomeIcon icon={icon} className="text-7xl text-[#0F0916] group-hover:text-white" />
      </div>

      <span className="text-2xl mt-4 text-[#0F0916] group-hover:text-white font-semibold">{text}</span>

      <div className="mt-4">
        <Link
          to={path}
          className="text-base px-6 py-3  rounded bg-[#0F0916] group-hover:bg-white group-hover:text-black text-white font-semibold"
        >
          Tam məlumatlara keçid
        </Link>
      </div>
    </div>
  );
};

export default CountsOfParts;
