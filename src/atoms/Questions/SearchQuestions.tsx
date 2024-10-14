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
        onChange={changeValue}
        placeholder="Açar söz daxil edin..."
        id="username"
        value={query}
        className="mb-6 h-1 px-2 py-[36px] rounded-l text-[#000000] 
       placeholder:text-[#000] indent-3 border-[1px]
        border-[#cfcfcf] w-2/3 outline-none focus:outline-none   "
      />
      <button className="bg-[#000] text-white px-8 py-6 rounded-r">
        <FontAwesomeIcon className="text-lg" icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchQuestions;
