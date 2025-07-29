export const BusinessDetailShimmer = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <h2 className="py-4 flex items-center gap-6 font-semibold text-base">
          <div className="h-6 bg-gray-200 rounded w-5"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </h2>
        <div className="flex gap-2 items-center">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        <div className="h-32 bg-gray-200 rounded w-full sm:w-32"></div>
        <div className="w-full">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          <div className="w-full flex">
            <ul className="w-full min-w-[189px] mb-4">
              <li>
                <div className="h-8 bg-gray-200 rounded w-full mb-1"></div>
              </li>
              <li>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </li>
            </ul>
            <ul className="mb-4">
              <li>
                <div className="h-8 bg-gray-200 rounded w-full mb-1"></div>
              </li>
              <li>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="w-full min-w-[189px] mb-4">
              <li>
                <div className="h-8 bg-gray-200 rounded w-full mb-1"></div>
              </li>
              <li>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </li>
            </ul>
            <ul className="mb-4">
              <li>
                <div className="h-8 bg-gray-200 rounded w-full mb-1"></div>
              </li>
              <li>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
