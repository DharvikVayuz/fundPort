import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

export const MainTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({});
  const location = useLocation();

  // Define the two tabs
  const mainTabs = [
    { name: "Corpzo Intro Video" },
    { name: "CorpzoX Intro Video" },
  ];

  // Handle tab selection
  const handleTabClick = (index) => {
    setActiveTab(index);

    // Update query parameters in the URL
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("tab", index === 0 ? "corpzo-intro-video" : "corpzox-intro-video");
    setSearchParams(currentParams);
  };

  // Set the active tab based on query parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "corpzo-intro-video") {
      setActiveTab(0);
    } else if (tab === "corpzox-intro-video") {
      setActiveTab(1);
    } else {
      setActiveTab(0); // Default to the first tab
    }
  }, [searchParams]);

  return (
    <div className="flex space-x-5 overflow-x-auto scrollbar-hide whitespace-nowrap pb-4">
      {mainTabs.map((tab, index) => (
        <button
          key={index}
          className={`${
            activeTab === index
              ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2"
              : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
          }`}
          onClick={() => handleTabClick(index)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
