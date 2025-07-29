import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setSelectedSubCategory } from "../../../../../redux/slices/serviceListingSlice";

function Filtertab() {
  const { subCategory, category, loading } = useSelector((state) => state.service);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainerRef = useRef(null); // Ref for the scroll container
  const tabRefs = useRef([]); // Ref for individual tab buttons

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const isOverflow = scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  };

  useEffect(() => {
    const subCategoryIdFromParams = searchParams.get("subCategoryId");
    console.log(subCategoryIdFromParams, "this is runnning")
    if (!category.categoryLoading && subCategoryIdFromParams && subCategory?.list?.length > 0) {
      console.log("went inside if")
      console.log(subCategory.list, "foud list")
      const foundIndex = subCategory.list.findIndex(
        (tab) => tab._id === subCategoryIdFromParams
      );
      if (foundIndex !== -1) {
        console.log("found index")
        setActiveTabIndex(foundIndex);
        dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
      }
    }
    checkOverflow();
  }, [searchParams, subCategory?.list, dispatch]);

  const handleTab = (tab) => {
    dispatch(setSelectedSubCategory(tab));
    setSearchParams({ categoryId: searchParams.get("categoryId") || "", subCategoryId: tab._id });
  };

  // Scroll left handler
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Increase/decrease scroll distance based on your needs
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Scroll right handler
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Increase/decrease scroll distance based on your needs
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="">
      
      <div className="relative flex items-center gap-2 mb-6">
        {/* Left Arrow Button */}
        {isOverflowing && subCategory?.list?.length > 0  && activeTabIndex !== 0 && <button onClick={scrollLeft} className="z-10">
          <IoIosArrowBack color="#534f4f" size={20} />
        </button>}
        <div
          className="flex items-center gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap "
          ref={scrollContainerRef}
        >
          {subCategory.list.map((tab, index) => (
            <button
              key={index}
              disabled={loading}
              ref={(el) => (tabRefs.current[index] = el)} // Assign tab button refs
              className={`${activeTabIndex === index
                  ? "text-[#0A1C40] text-sm font-semibold border-green-600 bg-green-600/[0.1] border rounded-md"
                  : "font-normal text-sm py-1 text-[#7E7E7E] border rounded-md "
                }  p-1 ${loading ? "opacity-50 cursor-not-allowed" : ""} hover:bg-green-600/[0.1] hover:text-[#0A1C40]`}
              onClick={() => handleTab(tab)}
            >
              {tab.subSectionTitle}
            </button>
          ))}
        </div>
        {/* Right Arrow Button */}
        {isOverflowing && subCategory?.list?.length > 0 && activeTabIndex !== subCategory?.list.length -1 && <button onClick={scrollRight} className="z-10">
          <IoIosArrowForward color="#534f4f" size={20} />
        </button>}
      </div>
    </div>
  );
}

export default Filtertab;
 