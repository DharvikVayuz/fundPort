import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../buttons";

export const NoData = ({ className, title, icon, textSize }) => {
  const renderIcon = () => {
    switch (icon) {
      case "services":
        return (
          <img
            src="/icons/dashboard/services.svg"
            width={150}
            alt="services icon"
          />
        );

      default:
        return (
          <img
            src="/images/errors/no-data.svg"
            width={350}
            alt="no-data icon"
          />
        ); // fallback for custom icon path
    }
  };
  return (
    <>
      <div
        className={`${
          className || " h-[70vh] xl:h-[75vh]"
        } flex flex-col gap-6 text-center justify-center items-center`}
      >
        {renderIcon()}

        <p
          className={`font-medium  ${
            textSize === "small" ? "text-sm" : "text-lg"
          }  text-[#595959]`}
        >
          {title ? title : "No data available."}
        </p>
        {/* <div className="flex flex-col w-full sm:w-[30%]"> */}
        <Link to={"/"} className="flex flex-co`l w-full sm:w-[30%]"></Link>
        {/* </div> */}
      </div>
    </>
  );
};
