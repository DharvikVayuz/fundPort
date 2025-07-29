import SemiCircleProgressBar from "react-progressbar-semicircle";
import { Rating } from "../../../../../components/rating";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingReviews } from "../../../../../redux/actions/dashboard-action";
import { ServiceDetailsRatingCard } from "../../../../../components/loader/ServiceDetailsRatingCard";
import parse from "html-react-parser"; // Importing html-react-parser
import { div } from "framer-motion/client";

export const Testimonials = ({ serviceId }) => {
  console.log(serviceId, "serviceIdserviceIdserviceId");
  const { serviceTestimonials, averageRating, success, ratingReviewList } =
    useSelector((state) => state.serviceDetails);
  console.log(ratingReviewList, "ratingReviewList");
  const { isRatingLoading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const formattedTestimonials = success?.servicetestimonials?.map(
    (testimonial) => {
      return {
        id: testimonial._id,
        company: testimonial.authorCompany ? authorCompany : "",
        feedback: testimonial.authorDescription,
        client: testimonial.authorName,
        image: testimonial.authorImage,
      };
    }
  );

  const formattedRatting =
    ratingReviewList?.data?.length > 0 ? ratingReviewList.data[0] : {};

  const ratingDetails =
    success?.total_rating_count?.length > 0
      ? success.total_rating_count[0]
      : null;
  useEffect(() => {
    dispatch(getRatingReviews(serviceId));
  }, []);

  const ratingPercentage = (rating) => {
    if (rating < 0 || rating > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }
    return (rating / 5) * 100;
  };

  const ratings = [
    {
      title: "Service Quality",
      score: formattedRatting
        ? formattedRatting.avgServiceQualityRating
        : "N/A",
    },
    {
      title: "Professional Behaviour",
      score: formattedRatting
        ? formattedRatting.avgProfessionalBehaviourRating
        : "N/A",
    },
    {
      title: "On-Time Delivery",
      score: formattedRatting
        ? formattedRatting.avgOnTimeDeliveryRating
        : "N/A",
    },
    {
      title: "Transparent Pricing",
      score: formattedRatting
        ? formattedRatting.avgTransparentPricingRating
        : "N/A",
    },
    {
      title: "Value For Money",
      score: formattedRatting ? formattedRatting.avgValueForMoneyRating : "N/A",
    },
  ];

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      {!ratingDetails === null && (
        <h4 className="mb-12 font-semibold text-3xl text-[#0A1C40] text-center">
          Trusted by entrepreneurs Like you
        </h4>
      )}

      {/* Rating Section */}
      {isRatingLoading ? (
        <ServiceDetailsRatingCard />
      ) : (
        <>
          {!ratingDetails === null && (
            <div className="bg-[#0E38BD] rounded-md p-5 flex flex-col md:flex-row justify-between gap-6 items-center mb-8">
              {
                <div className="flex flex-wrap justify-center">
                  {ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="w-12 flex flex-col items-center text-center mx-4"
                    >
                      <SemiCircleProgressBar
                        diameter={60}
                        stroke={"#FFD700"}
                        strokeWidth={4}
                        percentage={ratingPercentage(rating.score)}
                      />
                      <div className="-mt-2.5 text-white text-[10px] font-bold">
                        {rating.score ? rating.score : "N/A"}
                      </div>
                      <p className="font-medium text-[11px] text-white">
                        {rating.title}
                      </p>
                    </div>
                  ))}
                </div>
              }
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 text-xl ">
                  {
                    <p className="font-bold text-white">
                      {ratingDetails?.average ? ratingDetails?.average : "0"}/5
                    </p>
                  }
                  {ratingDetails?.average && (
                    <Rating rating={ratingDetails?.average} />
                  )}
                </div>
                {
                  <p className="font-semibold text-[11px] text-white">{`Based on ${
                    ratingDetails?.count ? ratingDetails?.count : 0
                  } reviews`}</p>
                }
              </div>
            </div>
          )}
        </>
      )}

      {/* Testimonial Cards */}
      {formattedTestimonials && formattedTestimonials?.length > 0 && (
        <div className="w-full z-10">
          <h2 className="font-semibold text-3xl text-[#0A1C40] text-center">
            Hear from Our Clients
          </h2>

          <div className="mt-6">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              slidesPerGroup={3}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                280: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                340: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {formattedTestimonials?.map((testimonial, index) => (
                <SwiperSlide>
                  <TestimonialCard key={index} testimonial={testimonial} />
                </SwiperSlide>
              ))}
              {/* <div className="mt-10 autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div> */}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedFeedback =
    testimonial.feedback?.length >= 100
      ? `${testimonial.feedback.slice(0, 100)}...`
      : testimonial.feedback;

  return (
    <div className="mb-12 min-h-52 p-3 rounded-xl shadow-sm bg-[#F4F7FF] flex flex-col justify-between hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between sm:flex-row flex-wrap gap-2">
          <img
            src={testimonial.image}
            alt={testimonial.image}
            className="w-12 h-12 rounded-full object-center object-cover border "
          />
          <svg
            width="30"
            height="30"
            viewBox="0 0 61 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.58971 48.1797L0.621094 45.4417C5.07188 43.3312 8.60968 40.907 11.2345 38.169C13.8593 35.4881 15.1717 32.9497 15.1717 30.554C15.1717 28.8428 13.5455 27.1886 10.293 25.5914C7.09756 23.9943 4.8151 22.2546 3.44563 20.3722C2.07616 18.4898 1.39142 16.1512 1.39142 13.3562C1.39142 9.59145 2.61824 6.4542 5.07188 3.94439C7.46846 1.43459 10.4927 0.179687 14.1446 0.179687C18.196 0.179688 21.5055 1.74831 24.0733 4.88557C26.584 8.07987 27.8394 12.1868 27.8394 17.2064C27.8394 21.8267 26.8408 26.1619 24.8436 30.2118C22.8465 34.3187 19.9078 37.9123 16.0277 40.9925C12.1475 44.1298 7.66817 46.5255 2.58971 48.1797ZM35.3715 48.1797L33.4028 45.4417C37.8536 43.3312 41.3914 40.907 44.0162 38.169C46.6411 35.4881 47.9535 32.9497 47.9535 30.554C47.9535 28.8428 46.3272 27.1886 43.0747 25.5915C39.8793 23.9943 37.5968 22.2546 36.2274 20.3722C34.8579 18.4898 34.1732 16.1512 34.1732 13.3562C34.1732 9.59146 35.4 6.4542 37.8536 3.94439C40.2502 1.43459 43.2745 0.17969 46.9264 0.17969C50.9777 0.17969 54.2873 1.74832 56.855 4.88557C59.3657 8.07987 60.6211 12.1868 60.6211 17.2064C60.6211 21.8267 59.6225 26.1619 57.6254 30.2118C55.6282 34.3187 52.6896 37.9123 48.8094 40.9925C44.9292 44.1298 40.4499 46.5255 35.3715 48.1797Z"
              fill="#0A1C40"
              fill-opacity="0.3"
            />
          </svg>
        </div>
        <h3 className="text-[11px] font-semibold text-[#0A1C40] mb-1.5">
          {testimonial.company}
        </h3>
        <p className="text-[#0A1C40] font-semibold mb-1">
          {isExpanded ? parse(testimonial.feedback) : parse(truncatedFeedback)}
          {testimonial.feedback?.length >= 100 && (
            <button
              className="text-[#0A1C40] font-semibold text-[11px] hover:underline"
              onClick={toggleReadMore}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
      <p
        className="text-[#0A1C40] "
        dangerouslySetInnerHTML={{ __html: testimonial.client }}
      ></p>
    </div>
  );
};
