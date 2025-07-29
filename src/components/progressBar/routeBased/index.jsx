import React from "react";
import { TiTick } from "react-icons/ti";

export const RouteProgressBar = ({ currStep, totalSteps, steps }) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))`,
          gap: "8px",
        }}
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currStep - 1;
          const isActive = index === currStep - 1;
          const showConnector = index < totalSteps - 1;

          return (
            <div className="relative flex flex-col items-center" key={index}>
              {/* Step Circle */}
              <div
                className="z-10 flex items-center justify-center size-5 md:size-6 rounded-full border-2 bg-white"
                style={{
                  borderColor: isCompleted || isActive ? "#004561" : "#ccc",
                }}
              >
                <TiTick
                  className={`${
                    isCompleted ? "text-[#004561]" : "opacity-0"
                  } text-sm`}
                />
                {!isCompleted && (
                  <span
                    className={`absolute text-xs font-bold ${
                      isActive ? "text-[#004561]" : "text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-[10px] md:text-sm text-center">
                {steps?.[index]?.label}
              </div>

              {/* Connector Line */}
              {showConnector && (
                <div className="absolute top-2.5 left-1/2 w-full h-0.5 z-0">
                  {/* Base line */}
                  <div className="absolute left-0 top-0 h-full w-full bg-gray-300" />
                  {/* Progress fill */}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#004561] transition-all duration-300"
                    style={{
                      width:
                        index < currStep - 1
                          ? "100%"
                          : index === currStep - 1
                          ? "50%"
                          : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
