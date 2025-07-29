export const DocumentListShimmer = ({ className, count = 5 }) => {
  return (
    <div className={`${className} relative w-full rounded-md overflow-hidden`}>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-12 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse space-y-2"
          >
            {/* Folder tab or icon area */}
            <div className="bg-gray-300 dark:bg-gray-700 h-16 w-[80%] rounded-md mx-auto"></div>

            {/* Subtitle/content lines */}
            <div className="bg-gray-300 dark:bg-gray-700 h-3 w-full rounded"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-3 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PictuteListShimmer = ({ className, count = 5 }) => {
  return (
    <div className={`${className} relative w-full rounded-md overflow-hidden `}>
      <div className="space-y-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-12">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-400 dark:bg-gray-900 py-2.5 animate-pulse rounded size-32"
          ></div>
        ))}
      </div>
    </div>
  );
};
