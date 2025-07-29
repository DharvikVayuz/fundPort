// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ImSpinner, ImSpinner2 } from "react-icons/im";
// import { Heading } from "../../heading";
// import { formatReadableDate } from "../../../utils";
// import ShareMetaTags from "../../../pages/Insights/Components/metTags.jsx";
// import parse from "html-react-parser";  // Importing html-react-parser
// import { getSidePannelInsights } from "../../../redux/actions/insight-action.js";

// const InsightDetail = () => {
//   const {
//     isInsightLoading,
//     insights,
//     totalInsights,
//     sidePannelInsights,
//   } = useSelector((state) => state.insights);
//   const { insightId } = useParams();
//   console.log(insightId, insights, sidePannelInsights, "insightId")
//   const [insightDetail, setInsightDetail] = useState({});
//   const [metaTitle, setMetaTitle] = useState("Insights")
//   const [metaImage, setMetaImage] = useState("")
//   const [metaDescription, setMetaDescription] = useState("")
//   const dispatch = useDispatch();

//   const findInsight = (id) => {
//     console.log(id, "insightId")
//     return (
//       insights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//       sidePannelInsights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//       null
//     );
//   };

//   console.log(insightDetail, "insightDetail")
//   useEffect(() => {
//     const selectedInsight = findInsight(insightId);
//     console.log(insightDetail, "insioghtDetail")
//     setInsightDetail(selectedInsight);
//     setMetaTitle(selectedInsight?.title);
//     setMetaImage(selectedInsight?.banner);

//     if (typeof selectedInsight?.description === "string") {
//       const sanitizedDescription = parse(selectedInsight.description);
//       setMetaDescription(sanitizedDescription?.props?.children || "");
//     } else {
//       setMetaDescription(""); // Fallback for empty descriptions
//     }
//   }, [insightId, insightDetail]);

//   useEffect(() => {
//     dispatch(getSidePannelInsights({ page: 1 }));
//   }, [])
//   if (isInsightLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ImSpinner2 />
//       </div>
//     );
//   }

//   // if (!insightDetail) {
//   //   return (
//   //     <div className="flex justify-center items-center h-screen text-lg">
//   //       Insight not found
//   //     </div>
//   //   );
//   // }

//   return (
//     <>
//       <ShareMetaTags
//         pageTitle={metaTitle}
//         pageDescription={metaDescription ? metaDescription : null}
//         pageImage={metaImage ? metaImage : null}
//       />
//       <div className="flex flex-col md:flex-row justify-between gap-6">
//         <Heading title={"Insight Details"} backButton={true}>
//           Insight Details
//         </Heading>
//       </div>
//       <div className="">
//         {/* Banner Image */}
//         <div
//           className="w-full h-64 bg-cover bg-center rounded-lg overflow-hidden"
//           style={{ backgroundImage: `url(${insightDetail?.banner})` }}
//         >
//           {/* Optional Overlay */}
//           <div className="w-full h-full bg-black opacity-40"></div>
//         </div>

//         {/* Author Profile */}

//         <div className="mt-4 flex items-start gap-2">
//           <img
//             className="w-8 h-8 inset-0 rounded-full object-cover"
//             src={
//               insightDetail?.profile_picture_url
//                 ? insightDetail?.profile_picture_url
//                 : "/images/insights/user-logo.svg"
//             }
//             alt="profile-pic"
//           />
//           <div className="flex flex-col">
//             <h4 className="font-medium leading-3 mb-1">
//               {insightDetail?.authorName}
//             </h4>
//             <span className="text-xs text-[#7785A5">
//               {formatReadableDate(insightDetail?.createdAt)}
//             </span>
//           </div>
//         </div>

//         {/* Insight Heading */}
//         <h1 className="text-3xl md:text-4xl font-semibold text-[#1A202E] mt-4">
//           {insightDetail?.title}
//         </h1>

//         {/* Description */}
//         <div
//           className="mt-4 text-lg text-[#0A1C40] leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: insightDetail?.description }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default InsightDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ImSpinner2 } from "react-icons/im";
// import { Helmet } from "react-helmet-async";
// import { Heading } from "../../heading";
// import { formatReadableDate } from "../../../utils";
// import { getSidePannelInsights } from "../../../redux/actions/insight-action.js";

// const InsightDetail = () => {
//   const { isInsightLoading, insights, sidePannelInsights } = useSelector((state) => state.insights);
//   const { insightId } = useParams();
//   const dispatch = useDispatch();

//   const [insightDetail, setInsightDetail] = useState(null);
//   const [metaTitle, setMetaTitle] = useState("Insights");
//   const [metaImage, setMetaImage] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");

//   useEffect(() => {
//     dispatch(getSidePannelInsights({ page: 1 }));
//   }, [dispatch]);

//   useEffect(() => {
//     const findInsight = (id) => {
//       return (
//         insights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//         sidePannelInsights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//         null
//       );
//     };

//     const selectedInsight = findInsight(insightId);
//     if (selectedInsight) {
//       setInsightDetail(selectedInsight);
//       setMetaTitle(selectedInsight?.title || "Insight Details");
//       setMetaImage(selectedInsight?.banner || "/default-banner.jpg");

