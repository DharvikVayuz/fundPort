// export const DashboardProfileCardShimmer = ({ className, count = 1 }) => {
//   return (
//     <>
//       {Array.from({ length: count }).map((_, index) => (
//         <div
//           key={index}
//           className={`${className} flex items-center gap-2 w-full rounded-md overflow-hidden`}
//         >
//           {/* Profile Image Shimmer */}
//           <div className="w-8 h-8 bg-gray-400 dark:bg-gray-900 animate-pulse rounded-full"></div>

//           {/* User Info Shimmer */}
//           <div>
//             <div className="mb-2 bg-gray-400 dark:bg-gray-900 w-40 h-4 animate-pulse rounded"></div>
//             <div className="bg-gray-400 dark:bg-gray-900 w-20 h-4 animate-pulse rounded"></div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };
export const DashboardProfileCardShimmer = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${className} flex items-center gap-2 w-full rounded-md overflow-hidden`}
        >
          {/* Profile Image Shimmer */}
          {/* <div className="w-8 h-8 bg-gray-400 dark:bg-gray-900 animate-pulse rounded-full"></div> */}

        
        </div>
      ))}
    </>
  );
};

  
  