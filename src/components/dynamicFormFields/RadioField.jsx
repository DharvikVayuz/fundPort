import React, { useState } from "react";

function RadioField({ index, field, className, onChange }) {
  const { options, value, isRequired } = field;

  const [selectedValue, setSelectedValue] = useState(value ? value[0] : "");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // field.value[0] = event.target.value;
    onChange(index, event.target.value);
  };

  return (
    <div>
      {field.lebel && (
        <label className="font-semibold text-gray-700 block pb-1">
          {field.lebel}
          {isRequired && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div
        className={`p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 ${className}`}
      >
        <div className="flex flex-wrap gap-6">
          {options?.map((option, idx) => (
            <label
              key={option}
              className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-100"
            >
              <input
                type="radio"
                name={field?.lebel}
                value={option}
                checked={selectedValue === option}
                onChange={handleChange}
                className="accent-blue-600 w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RadioField;