//       // Convert HTML description to plain text
//       const tempElement = document.createElement("div");
//       tempElement.innerHTML = selectedInsight?.description || "";
//       setMetaDescription(tempElement.innerText.trim() || "Explore our latest insights.");
//     }
//   }, [insightId, insights, sidePannelInsights]);

//   if (isInsightLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ImSpinner2 className="animate-spin text-xl" />
//       </div>
//     );
//   }

//   if (!insightDetail) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg">
//         Insight not found
//       </div>
//     );
//   }

//   console.log(metaTitle, metaDescription, metaImage, "meta tags")
//   return (
//     <>
//       {/* Helmet for SEO & Social Sharing */}
//       <Helmet>
//         <title>{metaTitle}</title>
//         <meta name="description" content={metaDescription} />
//         <meta property="og:title" content={metaTitle} />
//         <meta property="og:description" content={metaDescription} />
//         <meta property="og:image" content={metaImage} />
//         <meta property="og:url" content={window.location.href} />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metaTitle} />
//         <meta name="twitter:description" content={metaDescription} />
//         <meta name="twitter:image" content={metaImage} />
//       </Helmet>

//       <div className="flex flex-col md:flex-row justify-between gap-6">
//         <Heading title="Insight Details" backButton={true}>
//           Insight Details
//         </Heading>
//       </div>

//       <div className="">
//         {/* Banner Image */}
//         <div
//           className="w-full h-64 bg-cover bg-center rounded-lg overflow-hidden"
//           style={{ backgroundImage: `url(${insightDetail?.banner})` }}
//         >
//           <div className="w-full h-full bg-black opacity-40"></div>
//         </div>

//         {/* Author Profile */}
//         <div className="mt-4 flex items-start gap-2">
//           <img
//             className="w-8 h-8 rounded-full object-cover"
//             src={insightDetail?.profile_picture_url || "/images/insights/user-logo.svg"}
//             alt="Author"
//           />
//           <div className="flex flex-col">
//             <h4 className="font-medium leading-3 mb-1">{insightDetail?.authorName}</h4>
//             <span className="text-xs text-[#7785A5]">
//               {formatReadableDate(insightDetail?.createdAt)}
//             </span>
//           </div>
//         </div>

//         {/* Insight Heading */}
//         <h1 className="text-3xl md:text-4xl font-semibold text-[#1A202E] mt-4">
//           {insightDetail?.title}
//         </h1>

//         {/* Description */}
//         <div
//           className="mt-4 text-lg text-[#0A1C40] leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: insightDetail?.description }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default InsightDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ImSpinner2 } from "react-icons/im";
// import { Helmet } from "react-helmet-async";
// import { Heading } from "../../heading";
// import { formatReadableDate } from "../../../utils";
// import { getSidePannelInsights } from "../../../redux/actions/insight-action.js";

// const InsightDetail = () => {
//   const { isInsightLoading, insights, sidePannelInsights } = useSelector((state) => state.insights);
//   const { insightId } = useParams();
//   const dispatch = useDispatch();

//   const [insightDetail, setInsightDetail] = useState(null);
//   const [metaTitle, setMetaTitle] = useState("Insights");
//   const [metaImage, setMetaImage] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");

//   useEffect(() => {
//     dispatch(getSidePannelInsights({ page: 1 }));
//   }, [dispatch]);

//   useEffect(() => {
//     const findInsight = (id) => {
//       return (
//         insights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//         sidePannelInsights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
//         null
//       );
//     };

//     const selectedInsight = findInsight(insightId);
//     if (selectedInsight) {
//       setInsightDetail(selectedInsight);
//       setMetaTitle(selectedInsight?.title || "Insight Details");
//       setMetaImage(selectedInsight?.banner || "/default-banner.jpg");

//       // Convert HTML description to plain text
//       const tempElement = document.createElement("div");
//       tempElement.innerHTML = selectedInsight?.description || "";
//       let plainText = tempElement.innerText.trim() || "Explore our latest insights.";

//       // Slice the description to a max of 250 characters and add "..." if it's truncated
//       setMetaDescription(plainText.length > 250 ? plainText.slice(0, 250) + "..." : plainText);
//       }
//   }, [insightId, insights, sidePannelInsights]);

//   useEffect(() => {
//     document.title = metaTitle;

//     const metaDescriptionTag = document.querySelector('meta[name="description"]');
//     if (metaDescriptionTag) {
//       metaDescriptionTag.setAttribute("content", metaDescription);
//     }

//     const ogTitle = document.querySelector('meta[property="og:title"]');
//     const ogDescription = document.querySelector('meta[property="og:description"]');
//     const ogImage = document.querySelector('meta[property="og:image"]');
//     const ogUrl = document.querySelector('meta[property="og:url"]');

//     if (ogTitle) ogTitle.setAttribute("content", metaTitle);
//     if (ogDescription) ogDescription.setAttribute("content", metaDescription);
//     if (ogImage) ogImage.setAttribute("content", metaImage);
//     if (ogUrl) ogUrl.setAttribute("content", window.location.href);

