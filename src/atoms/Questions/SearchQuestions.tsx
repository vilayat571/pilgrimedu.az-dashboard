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
        className="mb-6 h-14 px-2 py-2 rounded-md text-[#000000] 
       placeholder:text-[#000000] indent-3 border-[1px]
        border-[#E3E3E3] w-1/2 outline-none focus:outline-none   "
      />
    </form>
  );
}

export default SearchQuestions;
