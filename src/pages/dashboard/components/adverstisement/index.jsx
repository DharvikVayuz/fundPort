import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getbannerAdvertisement, updateBannerAdvertisement } from "../../../../redux/actions/dashboard-action";
import { DashboardProfileCardShimmer } from "../../../../components/loader/DashboardProfileCardShimmer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { removeBannerAdvertisement } from "../../../../redux/slices/dashboardSlice";
import { useLocation } from "react-router-dom";

export const Advertisement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get('token');
  const { bannerAdvertisementList, isbannerAdvertisementLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getbannerAdvertisement({ page: 1, tokenFromUrl }));
  }, [dispatch]);

  const handleBannerClick = (id, url) => {
    console.log(url)
    dispatch(updateBannerAdvertisement(id));
    dispatch(removeBannerAdvertisement(id));
    if (url) {
     
      window.open(url, "_blank");
    }
  };

  const settings = {
    dots: true,
    infinite: bannerAdvertisementList?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <>
      {isVisible && !isbannerAdvertisementLoading && (
        <div className="w-full relative">
          <Slider {...settings} className="custom-dots">
            {bannerAdvertisementList?.map((data, index) => (
              <div key={index} className=" ">
                <div
                  onClick={() => handleBannerClick(data?._id, data?.url)}
                  style={{ backgroundImage: `url(${data?.bannerURL})` }}
                  className="flex flex-col justify-between min-h-[150px] sm:min-h-[200px] rounded-[10px] p-6 bg-cover bg-center bg-no-repeat transition-all duration-300 hover:shadow-lg cursor-pointer"
                >
                  <p className="text-white font-semibold text-lg sm:text-xl">
                    {data?.bannerTitle}
                  </p>
                  <p
                    className="text-white text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: data?.bannerDescription }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      {isbannerAdvertisementLoading && <DashboardProfileCardShimmer />}
      <style>{`
  .custom-dots .slick-dots {
    bottom: 10px;
  }
  .custom-dots .slick-dots li {
    margin: 0 1.5px; /* Reduced spacing between dots */
  }
  .custom-dots .slick-dots li button:before {
    color: #0A1C40 !important;
    font-size: 10px; /* Adjust size if needed */
  }
`}</style>

    </>
  );
};
