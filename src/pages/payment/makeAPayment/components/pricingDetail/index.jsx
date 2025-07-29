import { useSelector } from "react-redux";

const PricingDetail = ({
  totalCost,
  offer,
  serviceCost,
  totalSavings,
  data,
  originalPrice,
  availServiceData,
  serviceCharge,
}) => {
  const { success, serviceDetailLoading, appliedCoupons, couponDiscount } =
    useSelector((state) => state.serviceDetails);

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

  return (
    <div className="space-y-6">
      {/* Info text */}
      <p className="text-sm text-gray-500 text-center">
        Choose your payment method to proceed. You can review or modify your
        order before completing payment.
      </p>

      {/* Section Divider */}
      <hr />

      {/* Price Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Final Price</h3>

        {availServiceData?.serviceDetails?.name && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service</span>
            <span className="font-medium text-gray-800">
              {availServiceData?.serviceDetails?.name}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          <span>Service Price</span>
          <span className="font-medium text-gray-800">
            ₹{originalPrice?.toFixed(2)}
          </span>
        </div>

        {offer > 0 && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Offer Discount</span>
            <span className="text-green-600">- ₹{offer.toFixed(2)}</span>
          </div>
        )}

        {serviceCharge > 0 && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service Charge</span>
            <span>₹{serviceCharge.toFixed(2)}</span>
          </div>
        )}

        {appliedCoupons?.length > 0 && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Coupon Discount</span>
            <span className="text-green-600">
              - ₹{couponDiscount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Total Section */}
      <hr />
      <div className="flex justify-between items-center text-base font-semibold text-green-700">
        <span>Total Price</span>
        <span>₹{totalCost.toFixed(2)}</span>
      </div>
      <hr />
    </div>
  );
};

export default PricingDetail;
