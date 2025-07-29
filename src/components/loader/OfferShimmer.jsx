export const OfferShimmer = ({ className,count }) => {
    //count : is responsible to render this same component count times
    return (
      <>
         {Array.from({ length: count }).map((_, index) => (
        <div
          key={index} // Adding a unique key for each iteration
          className={`${className} relative w-full rounded-md overflow-hidden`}
        >
          <div className="px-3 pt-3 pb-1 bg-gray-300 dark:bg-gray-700 h-40 animate-pulse rounded-xl">
            <div className="flex gap-2 mb-2">
              <div className=" bg-gray-400 dark:bg-gray-900 w-14 h-12 animate-pulse rounded"></div>
              <div>
                <div className=" mb-2 bg-gray-400 dark:bg-gray-900 w-40 h-4 animate-pulse rounded"></div>
                <div className=" bg-gray-400 dark:bg-gray-900 w-20 h-4 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
              <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
              <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
         ))}
      </>
    );
  };