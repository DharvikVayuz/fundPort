import React, { useState } from "react";

function CheckBoxField({ index, field, className, onChange }) {
  const { options, value, isRequired, isRequiredMsg } = field; // `value` is an array of selected options
  const [selectedValues, setSelectedValues] = useState(value || []);

  const handleChange = (event) => {
    const { value: optionValue, checked } = event.target;
    let updatedValues;

    if (checked) {
      updatedValues = [...selectedValues, optionValue]; // Add to the selected options
    } else {
      updatedValues = selectedValues.filter((val) => val !== optionValue); // Remove from the selected options
    }

    setSelectedValues(updatedValues);
    onChange(index, updatedValues); // Pass updated array to the parent
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
        className={`p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 ${className}`}
      >
        <div className="flex flex-wrap gap-6">
          {options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-100"
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={handleChange}
                className="accent-blue-600 w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {isRequiredMsg && (
          <p className="text-xs text-red-500 mt-2 pl-1">
            {field?.isRequiredMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckBoxField;