//     const twitterTitle = document.querySelector('meta[name="twitter:title"]');
//     const twitterDescription = document.querySelector('meta[name="twitter:description"]');
//     const twitterImage = document.querySelector('meta[name="twitter:image"]');

//     if (twitterTitle) twitterTitle.setAttribute("content", metaTitle);
//     if (twitterDescription) twitterDescription.setAttribute("content", metaDescription);
//     if (twitterImage) twitterImage.setAttribute("content", metaImage);
//   }, [metaTitle, metaDescription, metaImage]);

//   if (isInsightLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ImSpinner2 className="animate-spin text-xl" />
//       </div>
//     );
//   }

//   if (!insightDetail) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg">
//         Insight not found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col md:flex-row justify-between gap-6">
//         <Heading title="Insight Details" backButton={true}>
//           Insight Details
//         </Heading>
//       </div>

//       <div className="">
//         {/* Banner Image */}
//         <div
//           className="w-full h-64 bg-cover bg-center rounded-lg overflow-hidden"
//           style={{ backgroundImage: `url(${insightDetail?.banner})` }}
//         >
//           <div className="w-full h-full bg-black opacity-40"></div>
//         </div>

//         {/* Author Profile */}
//         <div className="mt-4 flex items-start gap-2">
//           <img
//             className="w-8 h-8 rounded-full object-cover"
//             src={insightDetail?.profile_picture_url || "/images/insights/user-logo.svg"}
//             alt="Author"
//           />
//           <div className="flex flex-col">
//             <h4 className="font-medium leading-3 mb-1">{insightDetail?.authorName}</h4>
//             <span className="text-xs text-[#7785A5]">
//               {formatReadableDate(insightDetail?.createdAt)}
//             </span>
//           </div>
//         </div>

//         {/* Insight Heading */}
//         <h1 className="text-3xl md:text-4xl font-semibold text-[#1A202E] mt-4">
//           {insightDetail?.title}
//         </h1>

//         {/* Description */}
//         <div
//           className="mt-4 text-lg text-[#0A1C40] leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: insightDetail?.description }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default InsightDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { Helmet } from "react-helmet-async";
import { Heading } from "../../heading";
import { formatReadableDate } from "../../../utils";
import { getSidePannelInsights } from "../../../redux/actions/insight-action.js";

const InsightDetail = () => {
  const { isInsightLoading, insights, sidePannelInsights } = useSelector(
    (state) => state.insights
  );
  const { insightId } = useParams();
  const dispatch = useDispatch();

  const [insightDetail, setInsightDetail] = useState(null);
  const [metaTitle, setMetaTitle] = useState("Insights");
  const [metaImage, setMetaImage] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    dispatch(getSidePannelInsights({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const findInsight = (id) => {
      return (
        insights.find((insight) => insight.metaUrl.replace(/\?$/, "") === id) ||
        sidePannelInsights.find(
          (insight) => insight.metaUrl.replace(/\?$/, "") === id
        ) ||
        null
      );
    };

    const selectedInsight = findInsight(insightId);
    if (selectedInsight) {
      setInsightDetail(selectedInsight);
      setMetaTitle(selectedInsight?.title || "Insight Details");
      setMetaImage(selectedInsight?.banner || "/default-banner.jpg");

      // Convert HTML description to plain text
      const tempElement = document.createElement("div");
      tempElement.innerHTML = selectedInsight?.description || "";
      let plainText =
        tempElement.innerText.trim() || "Explore our latest insights.";

      // Slice the description to a max of 250 characters and add "..." if it's truncated
      setMetaDescription(
        plainText.length > 250 ? plainText.slice(0, 250) + "..." : plainText
      );
    }
  }, [insightId, insights, sidePannelInsights]);
  console.log(insightDetail);
  return (
    <>
      {/* Meta Tags for Sharing */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>

      {isInsightLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ImSpinner2 className="animate-spin text-xl" />
        </div>
      ) : !insightDetail ? (
        <div className="flex justify-center items-center h-screen text-lg">
          Insight not found
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <Heading title="Insight Details" backButton={true}>
              Insight Details
            </Heading>
          </div>

          <div className="">
            <div className="w-full  xl:h-64">
              <img
                src={insightDetail?.banner}
                alt="blog"
                className="size-full object-cover"
              />
            </div>
            {/* Author Profile */}
            <div className="mt-4 flex items-start gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={
                  insightDetail?.profile_picture_url ||
                  "/images/insights/user-logo.svg"
                }
                alt="Author"
              />
              <div className="flex flex-col">
                <h4 className="font-medium leading-3 mb-1">
                  {insightDetail?.authorName}
                </h4>
                <span className="text-xs text-[#7785A5]">
                  {formatReadableDate(insightDetail?.createdAt)}
                </span>
              </div>
            </div>

            {/* Insight Heading */}
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1A202E] mt-4">
              {insightDetail?.title}
            </h1>

            {/* Description */}
            <div
              className="mt-4 text-lg text-[#0A1C40] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: insightDetail?.description }}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default InsightDetail;
