import PhoneInput from "react-phone-input-2";
import "/src/css/phoneInput.css";
import { IoInformationCircleOutline } from "react-icons/io5";

export const PhoneNumberInput = ({
  country,
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
    <>
      <div className={`${containerClassName} w-full flex flex-col relative`}>
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
        <div className="w-full relative">
          <PhoneInput
            {...restProps}
            enableSearch={true}
            // placeholder={placeholder}
            country={country} // Country code for formatting (United States in this example)
            value={value}
            onChange={onChange}
            // containerClass={`${
            //   containerClass && containerClass
            // } w-full border-none`}
            inputClass={`${
              inputClass && inputClass
            } !w-full h-12 border-[#D9D9D9] border rounded-[10px] shadow-sm dark:text-white ${
              errorContent && touched ? "" : "border-[#D6D6D6]"
            }`}
            searchClass={`${searchClass && searchClass} bg-[#F3F3F3] `}
            buttonClass={`${buttonClass && buttonClass} `}
            dropdownClass={`${dropdownClass && dropdownClass} `}
            onBlur={onBlur}
            inputProps={inputProps}
          />
          {errorContent && (
            <p className="absolute top-1/2 -translate-y-1/2 right-2">
              <img src="/validation-icon.svg" alt="" />
            </p>
          )}
        </div>

        {errorContent && touched && (
          <div className=" h-1 mb-4">
            <div className="absolute -top-4 right-8 bg-[#F9F9F9] rounded-[3px] px-3 py-2 mb-3">
              <p className=" text-[#FF3B3B] font-medium  text-[10px]">
                {errorContent}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
