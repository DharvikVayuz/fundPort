import React, { useState } from "react";
import { formatReadableDate } from "../../utils";

export const ProgressBar = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);

  const statusColors = {
    "Payment Received": "bg-[#34A853]",       // Green
    "Document Uploaded": "bg-[#FBBC05]",      // Yellow
    "Form Filled": "bg-[#4285F4]",            // Blue
    "Application On Hold": "bg-[#EA4335]",    // Red
    "Application In Review": "bg-[#A142F4]",  // Purple
    "Application Rejected": "bg-[#C5221F]",   // Dark Red
    "Application Escalated": "bg-[#FF6D01]",  // Orange
    "Application Approved": "bg-[#0F9D58]"    // Dark Green
  };

  console.log(steps, "from interbal")
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps?.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
console.log(width)
  return (
    <div className="w-full overflow-hidden overflow-x-auto h-[70px] relative">
  <div className="flex mt-4 relative w-max"> {/* Ensuring full scroll width */}
    
    {/* Background track */}
    <div className="absolute inset-y-1/2 min-w-full bg-[#F3E7F3] h-[4px] transform -translate-y-1/2"></div>

    {/* Progress Bar */}
    <div
      className="absolute inset-y-1/2 bg-[#34A853] h-[4px] transform -translate-y-1/2 transition-all duration-400"
      style={{ width }} // Ensure `width` dynamically updates
    ></div>

    {steps?.map(({ step, topLabel, bottomLabel, status, createdAt }) => (
      <div key={step} className="relative z-10">
        <div className={`transition-all duration-400 flex justify-center items-center`}>
          {activeStep > step ? (
            <div className="text-[#4A154B] text-xl font-semibold transform w-[150px] scale-x-[-1] rotate-[-46deg]">
              `
            </div>
          ) : (
            <span className="text-[#F3E7F3] text-[19px] sm:text-[16px] w-[150px]">
              `
            </span>
          )}
        </div>

        {/* Status Label */}
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
  className={`w-fit py-1 px-1 rounded ${statusColors[status] || "bg-gray-400"} font-normal text-[10px] text-white whitespace-nowrap`}
>
  {status}
</span>
        </div>

        {/* Timestamp Label */}
        <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-[10px] text-gray-500 whitespace-nowrap">
            {formatReadableDate(createdAt)}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};
