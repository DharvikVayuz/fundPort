import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
export const ModalWrapper = ({ title, children, onClick, video }) => {
  //get query params
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{ zIndex: 1001 }}
      className="fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen flex justify-center items-center"
    >
      <div
        className={`${
          video ? "" : "w-[90%]"
        } max-w-4xl relative bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl`}
      >
        {title && (
          <h3 className="mt-4 font-bold md:text-2xl text-center">{title}</h3>
        )}
        {
          <button
            onClick={
              onClick
                ? onClick
                : () => {
                    if (searchParams.get("source") === "details")
                      navigate(`/business/detail?id=${searchParams.get("id")}`);
                    else if (searchParams.get("source") === "dashboard")
                      navigate("/dashboard");
                    else navigate("/business");
                  }
            }
            className="absolute top-4 right-4 "
          >
            <IoMdClose
              size={30}
              className={`cursor-pointer transition-colors duration-200 ${
                video
                  ? "text-white hover:text-red-500"
                  : "text-black hover:text-red-500"
              }`}
            />
          </button>
        }
        {children}
      </div>
    </div>
  );
};
