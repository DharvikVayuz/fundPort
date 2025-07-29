import { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#f3f7ff] rounded-xl overflow-hidden mb-2">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between text-[14px] items-center bg-[#f3f7ff] p-4 text-left font-semibold  "
      >
        {title}
        <span className={` ${!isOpen ? "rotate-180" : "rotate-0"}`}>
          <img
            className="rotate-180"
            src="/icons/services/dropdown.svg"
            alt="Collapse"
          />
        </span>
      </button>

      {/* Accordion Content */}
      <div
        className={` overflow-hidden ${
          isOpen ? "max-h-40 px-4 py-2" : "max-h-0 p-0"
        } text-sm`}
      >
        <p className="">{content}</p>
      </div>
    </div>
  );
};

const AccordionGroup = ({ data }) => {
  return (
    <div className="mt-6">
      {data.map(({ title, details }, index) => (
        <div key={index} className="mb-2">
          <Accordion title={title} content={details} />
        </div>
      ))}
    </div>
  );
};

export default AccordionGroup;
