export const BusinessCardShimmer = ({ className, count = 1 }) => {
  //count : is responsible to render this same component count times
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${className} relative w-full rounded-md overflow-hidden`}
        >
          <div className="p-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 items-center">
              <div className="bg-gray-400 dark:bg-gray-900 w-32 h-6 animate-pulse rounded"></div>
              <div className="bg-gray-400 dark:bg-gray-900 w-12 h-6 animate-pulse rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-400 dark:bg-gray-900 w-16 h-6 animate-pulse rounded"></div>
              <div className="bg-gray-400 dark:bg-gray-900 w-16 h-6 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
