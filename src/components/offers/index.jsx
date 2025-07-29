import { Link, useLocation, useNavigate } from "react-router-dom";
// import { offers } from "../../database/index";
import { Button } from "../buttons/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../redux/actions/offer-action";
import { OfferShimmer } from "../loader/OfferShimmer";
import { NoData } from "../errors/noData";
import { LinkButton } from "../link";
import client from "../../redux/axios-baseurl";

export const Offers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get('token');

  //get offers from store.offer
  const { totalCount, error } = useSelector((state) => state.offers);

  const [offers, setOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("offers:::", offers, isLoading);

  //useEffect here.. to fetch/dispatch all offer in store
  useEffect(() => {
    // console.log("Offer page render");

    // dispatch(getOffers({}));

    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        // console.log(token, "token")

        // if (!token) {
        //   return rejectWithValue("No token found");
        // }
        const response = await client.get("/admin/offer", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenFromUrl || token}`,
          },
          params: { page: 1 },
        });
        console.log("fetchOffer", response.data?.data?.offers);
        setOffers(response.data?.data?.offers);
      } catch (error) {
        console.log(error, "get offer list error");
        // return rejectWithValue(error.response?.data || "Something went wrong");
      } finally {
        // console.log("Finally block");
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (isLoading) return <OfferShimmer count={2} />;
  console.log(offers);
  return (
    <>
      <div className="flex flex-col corpzo-dashboard-step-14 ">
        <div className="flex justify-between items-center mt-1">
          <p className="font-semibold text-[16px] text-[#0A1C40] mb-1">
            Offers
          </p>

          {offers?.length > 0 && offers?.length > 2 && (
                <Link className="font-medium text-xs text-[#828282] hover:text-primaryText" to={"/offersDetails"}>
                  View All
                </Link>
              )}
        </div>

        <hr className="mb-6" />
        {offers?.length ? (
          offers?.slice(0, 2)?.map((offer, index) => (
            <div className="!rounded-lg overflow-hidden mb-2" key={index}>
              <div
                key={index}
                className="xl:flex rounded-lg px-2 py-2 bg-[#EEEFF3] hover:shadow-lg"
              >
                <div className=" w-full h-[100px] xl:w-[100px] xl:h-auto xl:min-h-[100px] rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={`${
                      offer?.imageUrl
                        ? offer?.imageUrl
                        : "https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg"
                    }`}
                    alt=""
                    className="size-full object-center object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between gap-1 bg-[#EEEFF3] xl:pl-3">
                  <div>
                    <div className="flex justify-center xl:justify-start line-clamp-1">
                      <p className="font-bold text-[12.64px] text-[#1A202E]">
                        {offer.offerTitle}
                      </p>
                    </div>
                    <p className="font-normal pr-2 line-clamp-2 text-[12px] text-[#737373] ">
                      <span className="ml-1">
                        {offer.offerservices?.[0]?.services?.[0]?.name}
                      </span>
                    </p>
                    <p className="font-extrabold text-[#EB9527] text-[14.05px] text-start">
                      {`${offer?.discountType === "fixed" ? "₹ " : ""}${
                        offer.discountPercent
                      }${offer?.discountType === "percentage" ? "%" : ""} OFF`}
                    </p>
                    <p className="font-normal pr-2 line-clamp-2 text-[12px] text-[#737373] ">
                      {offer?.offerDetail}
                    </p>
                  </div>
                  <div className="flex pt-2">
                    <Button
                      outline={true}
                      onClick={() =>
                        navigate(
                          offer?.offerservices?.[0]?.serviceId
                            ? `/services/detail/${offer?.offerservices?.[0]?.serviceId}`
                            : `/services`
                        )
                      }
                    >
                      Avail Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData
            className={"h-auto w-[60%] ml-16"}
            title="Check back later for offers"
            textSize="small"
          />
        )}
      </div>
    </>
  );
};
