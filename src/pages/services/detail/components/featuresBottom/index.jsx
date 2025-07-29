const featuresData = [
  { image: "/icons/services/1.svg", label: "Comprehensive Business Services" },
  {
    image: "/icons/services/2.svg",
    label: "On-Time Delivery Quick Turnaround ",
  },
  { image: "/icons/services/3.svg", label: "Tailored for MSMEs & Startups" },
  {
    image: "/icons/services/4.svg",
    label: "Professional Team of CAs, CSs and Lawyers",
  },
];

export const FeaturesBottom = () => {
  return (
    <div className="my-5 py-[1px]  bg-gradient-to-r from-white via-[#BCBCBC] to-white">
      <div className="py-4 bg-white  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresData.map((data, index) => (
          <IconBox key={index} image={data.image} label={data.label} />
        ))}
      </div>
    </div>
  );
};

const IconBox = ({ image, label }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={image} alt="" className="" />
      <label className="font-semibold text-[11px] text-[#0A1C40]">
        {label}
      </label>
    </div>
  );
};
