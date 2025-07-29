import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";
import { Heading } from "../../../../components/heading";
import { BusinessCardShimmer } from "../../../../components/loader/BusinessCardShimmer";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { Input } from "../../../../components/inputs";
import { BiEdit } from "react-icons/bi";
const ProfileCard = ({ userData, loading }) => {
  console.log(userData, "userData123");
  const { user } = useSelector((state) => state.dashboard);
  return (
    <>
      {loading ? (
        <BusinessCardShimmer className={"pb-6"} />
      ) : (
        <div className="pb-6">
          <Heading title={"Profile"} backButton={true}>
            Profile
          </Heading>

          <div className="relative mt-6 p-4 border rounded-xl">
            <div className="bg-[#F3F7FF] flex flex-col gap-2 md:flex-row md:justify-center rounded-xl">
              <div data-tooltip-id="my-tooltip" data-tooltip-content={"Edit Profile"} className="absolute top-6 right-6">
                <Link to={"edit"}>
                  <BiEdit />
                </Link>
              </div>
              <div className="md:w-1/4 flex justify-center items-center">
                <div className="max-w-52 p-4 flex justify-center">
                  <img
                    src={
                      user?.profile_picture_url
                        ? user?.profile_picture_url
                        : "/images/insights/user-logo.svg"
                    }
                    className="rounded-full size-full object-cover border-2 border-white"
                    alt="Profile Picture"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/4 flex flex-col justify-center md:items-start items-center">
                <div className="py-4 flex justify-between">
                  <div className="flex gap-1 text-[#525252]">
                    <span className="font-bold text-black">Name:</span>
                    {userData && userData?.name ? userData?.name : "________"}
                  </div>
                </div>
                <div className="pb-4 flex gap-1 text-[#525252]">
                  <span className="font-bold text-black">Email:</span>
                  {userData && userData?.email ? userData?.email : "_________"}
                </div>
                <div className="pb-4 flex gap-1 text-[#525252]">
                  <span className="font-bold text-black">Phone:</span>
                  {userData && userData?.phone ? userData?.phone : "_________"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
