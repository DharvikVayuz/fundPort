import { RxCross2 } from "react-icons/rx";
import { Button } from "../../buttons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { setSidebarZIndex } from "../../../redux/slices/appSlice";
import { useDispatch } from "react-redux";

export const ConfirmationModal = ({
  title,
  isOpen,
  onClose,
  loading,
  children,
  onConfirm,
  description,
  modalClassName,
  containerClassName,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when modal unmounts
    };
  }, [isOpen]);

  if (isOpen) {
    dispatch(setSidebarZIndex(0));
  } else {
    dispatch(setSidebarZIndex(40));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.3, ease: "easeInOut" },
          }}
          className={`${
            containerClassName && containerClassName
          } fixed top-0 left-0 w-full h-full inset-0 bg-black bg-opacity-10 backdrop-blur-sm  flex items-center justify-center z-50`}
        >
          <div
            className={`${
              modalClassName ? modalClassName : "p-4"
            }  max-h-[90vh] max-w-[90%] sm:max-w-xl relative bg-white backdrop-blur-lg rounded-xl shadow-lg overflow-hidden`}
          >
            {children ? (
              children
            ) : (
              <>
                <h4>{title}</h4>
                <p className="mb-4">{description}</p>
                <div className="flex justify-end gap-6">
                  <Button
                    className={"w-fit px-8 py-2 rounded"}
                    onClick={onConfirm}
                    mainPrimary={true}
                    isLoading={loading}
                  >
                    Yes
                  </Button>
                  <Button
                    outLine={true}
                    onClick={onClose}
                    className={"w-fit px-8 py-2 rounded"}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
            <button
              className="absolute top-3 right-3 text-black hover:text-red-500"
              onClick={onClose}
            >
              <RxCross2 />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
