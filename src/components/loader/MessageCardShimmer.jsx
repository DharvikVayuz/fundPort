import React from "react";

const MessageCardShimmer = ({ className }) => {
  return (
    <div
      className={`${className} w-[30vw] p-4 rounded-md bg-white dark:bg-gray-800 shadow animate-pulse flex gap-6`}
    >
      {/* Avatar */}
      <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Top row: name + time */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/5" />
        </div>

        {/* Message preview line */}
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/5" />

        {/* Paragraph line */}
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
      </div>
    </div>
  );
};

export default MessageCardShimmer;
