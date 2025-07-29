import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../components/buttons";
import { NoData } from "../../../components/errors/noData";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import Pagination from "../../../components/Pagination";
import { Table } from "../../../components/table";
import {
  downloadInvoice,
  getPaymentTransaction,
} from "../../../redux/actions/payment-history-action";
import { talkToAdvisor } from "../../../redux/actions/servicesDetails-actions";
import { clearUrl } from "../../../redux/slices/paymentHistorySlice";
import { formatReadableDate, formatReadableDateTime } from "../../../utils";

const History = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceId, setServiceId] = useState("");
  const {
    paymentHistory,
    isPaymentHistoryLoading,
    isTransactionDownloading,
    downloadTransactionUrl,
    totalTransaction,
    childLoading,
  } = useSelector((state) => state.paymentHistory);
  const { isTalkToAdvisorLoading } = useSelector(
    (state) => state.serviceDetails
  );
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [viewTransactionDetails, setViewTransactionDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const transformedTransactionHistory = paymentHistory?.map((history) => {
    return {
      id: {
        serviceId: history?.serviceId,
      },
      _id: {
        _id: history?._id,
      },
      transaction_id: history?.invoiceNumber,
      status: history?.paymentStatus,
      serviceTitle : history?.serviceDetails?.name || "N/A",
      amount: history?.amount?.toFixed(2),
      paymentMode: history?.paymentMode,
      currency: "INR",
      payment_date: formatReadableDateTime(history?.paymentDate),
    };
  });

  
  const columns = [
    { header: "Invoice Number", accessor: "transaction_id" },
    { header: "Status", accessor: "status" },
    { header: "Service", accessor: "serviceTitle" },
    { header: "Amount", accessor: "amount" },
    { header: "Payment Method", accessor: "paymentMode" },
    { header: "Currency", accessor: "currency" },
    { header: "Payment Date", accessor: "payment_date" },
    { header: "Actions", accessor: "actions" },
  ];

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    const query = searchParams.get("search") || "";
    setCurrentPage(Number(page));
    dispatch(getPaymentTransaction({ page, query }));
  }, [searchParams, dispatch]);

  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };
  const onViewTransactionClose = () => {
    setViewTransactionDetails(false);
  };
  useEffect(() => {
    if (viewTransactionDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [viewTransactionDetails]);
  const openViewTransactionDetails = (id) => {
    setViewTransactionDetails(true);
    const transactionDetails = paymentHistory.filter((payment) => {
      return payment._id === id;
    });

    setTransactionDetails(transactionDetails ? transactionDetails[0] : {});
  };

  const handleNavigation = (direction) => {
    const totalPages = Math.ceil(totalTransaction / 10); // Calculate total pages
    const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;

    if (newPage < 1 || newPage > totalPages) return; // Prevent navigating out of bounds

    setSearchParams({ page: newPage });
  };

  const openCallToAdvisor = (serviceId) => {
    setServiceId(serviceId);
    setConfirmationModal(true);
  };
  const handleTalkTouOurAdvisors = (serviceId) => {
    const requestData = {
      userId: JSON.parse(localStorage.getItem("userInfo"))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now(),
    };
    dispatch(talkToAdvisor(requestData));
  };

  const actionMenu = (id, _id) => {
    return (
      <div className="flex py-2 justify-evenly items-center  ">
        <Button primary={false} onClick={() => openViewTransactionDetails(_id)}>
          <img src="/icons/payment/print.svg" alt="" />
        </Button>
      </div>
    );
  };

  const downloadTransaction = (transactionId) => {
    dispatch(downloadInvoice({ transactionId }));
  };
  useEffect(() => {
    if (downloadTransactionUrl) {
      // Automatically download the file when the URL is available
      const link = document.createElement("a");
      link.href = downloadTransactionUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      dispatch(clearUrl());
      onViewTransactionClose();
    }
  }, [downloadTransactionUrl, dispatch]);

  console.log(transactionDetails, "transactionDetails");

  return (
    <>
      <section className="pt-6">
        {isPaymentHistoryLoading ? (
          <TableShimmer />
        ) : transformedTransactionHistory &&
          transformedTransactionHistory.length > 0 ? (
          <>
            <Table
              isExpandable={false}
              columns={columns}
              data={transformedTransactionHistory}
              actionMenu={actionMenu}
            />
          </>
        ) : (
          <div>
            <NoData title="Initialize Service Payment" />
          </div>
        )}

        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2 pt-4 pb-8">
            {totalTransaction > 10 && (
              <Pagination totalItems={totalTransaction} itemsPerPage={10} />
            )}
          </div>
        </div>
      </section>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src="/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            Call Back Requested.
          </p>
          <p className="font-medium text-[16px] text-[#363636]">
            Your Assistant Manager will get in touch with you soon.
          </p>
          <div className="flex justify-center">
            <Button
              primary={true}
              isLoading={isTalkToAdvisorLoading}
              onClick={() => handleTalkTouOurAdvisors(serviceId)}
            >
              {" "}
              Continue
            </Button>
          </div>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={viewTransactionDetails}
        onClose={onViewTransactionClose}
        modalClassName={"w-full sm:!max-w-4xl"}
      >
        <div ref={contentRef} className="bg-white rounded-2xl space-y-6">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b pb-4">
            <img src="/CorpZLogo-011.png" alt="CorpZ Logo" className="h-10" />
            <div className="flex items-center gap-3">
              <img
                src="/icons/dashboard/business.svg"
                alt="Company Icon"
                className="h-8 w-8"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                CorpZo Pvt. Ltd.
              </h3>
            </div>
          </div>

          {/* Title */}
          <div className="px-6 text-xl font-bold text-gray-900">
            Payment Summary
          </div>

          {/* Scrollable section */}
          <div className="px-6 max-h-[50vh] overflow-y-auto">
            {/* Payment Info Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Invoice No:</span>
                  <span className="text-gray-800 font-semibold">
                    #{transactionDetails?.invoiceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="text-gray-800">
                    {transactionDetails?.transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Issue Date:</span>
                  <span className="text-gray-800">
                    {formatReadableDate(transactionDetails?.paymentDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Billed To:</span>
                  <span className="text-gray-800">CorpZo Pvt. Ltd.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span className="text-gray-800 uppercase">
                    {transactionDetails?.paymentMode}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <p className="font-medium">Service Name:</p>
                  <p
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: transactionDetails?.serviceDetails?.name,
                    }}
                  ></p>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Service Duration:</p>
                  <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: transactionDetails?.serviceDetails?.duration,
                    }}
                  ></p>
                  <p>Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="border-t pt-4 mt-4">
              <div className="w-full md:w-[60%] ml-auto space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>₹ {transactionDetails?.serviceDetails?.cost}</span>
                </div>

                {transactionDetails?.serviceappliedcouponandoffers &&
                  transactionDetails?.totalCouponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-medium">Discount</span>
                      <span>- ₹ {transactionDetails?.totalCouponDiscount}</span>
                    </div>
                  )}

                <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>₹ {transactionDetails?.amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-end items-center gap-4 pt-4 border-t print:hidden">
            <Button
              outline
              className="flex items-center gap-2 px-5 py-2"
              onClick={reactToPrintFn}
            >
              <img
                src="/icons/payment/print.svg"
                alt="Print"
                className="h-4 w-4"
              />
              Print
            </Button>
            <Button
              primary
              className="flex items-center gap-2 px-5 py-2"
              isLoading={isTransactionDownloading}
              onClick={() => downloadTransaction(transactionDetails._id)}
            >
              <img
                src="/icons/payment/download.svg"
                alt="Download"
                className="h-4 w-4"
              />
              Download
            </Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default History;
