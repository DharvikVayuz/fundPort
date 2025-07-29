import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Profile = ({ user = {}, target }) => {
  const [percentage, setPercentage] = useState(0);
  const [missingData, setMissingData] = useState([]);
  // const calculatePercentage = (data) => {
  //   try {
  //     const totalProperties = Object.keys(data[0])?.length; // Total number of properties

  //     const nonNullProperties = Object.keys(data[0]).filter(
  //       (key) => data[0][key] !== null
  //     ).length;

  //     if (totalProperties === 0) {
  //       throw new Error("No properties found in the data.");
  //     }

  //     const percentage = (nonNullProperties / totalProperties) * 100;

  //     return percentage.toFixed(2); // Return percentage rounded to 2 decimal places
  //   } catch (error) {
  //     console.error("Error calculating percentage:", error.message);
  //     return null; // Return null if there's an error
  //   }
  // };

  // const calculateOverallPercentage = (...percentages) => {
  //   if (percentages.length === 0) return 0;

  //   const totalPercentage = percentages.reduce(
  //     (sum, percentage) => sum + percentage,
  //     0
  //   );
  //   const overallPercentage = totalPercentage / percentages.length;
  //   return overallPercentage.toFixed(2);
  // };

  // let basicPercentage = 0;
  // let financePercentage = 0;

  // if (resumeData && skillData && data && certificationDataAll && userInfo) {
  //   basicPercentage = calculatePercentage(resumeData);
  //   financePercentage = calculatePercentage(skillData);
  // }
  // let overallPercentage = calculateOverallPercentage(
  //   +basicPercentage,
  //   +financePercentage
  // );
  //console.log(user, "user")
  let fieldsKey = [
    "name",
    "email",
    "busniessEmail",
    "phone",
    "profile_picture_url",
  ];

  let calculatePercentageHandler = () => {
    let count = 0;
    let missingFields = [];
    console.log(user, "Percentage");

    Object.keys(user).forEach((data) => {
      if (fieldsKey.indexOf(data) !== -1) {
        count++;
      }
    });

    fieldsKey.forEach((field) => {
      if (!user[field]) {
        missingFields.push(field);
      }
    });
    let percentage = Math.floor((count / fieldsKey.length) * 100);

    setPercentage(percentage);
    setMissingData(missingFields);
  };

  useEffect(() => {
    if (user) {
      calculatePercentageHandler();
    }
  }, [user]);
  return (
    <div
      className={`w-full flex gap-6  items-center  rounded-[18px] ${target}`}
    >
      <div className="w-8 relative">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            textColor: "red",
            pathColor: "#ffd700",
            trailColor: "#f0f0f0",
          })}
          value={percentage}
        >
          <div className="w-6 h-6 rounded-full">
            <img
              className="size-full inset-0 rounded-full ltr:absolute ltr:top-1/2 ltr:left-1/2 ltr:-translate-y-1/2 rtl:-translate-y-[31%] ltr:-translate-x-1/2"
              // src="/images/insights/insight-user.svg"
              src={
                user?.profile_picture_url
                  ? user?.profile_picture_url
                  : "/images/insights/user-logo.svg"
              }
              alt="profile-pic"
            />
          </div>
          {/* <div className="absolute bottom-4 right-2 text-xs p-1 bg-bee-secondary opacity-80 rounded-xl">
            <strong>{Math.floor(overallPercentage)}%</strong>
          </div> */}
        </CircularProgressbarWithChildren>
      </div>
      {/* <div>
        <p className="font-bold text-lg">{percentage}%</p>
        <p className="font-semibold text-sm text-[#232323]"> {user?.name ? (user.name.slice(0, 25) + (user.name.length > 25 ? "..." : "")) : <></>}</p>
         
        {percentage !== 100 ? (
           
           <Link to="/profile" className="font-semi bold text-[11px] text-[#FF4141]">
           Complete Your Profile
           
         </Link>
        ) : (
          <Link to="/profile" className="font-semibold text-[11px] text-[#FF4141]">
            Edit Your Profile
          </Link>
        )}


      </div> */}
    </div>
  );
};
