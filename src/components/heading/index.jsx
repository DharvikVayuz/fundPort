import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../buttons";

export const Heading = ({
  title,
  className,
  children,
  backButton,
  tourButton,
  onClick,
}) => {
  const projectName = "VAYUZ";
  const navigate = useNavigate();

  useEffect(() => {
    document.title = ` ${title ? title : children} - ${projectName}`;
    window.scrollTo(0, 0);
  }, [title]);

  const handleNavigate = () => {
    switch (title) {
      case "Messages":
        navigate("/");
        break;
      case "Insight Details":
        navigate("/");
        break;
      case "Your Service Progress Updates":
        navigate("/dashboard");
        break;

      default:
        navigate(-1);
        break;
    }
  };

  return (
    <>
      {children && (
        <div
          className={`${
            className ? className : "py-0"
          } flex items-center gap-2 font-semibold text-base text-[#0A1C40]`}
        >
          {backButton && (
            <button
              onClick={handleNavigate}
              className="p-1 rounded-full hover:bg-gray-200 transition duration-200"
            >
              <GoArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2>{children}</h2>
          {tourButton && (
            <Button type="button" onClick={onClick} className={"pt-1"}>
              <img
                src="/icons/dashboard/dark-tour.svg"
                alt=""
                className="size-4"
              />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export const PageHeading = ({ children, containerClassName, className }) => {
  return (
    <div
      className={`${containerClassName} flex justify-between items-center gap-6`}
    >
      <Heading className={className}>{children}</Heading>
      <Link />
    </div>
  );
};
