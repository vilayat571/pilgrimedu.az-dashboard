import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICounts {
  text: string;
  icon: IconProp;
  count: number | undefined;
}

const CountsOfParts: React.FC<ICounts> = ({ text, count, icon }) => {
  return (
    <div className=" bg-white flex flex-col rounded-lg w-full h-56 justify-between px-10 py-10">
      <div className="w-full  flex flex-row justify-between">
        <p className="text-8xl text-left">{count}</p>

        <FontAwesomeIcon icon={icon} className="text-7xl text-[#0F0916]" />
      </div>

      <span className="text-base text-[#0F0916] font-semibold">{text}</span>
    </div>
  );
};

export default CountsOfParts;
