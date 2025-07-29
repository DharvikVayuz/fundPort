import React, { useState } from "react";
import { Selector } from "../select";

function DropdownField({ index, field, className, onChange }) {
  const { options, value, isRequiredMsg } = field;

  const [selectedValue, setSelectedValue] = useState(value || ""); // Initialize with passed value or empty
  const isRequired = true;

  const handleChange = (data) => {
    setSelectedValue(data);
    onChange(index, data);
  };

  const updatedOptions = options?.map((data) => ({ label: data, value: data }));

  return (
    <div className={className}>
      {field.lebel && (
        <p className="font-semibold text-gray-700 block pb-1">
          {field.lebel}
          {isRequired ? <span className="text-red-600">*</span> : ""}
        </p>
      )}
      <Selector
        className={"w-full"}
        label={field.lebel}
        // placeholder={field.lebel}
        options={updatedOptions}
        // value={selectedValue}
        value={
          updatedOptions?.find(
            (business) => business.value === selectedValue
          ) || null
        }
        onChange={(selectedValue) => handleChange(selectedValue.value)}
      />
      {isRequiredMsg && (
        <p className="text-xs text-red-500 mb-3 pl-3">{field?.isRequiredMsg}</p>
      )}
    </div>
  );
}

export default DropdownField;
