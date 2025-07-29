import { useState } from "react";
import { useSelector } from "react-redux";

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { success } = useSelector((state) => state.serviceDetails);
  const faqArray = success?.faqservices;
  const transformedFaqArray = faqArray?.map((item) => {
    const { question, answer } = item.faq[0];
    return {
      question,
      answer,
      icon: "❓",
    };
  });
  console.log(transformedFaqArray, "faqArrayNew");

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "What Services Do You Offer?",
      answer: `
            - Fractional CFO Services
            - Financial Reporting
          `,
      icon: "🛠️",
    },
    {
      question: "Do You Offer Refunds?",
      answer:
        "We are committed to your satisfaction. That's why we offer a money-back guarantee if we're unable to submit your application within 3 working days. We'll issue a full refund. Terms & Conditions apply.",
      icon: "💰",
    },
    {
      question: "What Are Your Fees?",
      answer:
        "Our fees include both government charges and service fees. If you have any questions or concerns about the fees, please don't hesitate to talk with one of our advisors, who will be happy to clarify or assist as needed.",
      icon: "💵",
    },
    {
      question: "How Can I Contact You?",
      answer:
        "You can easily reach us via call or chat to discuss your requirements or address any questions. Our team is here to help guide you through our services and the process to get started.",
      icon: "📞",
    },
  ];
  return (
    <>
      {!transformedFaqArray || transformedFaqArray.length === 0 ? null : (
        <div className="mb-6">
          {/* FAQ Items */}
          <div className="space-y-4">
            <div>
              <h2
                // style={{ fontFamily: "MarsCondensed, sans-serif" }}
                className="font-semibold text-3xl text-[#0A1C40] text-center"
              >
                Frequently Asked Questions
              </h2>
              <p className="mt-1 mb-6 text-[#0A1C40] text-sm text-center">
                Find answers to common questions about our corporate services
                and client concerns.
              </p>
            </div>
            {transformedFaqArray.map((faq, index) => (
              <div
                key={index}
                className="border border-[#f3f7ff] rounded-[10px] overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-3 py-3 bg-[#f3f7ff]  text-left font-medium"
                >
                  <span className="flex items-center font-semibold text-sm">
                    <span className="text-[#0A1C40] font-bold text-2xl mr-2">
                      {faq.icon}
                    </span>
                    {faq.question}
                  </span>
                  <span className="!text-[#0A1C40]  ">
                    {openIndex === index ? (
                      <img
                        className="rotate-180"
                        src="/icons/services/dropdown.svg"
                        alt="Collapse"
                      />
                    ) : (
                      <img src="/icons/services/dropdown.svg" alt="Expand" />
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 py-2 text-[#0A1C40] text-sm">
                    {faq.answer.split("\n").map((line, idx) => (
                      <p
                        key={idx}
                        className="mb-2 !text-[#0A1C40]"
                        dangerouslySetInnerHTML={{ __html: line }}
                      >
                        {/* {line.trim()} */}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
