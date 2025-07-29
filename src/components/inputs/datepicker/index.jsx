import DatePicker from "react-datepicker";
import { IoInformationCircleOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

export const ReactDatePicker = ({
  value,
  setFieldValue,
  touched,
  onBlur,
  onChange,
  inputProps,
  containerClassName,
  containerClass,
  inputClass,
  searchClass,
  buttonClass,
  dropdownClass,
  label,
  infoContent,
  errorContent,
  required,
  ...restProps
}) => {
  return (
    <div className={`${containerClassName} w-full flex flex-col !relative `}>
      <div className="flex items-center gap-1 relative">
        <label
          className={`${
            required &&
            "after:content-['*'] after:text-red-500 after:absolute after:-top-1"
          } text-black text-sm dark:text-white`}
        >
          {label}
        </label>
        {infoContent && (
          <IoInformationCircleOutline
            className="text-primary text-sm focus:outline-none  "
            data-tooltip-id="my-tooltip"
            data-tooltip-content={infoContent}
          />
        )}
      </div>
      <div>
        <div className="!w-full relative">
          <DatePicker />
          {errorContent && (
            <p className="absolute top-1/2 -translate-y-1/2 right-2">
              <img src="/validation-icon.svg" alt="" />
            </p>
          )}
        </div>
      </div>
      <div className=" h-1 mb-4">
        {/* {errorContent && touched && (
      <p className="text-error text-xs">{errorContent}</p>
    )} */}
        {errorContent && touched && (
          <div className="absolute -top-4 right-8 bg-[#F9F9F9] rounded-[3px] px-3 py-2 mb-3">
            <p className=" text-[#FF3B3B] font-medium  text-[10px]">
              {errorContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
