export const PricingDetailShimmer = ({ className }) => {
  return (
    <>
      <div
        className={`${className} p-4 relative w-full rounded-md overflow-hidden grid place-content-center`}
      >
        <div className="px-3 pt-3 pb-1 bg-gray-300 dark:bg-gray-700 h-40 animate-pulse rounded-xl">
          <div className="flex gap-2 mb-2">
            <div className=" bg-gray-400 dark:bg-gray-900 w-96 h-12 animate-pulse rounded"></div>
            <div>
              <div className=" mb-2 bg-gray-400 dark:bg-gray-900 w-96 h-4 animate-pulse rounded"></div>
              <div className=" bg-gray-400 dark:bg-gray-900 w-96 h-4 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
            <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
            <div className=" bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};
