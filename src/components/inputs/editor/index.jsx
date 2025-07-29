import ReactQuill from "react-quill";
import { useRef, useEffect } from "react";

export const TextEditor = ({
  name,
  onChange,
  value,
  touched,
  onBlur,
  label,
  type,
  placeholder,
  className,
  infoContent,
  errorContent,
  maxCharLength = 500,
  maxWordCount = 300,
  typeOf = "user",
  isRequired,
  leftIcon,
  labelIcon,
  labelClassName,
  required,
  ...props
}) => {
  const quillRef = useRef(null);
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  // const handleChange = (content) => {
  //   if (quillRef?.current?.getEditor()?.getText()?.length < maxCharLength) {
  //     onChange(name, content);
  //   } else {
  //     onChange(name, value);
  //   }
  // };
  const handleChange = (content) => {
    console.log("Editor content:", content);  // Log the content to the console
    if (quillRef?.current?.getEditor()?.getText()?.length < maxCharLength) {
      onChange(content);  // Directly pass the content to the onChange callback
    } else {
      onChange(value);  // Fallback if the character limit is reached
    }
  };
  
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full relative">
        <ReactQuill
          ref={quillRef}
          // onChange={(content) => {
          //   handleChange(content);
          // }}
          onChange={handleChange}  // Use handleChange instead of the previous inline function
          id={label}
          modules={modules}
          formats={formats}
          value={value}
          onBlur={onBlur}
          placeholder={" "}
          className="h-24 rounded-[10px] peer"
        />
        <label
          for={label}
          className={`${leftIcon ? "mx-3" : "px-2"} ${
            leftIcon ? "flex justify-center items-center px-2.5" : "px-2"
          } 
            ${
              required &&
              "after:content-['*'] after:text-red-500 after:absolute after:-top-1"
            } absolute -translate-y-4 scale-75 top-2 origin-[0] rounded-lg text-sm text-gray-400 dark:text-gray-400 duration-300 transform bg-white dark:bg-gray-950 peer-focus:px-2 peer-focus:text-bee-primary peer-focus:dark:text-bee-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 + ${labelClassName}`}
        >
          <span className="mr-2">{labelIcon}</span>
          {label}
        </label>
      </div>

      <div className="h-1 mb-2">
        {errorContent && true && (
          <p className=" text-error text-xs">{errorContent}</p>
        )}
      </div>
    </div>
  );
};
