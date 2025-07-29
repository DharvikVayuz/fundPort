import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import { getInsights } from "../../../redux/actions/insight-action";
import MetaTags from "./metTags.jsx";
import ShareMetaTags from "./metTags.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useRef } from "react";
export const MainTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({});
  const location = useLocation();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to check scroll position and update arrow visibility
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };


  useEffect(() => {
    checkScroll();
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);
  
  const { isInsightLoading, insights, totalInsights, categories } = useSelector((state) => state.insights)

  const metaBlogId = searchParams.get("metaBlogId")
  const dispatch = useDispatch();
  // Define the two tabs
 
  const mainTabs = categories?.map((category) => {
    return {
      name: category?.name,
      blogMetaId : category?.metaUrl
    };
  });
  console.log(mainTabs, "miantab")

  // Handle tab selection
  const handleTabClick = (index, id) => {
    setActiveTab(index);
    console.log(id, "metaBlogId")
    //  dispatch(getInsights({ page: "", categoryMetaUrl : id}));
     console.log("after call")
    setSearchParams({metaBlogId : id});
  };
 
  useEffect(() => {
    if (metaBlogId) {
      const activeIndex = mainTabs.findIndex((tab) => tab.blogMetaId === metaBlogId);
      if (activeIndex !== -1) {
        setActiveTab(activeIndex);
        // dispatch(getInsights({ page: "", categoryMetaUrl: metaBlogId }));
      }
    }
  }, [metaBlogId, dispatch]);
 

  return (
    <div className="relative flex items-center w-full">
    {/* Left Arrow (Hidden when at the start) */}
    {showLeftArrow && (
      <button
        onClick={scrollLeft}
        className="  rounded-full shadow-md mr-2 hidden sm:block"
      >
     <IoIosArrowBack color="#534f4f" size={20} />
      </button>
    )}

    {/* Tabs Container */}
    <div
      ref={scrollRef}
      className="flex space-x-5 overflow-x-auto scrollbar-hide whitespace-nowrap pb-4 scroll-smooth w-full"
    >
      {mainTabs?.map((tab, index) => (
        <button
          key={index}
          className={`${
            activeTab === index
              ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2"
              : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
          }`}
          onClick={() => handleTabClick(index, tab?.blogMetaId)}
        >
          {tab.name}
        </button>
      ))}
    </div>

    {/* Right Arrow (Hidden when at the end) */}
    {showRightArrow && (
      <button
        onClick={scrollRight}
        className="  rounded-full shadow-md ml-2 hidden sm:block"
      >
       <IoIosArrowForward color="#534f4f" size={20} />
      </button>
    )}
  </div>
  );
};
