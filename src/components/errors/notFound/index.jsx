import React from "react";
import { Button } from "../../buttons/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="h-screen flex flex-col gap-6 text-center justify-center items-center">
        <img src="/images/errors/not-found.svg" width={350} alt="" />
        <p className="font-medium  text-lg  text-[#595959]">
          "Oops! The page you're looking for doesn't exist."
        </p>
        {/* <div className="flex flex-col w-full sm:w-[30%]"> */}
        <Link to={"/"} className="flex flex-col w-full sm:w-[30%]">
          <Button primary={true}>Back </Button>
        </Link>
        {/* </div> */}
      </div>
    </>
  );
};

export default NotFound;
