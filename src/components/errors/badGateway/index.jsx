import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../buttons";

export const BadGateway = () => {
  return (
    <>
      <div className="h-screen flex flex-col gap-6 text-center justify-center items-center">
        <img src="/images/errors/bad-gateway.svg" width={350} alt="" />
        <p className="font-medium  text-lg  text-[#595959]">
          "Uh-oh! Something went wrong please try again later."
        </p>
        {/* <div className="flex flex-col w-full sm:w-[30%]"> */}
        <Link to={"/"} className="flex flex-col w-full sm:w-[30%]">
          <Button primary={true}>Try Again </Button>
        </Link>
        {/* </div> */}
      </div>
    </>
  );
};
