import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { Steps } from "./components/steps";
import { Details } from "./components/details";
import { Pricing } from "./components/pricing";
// import { Features } from "./components/featuresTop";
import { Advisor } from "./components/advisor";
import { Testimonials } from "./components/testimonials";
import { FAQs } from "./components/faq";
import { useDispatch, useSelector } from "react-redux";
import {
  getRatingDetails,
  getServiceDetails,
  getStates,
  talkToAdvisor,
  verifyOffer,
} from "../../../redux/actions/servicesDetails-actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clearState } from "../../../redux/slices/serviceDetailsSlice";
import { FeaturesBottom } from "./components/featuresBottom";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const {
    success,
    statesList,
    callBackMessage,
    callBackHeading,
    subscription,
    stateWiseServiceCharge,
    isTalkToAdvisorLoading,
    isQuotationAvailable,
    isOfferAvailable,
  } = useSelector((state) => state.serviceDetails);

  console.log(success, "from component");
  useEffect(() => {
    dispatch(getServiceDetails({ serviceId: serviceId }));
    dispatch(getRatingDetails({ serviceId: serviceId, page: 1 }));
  }, [dispatch]);

  const handleTalkTouOurAdvisors = () => {
    const requestData = {
      userId: JSON.parse(localStorage.getItem("userInfo"))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now(),
    };
    dispatch(talkToAdvisor(requestData));
  };
  return (
    <>
      <section className="pb-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-6">
            <Heading className="text-[16px]" backButton={true}>
              Service Detail
            </Heading>
            {/* <LinkButton leftIcon="/icons/services/call.svg" primary={true}>Contact</LinkButton> */}
          </div>
          <Details
            data={success}
            stateWiseServiceCharge={stateWiseServiceCharge?.estimatedTotal}
            pricing={true}
            serviceId={serviceId}
            offer={success?.offerservices?.[0]?.offers?.[0]?.discountPercent}
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
          />
          {/* <FeaturesBottom /> */}
          <Pricing
            data={subscription}
            pricing={!isQuotationAvailable}
            serviceId={serviceId}
            offer={success?.offerservices?.[0]?.offers?.[0]?.discountPercent}
          />

          <Advisor
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
            heading={callBackHeading}
            message={callBackMessage}
          />

          <Testimonials serviceId={serviceId} />
          <hr className="my-2" />
          {success?.servicesteps && success?.servicesteps?.length > 0 && (
            <Steps data={success} />
          )}
          <hr className="my-6" />
          <FAQs />

          <Advisor
            availeServiceButton={true}
            label="Still have questions?"
            description="Contact us for more information or assistance."
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
            heading={callBackHeading}
            message={callBackMessage}
            serviceId={serviceId}
          />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
