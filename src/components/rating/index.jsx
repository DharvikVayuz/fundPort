// Rating.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FaStar as FaStarFill } from "react-icons/fa6";

export const Rating = ({ totalStars = 5 ,rating,setRating, size, isDisabled}) => {
  
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <motion.div
            key={starValue}
            onClick={() => {
              setRating(starValue); // Update the rating state passed via props
            }}
            // onMouseEnter={() => setHoverRating(starValue)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="cursor-pointer"
            // onMouseLeave={() => setHoverRating(0)}
          >
            {starValue <= (hoverRating || rating) ? (
              <FaStar size={size} className={`text-xs fill-yellow-500`} />
            ) : (
              <FaStarFill size={size} className={`text-xs fill-gray-500`} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
