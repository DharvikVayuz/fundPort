import { useState } from "react";
import AccordionGroup from "../accordion";

export const Steps = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  console.log(data, "data from steps");

  const stepsData = [
    {
      label: "Initial Consultation and Assessment",
      description:
        "We begin with a detailed discussion to understand your unique needs.",
    },
    {
      label: "Customised Service Proposal",
      description: "Based on our assessment, we present a tailored proposal.",
    },
    {
      label: "Service Delivery and support",
      description:
        "Our experts implement the solutions while providing ongoing support.",
    },
  ];

  const faqData = [
    {
      question: "What Is A Private Limited Company Registration?",
      answer:
        "As per Section 2 (68) of the Companies Act, 2013, a private company is a unique business entity, distinguished by specific characteristics. It limits the right to transfer its shares.",
    },
    {
      question: "Eligibility",
      answer:
        "A journey towards establishing a private limited company is an exciting venture, filled with opportunities and challenges. Private companies have specific eligibility criteria that must be met.",
    },
    {
      question: "Documents Required",
      answer:
        "A journey towards establishing a private limited company is an exciting venture, filled with opportunities and challenges.",
    },
  ];

  return (
    <>
      <section class="relative overflow-hidden  dark:bg-gray-900 rounded-md">
        <div class="text-center grid gap-1 mb-12">
          <h2 class="mt-6 font-semibold text-3xl text-[#0A1C40]">
            How It Works
          </h2>
          <p class="text-sm text-[#0A1C40]">Get Started in 3 easy steps</p>
        </div>

        <div className=" *:">
          <img src="/Steps3.png" alt="stepsBar" className="size-full" />
        </div>

        <hr className="mt-16" />
        <>
          <h4 className="font-semibold text-3xl text-[#0A1C40] my-12 text-center">
            Everything you need to know about {data?.name}
          </h4>
          <AccordionGroup data={data?.servicesteps} />
        </>
      </section>
    </>
  );
};

const Step = ({ label, description, index }) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <p className="font-medium text-[70px]  text-white">{index}</p>
      <p className="font-bold  text-xs  text-start text-[#F8F8F8]">{label}</p>
      <p className="font-normal text-[11px] text-start text-white ">
        {description}
      </p>
    </div>
  );
};
