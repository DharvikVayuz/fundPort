import { Outlet, useLocation } from "react-router-dom";
import { Heading } from "../../components/heading";
import { RouteProgressBar } from "../../components/progressBar/routeBased";
import { useSelector } from "react-redux";

const Payments = () => {
  const { pathname } = useLocation();
  const { totalTransaction } = useSelector((state) => state.paymentHistory);

  function getPageHeading(pathname) {
    switch (true) {
      case pathname === "/payment":
        return "Make a Payment";
      case pathname === "/payment/create":
        return "Select Business";
      case pathname === "/payment/preview":
        return "Preview Payment";
      case pathname === "/payment/history":
        return `Payment History (${totalTransaction})`;
      default:
        return "";
    }
  }

  const servicesProgessSteps = [
    {
      step: 1,
      bottomLabel: "Make a payment",
      status:
        pathname === "/payment"
          ? "current"
          : [
              "/payment/create",
              "/payment/preview",
              "/payment/history",
            ].includes(pathname)
          ? "completed"
          : "upcoming",
    },
    {
      step: 2,
      bottomLabel: "Select Business",
      status:
        pathname === "/payment/create"
          ? "current"
          : ["/payment/preview", "/payment/history"].includes(pathname)
          ? "completed"
          : "upcoming",
    },
    {
      step: 3,
      bottomLabel: "Preview Business",
      status:
        pathname === "/payment/preview"
          ? "current"
          : ["/payment/history"].includes(pathname)
          ? "completed"
          : "upcoming",
    },
  ];

  const shouldShowProgressBar = pathname !== "/payment/history";

  return (
    <>
      <Heading title={"Payment"} backButton={false}>
        {getPageHeading(pathname)}
      </Heading>
      {/* {shouldShowProgressBar && (
        <RouteProgressBar steps={servicesProgessSteps} />
      )} */}

      <Outlet />
    </>
  );
};

export default Payments;
