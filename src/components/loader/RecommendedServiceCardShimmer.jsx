export const RecommendedServiceCardShimmer = ({ className }) => {
  return (
    <>
      <div
        className={`${className} relative w-full rounded-md overflow-hidden`}
      >
        <div className="p-3 bg-gray-300 dark:bg-gray-700 h-50 animate-pulse rounded-xl">
          <div className="flex gap-2 mb-2">
            <div className="bg-gray-400 dark:bg-gray-900 w-14 h-12 animate-pulse rounded"></div>
            <div className="grid place-content-end">
              {/* <div className=" mb-2 bg-gray-400 dark:bg-gray-900 w-40 h-4 animate-pulse rounded"></div> */}
              <div className="bg-gray-400 dark:bg-gray-900 w-20 h-4 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
            <div className="bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
            <div className="bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
          </div>
          <div className="mt-2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl flex justify-between">
            <div className="flex gap-2 items-center mb-2">
              <div className="bg-gray-400 dark:bg-gray-900 w-12 h-10 animate-pulse rounded"></div>
              <div className="bg-gray-400 dark:bg-gray-900 w-32 h-4 animate-pulse rounded"></div>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="bg-gray-400 dark:bg-gray-900 w-16 h-10 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
