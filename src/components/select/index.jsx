import React, { useState } from "react";
import Select, { components } from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    height: "3rem",
    borderRadius: "8px",
    // backgroundColor: "#F6F6F6", // Set the background color for the control component
    border: "none",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    padding: "4px",
    borderRadius: "11px",
    zIndex: "3",
    maxHeight: "200px", // ✅ Set max height for dropdown
    overflowY: "auto", // ✅ Enable vertical scrolling
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px", // ✅ Limit height of menu list
    overflowY: "auto", // ✅ Enable scrolling inside dropdown
    paddingRight: "5px",

    /* Custom Scrollbar */
    scrollbarWidth: "thin",
    scrollbarColor: "#bbb transparent",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#aaa",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#888",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    display: "flex",
    marginBottom: "2px",
    // backgroundColor: state.isHovered && "#ACD4F7",
    borderRadius: "11px",
    backgroundColor: state.isSelected
      ? "#ACD4F7"
      : state.isFocused && "#E4F1FD", // Change the color of selected option background
    color:
      state.isSelected || state.isFocused || (state.isHovered && "#000000"), // Change the color of selected option text
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -21 : "10%",
    transition: "top 0.3s, font-size 0.1s",
    fontSize: state.hasValue || state.selectProps.inputValue ? "10px" : "14px", // Adjust the font size of the placeholder
    color:
      state.hasValue || state.selectProps.inputValue ? "#2294b1" : "ffffff",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "14px", // Adjust the font size of the selected option
  }),
};

let placeholderClassName = "";
const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer className="peer" {...props}>
      <div
        className={` bg-red-400`}
        style={
          {
            // display: "flex",
            // alignItems: "center",
            // position: "relative",
          }
        }
      >
        {/* {props.selectProps.icon && (
          <div style={{ position: "absolute", top: "30%", marginRight: "8px" }}>
            {props.selectProps.icon}
          </div>
        )} */}
        <Placeholder {...props} isFocused={props.isFocused}>
          <span
            className={` ${
              props.selectProps.icon ? "mx-0" : "mx-0"
            } px-1 bg-white ml-[-5px] dark:bg-gray-950 rounded-lg text-gray-400 peer-focus:text-bee-primary`}
          >
            {props.selectProps.placeholder}
          </span>
        </Placeholder>
      </div>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

export const Selector = ({
  containerClassName,
  placeholder,
  name,
  errorContent,
  touched,
  icon,
  className,
  onChange,
  value,
  label,
  lefticon,
  labelicon,
  labelClassName,
  menuClassName,
  ErrorMessage,
  onClick,
  onBlur,
  onFocus,
  isSearchable,
  options,
  isClearable,
  isDisabled,
  required,
  ...props
}) => {
  // useState to change input field ring color (onFocus and onBlur events)
  const [ringColor, setRingColor] = useState(
    "focus-within:ring-1 focus-within:ring-bee-primary"
  );

  const handleRingColor = (isFocused) => {
    if (isFocused) {
      setRingColor("focus-within:ring-1 focus-within:ring-bee-primary");
    } else {
      setRingColor("focus-within:ring-1 focus-within:ring-bee-cinnabar");
    }
  };
  const handleBlur = (e) => {
    handleRingColor(false);
    onBlur && onBlur(e);
  };

  const handleFocus = (e) => {
    handleRingColor(true);
    onFocus && onFocus(e);
  };

  const handleClick = (e) => {
    setRingColor("focus-within:ring-1 focus-within:ring-bee-primary");
    onClick && onClick(e);
  };

  return (
    <div className={`${containerClassName} w-full relative`}>
      <Select
        // menuPosition={"fixed"}
        id={label}
        name={name}
        isSearchable={isSearchable}
        isClearable={isClearable}
        value={value}
        placeholder={
          <>
            {placeholder && placeholder}
            {required ? <span className="text-red-600">*</span> : ""}
            {/* <span className="after:content-['*'] after:text-red-600"></span> */}
          </>
        }
        styles={customStyles}
        options={options}
        classNames={{
          // control: () => "!w-full !min-h-10 !bg-transparent !border-none !rounded-[8px]",
          menu: () => `${menuClassName}`,
          // option: (state) => `${state.isSelected && "!text-white dark:!text-white"}`,
          // singleValue: () => "!text-black dark:!text-white"
        }}
        className={` my-react-select-container ${
          lefticon ? `pl-6` : `pl-2`
        }  ${ringColor} ${className} peer block w-full text-sm  text-black dark:text-white bg-white dark:bg-gray-950 rounded-lg appearance-none placeholder-transparent focus:outline-none border border-[#D9D9D9]`}
        classNamePrefix="my-react-select"
        components={{
          // Option: CustomSelectOption,
          ValueContainer: CustomValueContainer,
        }}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleClick}
        isDisabled={isDisabled}
        {...props}
      />
      {errorContent && touched && (
        <div className="h-1 mb-2">
          <p className=" text-error text-xs">{errorContent}</p>
        </div>
      )}
      <i className="absolute top-1/2 -translate-y-1/2 ml-3">{lefticon}</i>
    </div>
  );
};
