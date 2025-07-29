import React, { useRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";
import { useOutsideClick } from "../../utils";

export const Search = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [filterMenu, setFilterMenu] = useState(false);
  //console.log(filterMenu, "fsda");

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numeric characters
    // if (/^\d*$/.test(value)) {
    setQuery(value);
    // }

    if (value.trim() === "") {
      const updatedParams = new URLSearchParams(location.search);
      updatedParams.delete("search");
      setSearchParams(updatedParams);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(location.search);
    if (query.trim() === "") return;
    if (query) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }
    setSearchParams(params);
    navigate({ search: params.toString() });
  };

  // const handleClearSearch = () => {
  //   // Clear input field
  //   // searchParams.delete("search"); // Remove the 'search' param
  //   // setSearchParams(searchParams); // Sync with URL
  //   if (searchParams.has('search')) {
  //     console.log("andar gaya")
  //     setSearchParams("search", "")
  //     console.log("necche bhi gaya ")
  //     setSearchParams(searchParams);
  //   }
  //   setQuery("");
  // };
  const handleClearSearch = () => {
    if (props.clearSerarch) {
      props.clearSerarch();
      setQuery("");
    } else {
      const updatedParams = new URLSearchParams(location.search);
      updatedParams.delete("search");
      setSearchParams(updatedParams);
    }
  };
  useEffect(() => {
    setQuery("");
  }, [location.pathname]);
  let searchEvent = null;
  const handleKeyPress = (e) => {
    // console.log('49',query)
    // if(searchEvent){
    //  clearTimeout(searchEvent);
    // }
    // searchEvent=setTimeout(()=>{
    //   console.log('54',query)
    //   handleSearch();
    //   searchEvent=null;
    // },2000)

    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filterMenuRef = useRef();

  const handleFilterMenu = () => {
    setFilterMenu(!filterMenu);
  };

  useOutsideClick(filterMenuRef, handleFilterMenu);

  return (
    <div
      className={`${
        props.containerClassName
          ? props.containerClassName
          : "flex items-center justify-center gap-2 my-2"
      } w-full bg-[#F4F5F8] dark:bg-slate-900 rounded`}
    >
      <div className="relative shadow-sm">
        <LuSearch
          size={18}
          className="absolute top-1/2 -translate-y-1/2 left-2 text-white"
          color={props.iconColor}
        />
        <input
          className={`${
            props?.inputClassName ? props.inputClassName : "p-2 h-[49px]"
          } bg-[#F4F5F8] dark:bg-slate-900  rounded-md pl-8 !placeholder:text-[10px] !placeholder:font-normal pr-4 ${
            props.placeholderColor
              ? props.placeholderColor
              : "placeholder:text-white"
          } `}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={props?.placeholder}
        />
        {searchParams.get("search") && (
          <button
            className={`${
              props.filter ? "right-6" : "right-2"
            } absolute top-1/2 -translate-y-1/2 dark:text-white`}
          >
            <RxCross2 onClick={handleClearSearch} size={18} />
          </button>
        )}
        {props.filter && (
          <div className="absolute top-4 right-2">
            <div className="relative">
              <button onClick={() => setFilterMenu(!filterMenu)}>
                <HiOutlineAdjustmentsHorizontal size={18} />
              </button>
              {filterMenu && <div ref={filterMenuRef}>{props.filter}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
