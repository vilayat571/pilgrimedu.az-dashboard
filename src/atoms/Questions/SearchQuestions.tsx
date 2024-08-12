import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ISearchQuestions{
    query:string,
    changeValue:(e: React.ChangeEvent<HTMLInputElement>) => void
}


const SearchQuestions:React.FC<ISearchQuestions>=({query, changeValue})=> {
  return (
    <form autoComplete="off">
      <input
        type="search"
        onChange={(e) => changeValue(e)}
        placeholder="Ad daxil edin..."
        id="username"
        value={query}
        className="mb-6 h-1 px-2 py-[28px] rounded-l text-[#000000] 
       placeholder:text-[#505050] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
      />
      <button className="bg-[#000] text-white px-6 py-4 rounded-r">
        <FontAwesomeIcon className="text-base" icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchQuestions;
