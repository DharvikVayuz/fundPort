import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { PdfPreview } from "../../../components/pDFPreview";

export const FundraisePreview = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    getFieldState,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    // defaultValues: business || {},
    // resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    navigate("/fundraise");
  };

  let data;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="my-2 flex flex-col gap-6">
        <div>
          {/* Business Name */}
          <LabelValue
            containerClassName={"justify-center"}
            label={"Business Name"}
            value={data?.businessName || "N/A"}
          />
          <LabelValue
            containerClassName={"pt-4"}
            label={"1. Has the Company raised funds before?"}
            value={data?.businessName || "N/A"}
          />
          <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Column */}
            <div className="w-full grid grid-cols-1 gap-6">
              <LabelValue
                label={"Round Name"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Round Type"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Funding Date"}
                value={data?.businessName || "N/A"}
              />
            </div>

            <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

            {/* Right Column */}
            <div className="w-full h-fit grid grid-cols-1 gap-6">
              <LabelValue
                label={"Lead Investor"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Funding Amount"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Stake Diluted"}
                value={data?.businessName || "N/A"}
              />
            </div>
          </div>
          <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
          <LabelValue
            containerClassName={"pt-4"}
            label={"2. Your current funding requirement?"}
            value={data?.businessName || "N/A"}
          />
          <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Column */}
            <div className="w-full grid grid-cols-1 gap-6">
              <LabelValue
                label={"Round Type"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Funding Amount"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Pre-money Valuation"}
                value={data?.businessName || "N/A"}
              />
            </div>

            <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

            {/* Right Column */}
            <div className="w-full h-fit grid grid-cols-1 gap-6">
              <LabelValue
                label={"Commitment Received ?"}
                value={data?.businessName || "N/A"}
              />
            </div>
          </div>
          <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
          <LabelValue
            containerClassName={"pt-4"}
            label={"3.Your Pitch Deck"}
            value={data?.businessName || "N/A"}
          />
          <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Column */}
            <div className="w-full grid grid-cols-1 gap-6">
              <PdfPreview fileUrl={""} />
            </div>

            <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

            {/* Right Column */}
            <div className="w-full h-fit grid grid-cols-1 gap-6">
              <p>Utilization of the fund</p>
              <LabelValue
                label={"Function"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Amount"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Details"}
                value={data?.businessName || "N/A"}
              />
            </div>
          </div>
          <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
          <LabelValue
            containerClassName={"pt-4"}
            label={"4. Your video pitch"}
          />
          <div className="pt-4 w-full">
            <video className="w-full bg-black h-60">
              <source src=""></source>
            </video>
          </div>
          <LabelValue
            containerClassName={"pt-4"}
            label={"5. Your past revenue details"}
          />
          <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
            {/* Left Column */}
            <div className="w-full grid grid-cols-1 gap-6">
              <LabelValue
                label={"Financial Year"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Currency"}
                value={data?.businessName || "N/A"}
              />
              <LabelValue
                label={"Revenue"}
                value={data?.businessName || "N/A"}
              />
            </div>

            <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

            {/* Right Column */}
            <div className="w-full h-fit grid grid-cols-1 gap-6">
              <LabelValue label={"CM 1"} value={data?.businessName || "N/A"} />
              <LabelValue
                label={"Profit / Loss"}
                value={data?.businessName || "N/A"}
              />
            </div>
          </div>
          <LabelValue
            containerClassName={"pt-4"}
            label={"6. Your Achievements"}
          />
          <LabelValue
            containerClassName={"pt-4"}
            label={"Video Link"}
            value={""}
          />
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-end items-center gap-6">
        <Button onClick={() => navigate(-1)} type="button" outline>
          {"Back"}
        </Button>
        <Button type="submit" primary>
          {"Submit"}
        </Button>
      </div>
    </form>
  );
};

const LabelValue = ({ containerClassName, label, value }) => {
  return (
    <div className={`${containerClassName} flex items-center gap-2`}>
      <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
      {value && <p className="text-gray-600">{value}</p>}
    </div>
  );
};
