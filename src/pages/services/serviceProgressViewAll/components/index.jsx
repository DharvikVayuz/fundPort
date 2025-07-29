import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

export const MainTab = () => {
  const [activeTab, setActiveTab] = useState("hold");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
      { name: "All", value: "all" },
    { name: "Hold", value: "hold" },
    { name: "In Progress", value: "inProgress" },
    { name: "Completed", value: "closed" },
  ];

  const handleTabClick = (value) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const status = searchParams.get("status");
    if (status && ["hold", "inProgress", "closed", "all"].includes(status)) {
      setActiveTab(status);
    } else {
      // Set default if no valid status param
      setActiveTab("hold");
      searchParams.set("status", "hold");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <div className="flex space-x-5 overflow-x-auto scrollbar-hide whitespace-nowrap pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`${
            activeTab === tab.value
              ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2"
              : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
          }`}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
