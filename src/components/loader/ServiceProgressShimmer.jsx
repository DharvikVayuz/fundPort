export const ServiceProgressShimmer = ({ className, count = 1 }) => {
  //count : is responsible to render this same component count times
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index} // Adding a unique key for each iteration
          className={`${className} relative w-full rounded-md overflow-hidden`}
        >
          <div className="p-3 bg-gray-300 dark:bg-gray-700 h-20 animate-pulse rounded-xl space-y-2">
            <div className="bg-gray-400 dark:bg-gray-900 py-3 animate-pulse rounded"></div>
            <div className="bg-gray-400 dark:bg-gray-900 py-3 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};
