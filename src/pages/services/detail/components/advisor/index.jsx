import { useEffect, useState } from "react";
import { Button } from "../../../../../components/buttons";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Advisor = ({
  label = "Not sure about the packages?",
  description = "Talk to our advisors and kickstart your business today.",
  buttonText = "Talk to our Advisors",
  handleRequest,
  isLoading,
  message,
  heading,
  serviceId,
  availeServiceButton,
}) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigate = useNavigate();

  const { success } = useSelector((state) => state.serviceDetails);

  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
    setButtonClicked(false);
  };

  const handleButtonClick = () => {
    setButtonClicked(true); // Set the flag when the button is clicked
    handleRequest(); // Trigger the API call
  };

  useEffect(() => {
    if (!isLoading && buttonClicked) {
      // Open the modal only if the button was clicked and the API call is complete
      setConfirmationModal(true);
    }
  }, [isLoading, buttonClicked]);

  const navigateToService = () => {
    const subscription = success?.subscription?.[0] || null;
    if (subscription) {
      console.log(success?.subscription?.[0], "success?.subscription?.[0]");

      navigate(
        `/payment/${serviceId}/${subscription._id}?paymentType=subscription`
      );
    } else {
      navigate(`/payment/${serviceId}?paymentType=regular`);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-xl">
      <div className="size-full min-h-52 bg-[#f3f7ff] rounded-xl p-2 flex flex-col justify-center items-center text-center gap-6">
        <div>
          <h4 className="font-semibold text-3xl text-[#0A1C40]">{label}</h4>
          <p className="text-[12px] font-normal text-[#0A1C40] mt-1">
            {description}
          </p>
        </div>
        <div className="mb-6 flex justify-center items-center gap-2">
          {availeServiceButton && (
            <Button
              className={"px-6 py-2"}
              primary={true}
              onClick={navigateToService}
            >
              Avail service
            </Button>
          )}

          <Button
            isLoading={isLoading}
            onClick={handleButtonClick}
            className="px-6 py-1.5 !font-medium !rounded"
            outline={true}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col gap-2 px-4 py-5 items-center justify-center">
          <img src="/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            {heading
              ? heading
              : "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."}
          </p>
          <p className="font-medium text-[14px] text-[#595959]">
            {/* Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon. */}
            {message
              ? message
              : "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."}
          </p>
          <div className="flex justify-center">
            {/* <Button primary={true} onClick={onConfirmationModalClose}>
              Continue
            </Button> */}
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};
