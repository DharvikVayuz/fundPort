import React, { useState } from 'react';

function ParagraphField({ index, field, className, onChange }) {
  const { lebel, value,isRequired } = field;
  const [inputValue, setInputValue] = useState(value[0] || '');

//   console.log("ParagraphField",field);
  

  const handleChange = (event) => {
    const newValue = event.target.value;
    // setInputValue(newValue);
    const isError = validateField(newValue);
    onChange(index, newValue,isError); // Pass updated value to the parent
  };

  
  const validateField =(newVal) => {
    if (field.isValidationRequired) {

      if (field.inputSubType === "length") {
        return paragraphFieldValidation(newVal);
      }
    }
  }

  const paragraphFieldValidation = (newVal) => {  
    switch (field.inputSubTypeValidation) {
      case "min_char_count":
        return !(field.number && newVal?.length >= field.number);
  
      case "max_char_count":
        return !(field.number && newVal?.length <= field.number);
  
      default:
        return true; // Optional: handle unexpected values
    }
  };

  return (
    <div className={`rounded-lg bg-white dark:bg-gray-800 ${className}`}>
    {lebel && (
      <label className="block font-semibold text-gray-700 pb-1">
        {lebel}
        {isRequired && <span className="text-red-600 ml-1">*</span>}
      </label>
    )}
    
    <textarea
      value={field.value[0]}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      rows={5}
      maxLength={2000}
      // placeholder="Enter your text here..."
    />
  
    {field.error && (
      <p className="text-xs text-red-500 mt-1 pl-1">{field.custom_validation_msg}</p>
    )}
  </div>
  

  );
}

export default ParagraphField;
