import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../components/buttons";
import { Rating } from "../../../../../components/rating";
import { useNavigate, useParams } from "react-router-dom";
import { talkToAdvisor } from "../../../../../redux/actions/servicesDetails-actions";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { FeaturesTop } from "../featuresTop";
import { ServiceDetailVideoShimmer } from "../../../../../components/loader/ServiceDetailVideoShimmer";
import { ServiceDetailPricingShimmer } from "../../../../../components/loader/ServiceDetailPricingShimmer";

export const Details = ({
  pricing = true,
  data,
  serviceId,
  handleRequest,
  isLoading,
  stateWiseServiceCharge,
  offer,
}) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const {
    success,
    serviceDetailLoading,
    callBackMessage,
    quotationDetails,
    callBackHeading,
    isTalkToAdvisorLoading,
  } = useSelector((state) => state.serviceDetails);

  const subscriptionAmount =
    success?.subscription?.[0]?.amount || data?.cost || 0;

  const discountPercent =
    success?.offerservices?.[0]?.offers?.[0]?.discountPercent || offer || 0;

  const discountedPrice =
    discountPercent > 0
      ? (
          Number(subscriptionAmount) -
          (Number(subscriptionAmount) * discountPercent) / 100
        ).toFixed(2)
      : Number(subscriptionAmount).toFixed(2);

  const subscription = success?.subscription?.[0] || null;
  const ratingDetails =
    success?.total_rating_count?.length > 0
      ? success.total_rating_count[0]
      : null;

  const navigateToService = () => {
    if (subscription) {
      console.log(success?.subscription?.[0], "success?.subscription?.[0]");

      navigate(
        `/payment/${serviceId}/${subscription._id}?paymentType=subscription`
      );
    } else {
      navigate(`/payment/${serviceId}?paymentType=regular`);
    }
  };
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
    setButtonClicked(false);
  };
  const handleTalkTouOurAdvisors = () => {
    setButtonClicked(true);
    const requestData = {
      userId: JSON.parse(localStorage.getItem("userInfo"))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now(),
    };
    dispatch(talkToAdvisor(requestData));
  };
  useEffect(() => {
    console.log(isTalkToAdvisorLoading, "isTalkToAdvisorLoading");
    if (!isTalkToAdvisorLoading && buttonClicked) {
      setConfirmationModal(true);
    }
  }, [isTalkToAdvisorLoading, buttonClicked]);
  return (
    <>
      <div className="w-full">
        {serviceDetailLoading ? (
          <ServiceDetailPricingShimmer />
        ) : (
          <>
            <div className="h-fit md:w-[50%] md:float-right">
              {pricing && (
                <>
                  <div className="h-fit mb-6 md:mb-2 md:ml-2 p-4 bg-white box-sg border rounded-xl">
                    <div className="p-4 bg-[#F3F7FF] rounded-xl">
                      <div>
                        <div className="font-extrabold text-2xl text-[#0A1C40] flex flex-row gap-2">
                          ₹ {subscriptionAmount}
                          {discountPercent > 0 && (
                            <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2">
                              {discountPercent}{" "}
                              {success?.offerservices?.[0]?.offers?.[0]
                                ?.discountType === "fixed"
                                ? "₹"
                                : "%"}
                            </p>
                          )}
                        </div>
                        {stateWiseServiceCharge && (
                          <p className="text-xs font-normal text-[#0A1C40]">
                            ₹{stateWiseServiceCharge} (tax) + Applicable govt.
                            fees
                          </p>
                        )}
                      </div>
                      <div className="py-2">
                        <p className="font-bold text-[16px] text-[#0A1C40]">
                          Service Details
                        </p>
                        <p
                          className={`${
                            !readMore ? "line-clamp-6" : ""
                          } font-medium text-sm text-[#0A1C40]`}
                          dangerouslySetInnerHTML={{ __html: data?.about }}
                        ></p>
                        <div className="flex justify-end">
                          <button
                            className="text-xs text-[#666666] hover:text-black"
                            onClick={() => setReadMore(!readMore)}
                          >
                            {!readMore ? "Read More" : "Read Less"}
                          </button>
                        </div>
                        {/* <p
                          className="text-[12px] text-[#0A1C40]"
                          dangerouslySetInnerHTML={{ __html: data?.details }}
                        ></p> */}
                      </div>
                      <div className="py-4 flex justify-between items-center">
                        {ratingDetails && (
                          <div className="flex flex-col gap-1">
                            <p className="font-extrabold text-xl text-[#0A1C40]">
                              {ratingDetails?.average?.toFixed(1)}/5
                            </p>
                            <Rating rating={ratingDetails?.average} />
                            <p className="text-[11px]">
                              Based on {ratingDetails?.count || 0} reviews
                            </p>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-end gap-1 font-medium text-[13px] text-[#0A1C40]">
                            <strong className="text-lg leading-6">
                              {data?.duration}
                            </strong>
                            <span>Month</span>
                          </div>
                          <p className="text-xs text-[#0A1C40]">
                            Estimated Time
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-between items-center gap-2">
                        <Button
                          className={"w-full px-6 py-2"}
                          primary={true}
                          onClick={navigateToService}
                        >
                          Avail service
                        </Button>
                        <Button
                          className={"w-full px-1 py-2"}
                          isLoading={isLoading}
                          onClick={handleTalkTouOurAdvisors}
                          outline={true}
                        >
                          Talk to our Advisors
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="text-start space-y-2">
              <p
                style={{ fontFamily: "Encode Sans, sans-serif" }}
                className="font-bold text-[24px] uppercase text-[#0A1C40]"
              >
                {data?.name}
              </p>
              {/* <p
                className="font-medium text-sm text-[#0A1C40] "
                dangerouslySetInnerHTML={{ __html: data?.about }}
              ></p> */}
              <p
                className="text-[12px] text-[#0A1C40]"
                dangerouslySetInnerHTML={{ __html: data?.details }}
              ></p>
            </div>
          </>
        )}
        {!pricing && (
          <div className="pt-6">
            <div className="flex flex-col justify-center items-center gap-6">
              <h3
                style={{ fontFamily: "MarsCondensed, sans-serif" }}
                className="font-semibold text-[20px] leading-[18px] uppercase"
              >
                your business, your choice
              </h3>
              <div>
                <p className="font-medium text-sm text-[#0A1C40]">
                  Select your state to view the applicable govt. fees*
                </p>
                <p className="font-normal text-xs text-[#0A1C40]">
                  *Subject to fluctuation at the time of application
                </p>
              </div>
              <Button
                className="w-fit px-6 py-1.5 !font-semibold !rounded"
                outline={true}
              >
                Talk to our Advisors
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="pt-6 w-full">
        {serviceDetailLoading ? (
          <ServiceDetailVideoShimmer />
        ) : success?.delivrableVideoUrl ||
          success?.documentVideoUrl ||
          success?.stepsVideoUrl ? (
          <video controls autoPlay className="rounded-[10px] w-full h-[250px]">
            <source
              src={
                success.delivrableVideoUrl ||
                success.documentVideoUrl ||
                success.stepsVideoUrl
              }
              type="video/mp4"
            />
          </video>
        ) : (
          <FeaturesTop />
        )}
      </div>

      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col gap-2 px-4 py-5 items-center justify-center">
          <img src="/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            {callBackHeading
              ? callBackHeading
              : "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."}
          </p>
          <p className="font-medium text-[14px] text-[#595959]">
            {/* Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon. */}
            {callBackMessage
              ? callBackMessage
              : "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."}
          </p>
          <div className="flex justify-center">
            {/* <Button primary={true} onClick={onConfirmationModalClose}>
              Continue
            </Button> */}
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};
