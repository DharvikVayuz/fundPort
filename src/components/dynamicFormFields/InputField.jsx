import React, { useEffect, useState } from "react";
import { Input } from "../inputs";

function InputField({ index, field, className, onChange }) {
  const { lebel, value, isRequired } = field;

  const handleOnChange = (e) => {
    const isError = validateField(e.target?.value);
    // console.log(isError);

    onChange(index, e.target?.value, isError);
  };

  // }, [field.value[0]])

  const validateField = (newVal) => {
    if (field.isValidationRequired) {
      if (field.inputSubType === "text") {
        return textFieldValidation(newVal);
      } else if (field.inputSubType === "number") {
        return numberFieldValidation(newVal);
      } else if (field.inputSubType === "regax") {
        // return regexValidation(newVal);   //It's working fine but need to test on some more testcases , so its on hold for now
      } else if (field.inputSubType === "length") {
        return lengthFieldValidation(newVal);
      }
    }
  };

  const textFieldValidation = (newVal) => {
    switch (field.inputSubTypeValidation) {
      case "contains":
        return !(field.text && newVal?.includes(field.text));

      case "does_not_contains":
        return field.text && newVal?.includes(field.text);

      case "url":
        return !regexValidate(
          newVal,
          "\\b(?:https?|ftp):\\/\\/(?:www\\.)?[a-zA-Z0-9-]+(?:\\.[a-zA-Z]{2,})+(?:\\/[^\\s]*)?\\b"
        );

      case "email":
        return !regexValidate(
          newVal,
          "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+"
        );

      default:
        return false; // Optional: handle unexpected values
    }
  };

  const numberFieldValidation = (newVal) => {
    switch (field.inputSubTypeValidation) {
      case "equal_to":
        return !(field.number && newVal == field.number);

      case "not_equal_to":
        return !(field.number && newVal != field.number);

      case "greater_then":
        return !(field.number && newVal > field.number);

      case "greater_then_equal_to":
        return !(field.number && newVal >= field.number);

      case "less_then":
        return !(field.number && newVal < field.number);

      case "less_then_equal_to":
        return !(field.number && newVal <= field.number);

      case "is_number":
        return isNaN(newVal);

      default:
        return false; // Optional: handle unexpected values
    }
  };

  const regexValidation = (newVal) => {
    switch (field.inputSubTypeValidation) {
      case "matches":
        return !(field.text && regexValidate(newVal, field.text));

      case "does_not_contains":
        return !(field.text && !newVal?.includes(field.text));

      case "contains":
        return !(field.text && newVal?.includes(field.text));

      case "does_not_matches":
        return !(field.text && !regexValidate(newVal, field.text));

      default:
        return true; // Optional: handle unexpected values
    }
  };

  const lengthFieldValidation = (newVal) => {
    switch (field.inputSubTypeValidation) {
      case "min_char_count":
        return !(field.number && newVal?.length >= field.number);

      case "max_char_count":
        return !(field.number && newVal?.length <= field.number);

      default:
        return true; // Optional: handle unexpected values
    }
  };

  //Helper function
  const regexValidate = (input, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(input);
  };

  return (
    <div className={className}>
      {lebel && (
        <label className="block font-semibold text-gray-700 pb-1">
          {lebel}
          {isRequired && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <Input
        required={field?.isRequired}
        // label={field.lebel}
        onChange={(e) => handleOnChange(e)}
        value={field.value[0]}
        className={"border"}
      />
      {field?.isRequiredMsg || field.error ? (
        <p className="text-xs text-red-500 mb-3 pl-3">
          {field?.isRequiredMsg || field.custom_validation_msg}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputField;
