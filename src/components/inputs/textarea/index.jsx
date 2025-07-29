import { IoInformationCircleOutline } from "react-icons/io5";

export const TextArea = ({
  name,
  onChange,
  value,
  touched,
  label,
  type,
  placeholder,
  className,
  infoContent,
  errorContent,
  required,
  style,
  onBlur,
  ...props
}) => {
  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <label
            htmlFor={label}
            className={`absolute px-2 rounded-lg text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 origin-[0] bg-gray-50 peer-focus:px-2 peer-focus:text-bee-primary peer-focus:dark:text-bee-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 top-5 left-3`}
          >
            {label}
            {required ? <span className="text-red-600">*</span> : ""}
          </label>
          {infoContent && (
            <IoInformationCircleOutline
              className="text-primary text-sm focus:outline-none"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={infoContent}
            />
          )}
        </div>
        <textarea
          type={type}
          autoComplete="off"
          onChange={onChange}
          id={label}
          placeholder={" "}
          className={` ${className} +
          resize-none block px-2 py-2 w-full text-sm text-bee-black rounded-lg border-1 border-gray-300 appearance-none focus:outline-none peer`}
          required={required}
          value={value}
          style={style}
          name={name}
          onBlur={onBlur}
          {...props}
        />
      </div>
      {errorContent && touched && (
        <div className="h-1 mb-2">
          <p className=" text-error text-xs">{errorContent}</p>
        </div>
      )}
    </div>
  );
};
