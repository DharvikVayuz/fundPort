import FundraiseListing from "../listing";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddOrEditFundraise = () => {
  const navigate = useNavigate();
  return (
    <>
      <FundraiseListing />
      <ModalWrapper
        onClick={() => navigate("/fundraise")}
        title={"Funding Requirement Details"}
      >
        <div
          // onSubmit={handleSubmit(onSubmit)}
          className="px-4 my-2 flex flex-col gap-6"
        >
          {/* Form */}
          <div className="p-4 max-h-[80vh]  ">
            <Outlet />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default AddOrEditFundraise;
