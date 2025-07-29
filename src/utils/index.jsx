import { useEffect } from "react";
// var base64 = require("base-64");

export const iconSize = 18

export function objectToQueryString(obj) {
  let parts = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (value !== null && value !== undefined) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    }
  }
  return parts.join("&");
}
export function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative values
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Build the output string
  let ageString = "";
  if (years > 0) ageString += `${years}y `;
  if (months > 0) ageString += `${months}m `;
  if (days > 0) ageString += `${days}d`;

  return ageString.trim() || "0d"; // Fallback if no age units
}

export const capitalize = (word) =>
  `${word?.charAt(0).toUpperCase()}${word?.slice(1)}`;

export const decodeIntoBase64 = (input) => {
  return base64.decode(input);
};
export const incodeIntoBase64 = (input) => {
  return base64.encode(input);
};
export const addParameter = (obj, url, keyword, value) => {
  if (obj[keyword] || obj.hasOwnProperty(keyword)) {
    if (url.includes("?")) {
      url = url + "&" + keyword + "=" + value;
    } else {
      url = url + "?" + keyword + "=" + value;
    }
  }
  return url;
};
// Function to validate number keys for input type tel
const validKey = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];


//  export const validateNumber  =(e)=>{
//   if (e.target.value.endsWith('0') && e.key === '0') {
//     e.preventDefault(); // Prevent typing another '0'
//     return;
//   }
//     if (!validKey.includes(e.key)) {
//       e.preventDefault();
//     }
//   }
export const validateNumber = (e) => {
const inputValue = e.target.value;

// If the first character is '0' and the user tries to type another '0', prevent it
if (inputValue === '0' && e.key === '0') {
  e.preventDefault(); // Prevent typing another '0'
  return;
}

// Allow backspace, delete, arrow keys, etc.
const validKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];

// If the key is not a number or one of the valid control keys, prevent input
if (!/^[0-9]$/.test(e.key) && !validKey.includes(e.key)) {
  e.preventDefault();
}
};

export const validateAlphabet = (e) => {
  const validKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', ' ']

  // Allow only alphabets and space, along with control keys
  if (!/^[a-zA-Z\s]$/.test(e.key) && !validKey.includes(e.key)) {
    e.preventDefault()
  }
};

export const validateProfitValue = (e) => {
  const inputValue = e.target.value;
  const key = e.key;

  // Allow control keys (Backspace, Arrow keys, Delete, etc.)
  const validKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (validKeys.includes(key)) {
    return; // Allow control keys
  }

  // Allow one negative sign at the start
  if (key === '-' && inputValue.length === 0) {
    return; // Allow negative sign if it's the first character
  }

  // Prevent typing negative sign anywhere but the start
  if (key === '-' && inputValue.length > 0) {
    e.preventDefault();
    return;
  }

  // Prevent typing non-numeric characters
  if (!/^[0-9]$/.test(key)) {
    e.preventDefault();
    return;
  }

  // Prevent leading zeros if the first character is already '0'
  if (inputValue === '0' && key === '0') {
    e.preventDefault();
    return;
  }

  // Prevent input if the value is '-0'
  if (inputValue === '-' && key === '0') {
    e.preventDefault();
    return;
  }

  // Prevent more than 10 digits (including negative sign)
  const maxDigits = inputValue.startsWith('-') ? 16 : 15; // 10 digits + 1 negative sign
  if (inputValue.length >= maxDigits) {
    e.preventDefault();
    return;
  }
};

export const dateFormated = (originalDate) => {
  const dateObj = new Date(originalDate);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const formattedTime = dateObj.toLocaleTimeString("en-US");

  const finalDate = `${formattedDate}`;
  // const finalDateTime = `${formattedDate} ${formattedTime}`;

  return finalDate;
};
export const titleCase = (str) => {
  var splitStr = str?.toLowerCase().split(" ");
  for (var i = 0; i < splitStr?.length; i++) {
    splitStr[i] =
      splitStr[i]?.charAt(0).toUpperCase() + splitStr[i]?.substring(1);
  }
  return splitStr?.join(" ");
};

export function filterNumbers(input) {
  var pattern = /[0-9,;{}|<>[\]_\-+=%$#@!~.?/|*`]/g;
  return input?.replace(pattern, "");
}
export function filterSpecleCahr(input) {
  var pattern = /[,;{}|<>[\]_\-+=%$#@!~.?/|*`]/g;
  return input?.replace(pattern, "");
}

export function updateElement(array, index, newData) {
  const updatedArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i === index) {
      const updatedObject = { ...array[i], ...newData };
      updatedArray.push(updatedObject);
    } else {
      updatedArray.push(array[i]);
    }
  }

  return updatedArray;
}

export function checkAllValuesTruthy(obj) {
  for (let value of Object.values(obj)) {
    if (!value) {
      return false;
    }
  }
  return true;
}

export function formatPhoneNumber(phoneNumber) {
  // Remove all non-digit characters from the phone number
  const cleaned = phoneNumber?.replace(/\D/g, "");

  // Apply the desired format
  const match = cleaned?.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
  }

  // Return the original phone number if it doesn't match the expected format
  return phoneNumber;
}

export function formatDateIntoInd(dateString) {
  // Split the date string into an array
  const parts = dateString.split("-");

  // Check if the input is valid
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }

  // Rearrange the parts and join them in the desired format
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];

  return `${day}-${month}-${year}`;
}

export function formatDate(inputDate) {
  try {
    // Check if the input is in DD/MM/YYYY format
    const dateParts = inputDate.split("/");
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JS Date
      const year = parseInt(dateParts[2], 10);

      // Create a new Date object
      const date = new Date(year, month, day);

      // Check if the created date is valid
      if (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      ) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      }
    }

    // Handle JavaScript Date string format
    const jsDate = new Date(inputDate);
    if (!isNaN(jsDate.getTime())) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return jsDate.toLocaleDateString("en-US", options);
    }

    // If input is not valid or date is not correct
    return "Invalid date";
  } catch (e) {
    return "Invalid date";
  }
}

export function convertToTitleCase(input) {
  if (input.length === 0) return input; // Handle empty string
  let inputTemp = input.toLowerCase()
  return inputTemp.charAt(0).toUpperCase() + inputTemp.slice(1);
}


export function isDateWithinPeriod(futureDate, timePeriodDays) {
  try {
    // Parse the future date
    const future = new Date(futureDate);

    // Check if the future date is valid
    if (isNaN(future.getTime())) {
      return false; // Invalid future date
    }

    // Get today's date
    const today = new Date();

    // Get the end date of the period
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + timePeriodDays + 15);

    // Check if the future date is within the period
    return future <= endDate;
  } catch (e) {
    return false;
  }
}

export function convertBooleanToNumber(value) {
  return value === true ? 1 : 0;
}

export function checkValueInUrl(url, valueToCheck) {
  const urlParts = url.split("/");
  return urlParts.includes(valueToCheck);
}
export const getValueLabel = (param) => {
  if (param === 0) {
    return "No";
  } else if (param === 1) {
    return "Yes";
  } else {
    return "Invalid parameter"; // Handle other cases if needed
  }
};

export const getCountryNameById = (countryId, countryListData) => {
  try {
    const country = countryListData?.find(
      (item) => item?.country_id == countryId
    );
    if (country) {
      return country?.country;
    } else {
      throw new Error(`Country with ID ${countryId} not found.`);
    }
  } catch (error) {
    return null;
  }
};

export function convertToDecimalYears(years, months) {
  const totalMonths = years * 12 + months;
  const decimalYears = totalMonths / 12;

  return parseFloat(decimalYears.toFixed(1));
}

export function ensureHttps(url) {
  if (!/^(https?:\/\/)/.test(url)) {
    url = `https://${url}`;
  }

  return url;
}

export function removeExtraSpaces(input) {
  // Replace consecutive spaces with a single space and trim
  return input?.replace(/\s{2,}/g, " ").trim();
}

export function checkNumberLength(number) {
  // Convert the number to a string and get its length
  var numberLength = number?.toString()?.length;

  // Check if the length is greater than or equal to 10 and less than or equal to 12
  if (numberLength >= 9 && numberLength <= 20) {
    // If true, return true
    return true;
  } else {
    // If false, return false
    return false;
  }
}

export function isBothValid(isValid, numberCheck) {
  // Check if both isValid and numberCheck are true
  return isValid && numberCheck;
}

// Function to listen for sign-out events
export const listenForSignOut = () => {
  window.addEventListener("storage", (event) => {
    if (event.key === "signOutEvent") {
      // Reload the page or perform any action
      window.location.reload();
    }
  });
};

export const listenForLogin = () => {
  window.addEventListener("storage", (event) => {
    if (event.key === "loginEvent") {
      // Reload the page or perform any action
      window.location.reload();
    }
  });
};

// export function convertToCustomFormat(inputDate) {
//   const date = new Date(inputDate);

//   // Get individual components
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//   const day = date.getDate().toString().padStart(2, '0');
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   const seconds = date.getSeconds().toString().padStart(2, '0');

//   // Format the result
//   const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//   return formattedDate;
// }
// Example usage
// const inputTimestamp = '2024-01-05T15:00:00.000Z';
// const formattedTimestamp = convertTimestamp(inputTimestamp);
// console.log(formattedTimestamp);

export function convertToCustomFormat(inputDate) {
  const date = new Date(inputDate);

  // Adjust for time zone offset
  const timezoneOffsetInMinutes = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - timezoneOffsetInMinutes);

  // Get individual components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Format the result
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

// const inputDateString = "Thu Dec 07 2023 16:22:47 GMT+0530 (India Standard Time)";
// const formattedDate = convertToCustomFormat(inputDateString);

// console.log(formattedDate);

export function convertDateFormat(inputDate) {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Format the date without adjusting for the local time zone
  const formattedDate = parsedDate
    ?.toISOString()
    ?.replace("T", " ")
    ?.replace(/\.\d{3}Z$/, "");

  return formattedDate;
}

// Helper function to pad single-digit numbers with leading zero
function padZero(num) {
  return num < 10 ? "0" + num : num;
}
export const isObjectValid = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !obj[key]) {
      return false;
    }
  }
  return true;
};

// Example usage:
// const inputDate = 'Thu Dec 07 2023 21:42:50 GMT+0530 (India Standard Time)';
// const outputDate = convertDateFormat(inputDate);
// console.log(outputDate);

export function removeAfterFirstWhitespace(inputString) {
  // If there's no whitespace, return the first character
  if (!/\s/.test(inputString)) {
    return inputString.slice(0, 1); // Return the first character
  }

  let parts = inputString.split(/\s+/);
  return parts[0];
}

export function removeAfterFourthWhitespace(inputString) {
  if (!/\s/.test(inputString)) {
    return inputString.slice(0, 20) + "..."; // Return the first 20 characters
  }

  let parts = inputString.split(/\s+/);
  return parts.slice(0, 4).join(" ") + "...";
}

export function removeAfterTenthWhitespace(inputString) {
  if (!/\s/.test(inputString)) {
    return inputString.slice(0, 20) + ".."; // Return the first 20 characters
  }

  let parts = inputString.split(/\s+/);
  return parts.slice(0, 10).join(" ") + "..";
}

export function removeAfterTwentiethWhitespace(inputString) {
  if (!/\s/.test(inputString)) {
    return inputString.slice(0, 20) + "..."; // Return the first 20 characters
  }

  let parts = inputString.split(/\s+/);
  return parts.slice(0, 20).join(" ") + "...";
}

export function removeAfterFortiethWhitespace(inputString) {
  if (!/\s/.test(inputString)) {
    return inputString.slice(0, 20) + "..."; // Return the first 20 characters
  }

  let parts = inputString.split(/\s+/);
  return parts.slice(0, 40).join(" ") + "...";
}

export function removeAfterTenthCharacters(inputString) {
  // If the string is longer than 10 characters, truncate it and add "..."
  if (inputString.length > 10) {
    return inputString.slice(0, 10) + "...";
  }
  return inputString; // Return the original string if it's 10 characters or less
}
export function removeAfterTwentyCharacters(inputString) {
  // If the string is longer than 20 characters, truncate it and add "..."
  if (inputString.length > 20) {
    return inputString.slice(0, 20) + "...";
  }
  return inputString; // Return the original string if it's 20 characters or less
}

export const processDataByStatus = (responseData) => {
  // Initial states for different application statuses
  const rejectedApplications = [];
  const hiredApplications = [];
  const interviewApplications = [];
  const offerApplication = [];
  const shortlistedApplication = [];

  // Iterate through the response data and distribute based on application status
  responseData.forEach((application) => {
    switch (application.applicationStatus) {
      case "Rejected":
        rejectedApplications.push(application);
        break;
      case "Hired":
        hiredApplications.push(application);
        break;
      case "Interview":
        interviewApplications.push(application);
        break;
      case "Offer":
        offerApplication.push(application);
        break;
      case "Shortlisted":
        shortlistedApplication.push(application);
        break;
      // Add more cases for other application statuses as needed
      default:
        // Handle default case if needed
        break;
    }
  });

  // Return an object containing the distributed data
  return {
    rejectedApplications,
    hiredApplications,
    interviewApplications,
    offerApplication,
    shortlistedApplication,
    isSubstringAvailable,
    // Add more properties for other application statuses as needed
  };
};

export function isSubstringAvailable(mainString, searchString) {
  // Check if the mainString contains the searchString
  return typeof mainString === "string" && mainString.includes(searchString);
}

export const generateID = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 7; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

export const getInitials = (name) => {
  // Split the name by spaces
  const words = name?.trim()?.split(" ");

  // Get the first letter of each word and join them together
  const initials = words
    ?.map((word) => word?.charAt(0)?.toUpperCase())
    ?.join("");

  return initials;
};

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export const periodToDays = (valueOne, valueTwo) => {
  const monthsToDays = (months) => months * 30; // Rough estimate: 1 month = 30 days
  return monthsToDays(Number(valueOne)) + Number(valueTwo || 0); // Default to 0 if valueTwo is undefined
};

export const getMaxContractStartDate = () => {
  const now = new Date();
  const maxDate = new Date(now.setMonth(now.getMonth() + 8));
  return maxDate;
};

export function convertToDateObjectString(dateString) {
  const [datePart, timePart = "00:00:00"] = dateString.split(" ");

  const [year, month, day] = datePart.split("-").map(Number);

  const [hours, minutes, seconds] = timePart?.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  return date.toString();
}

export function convertDateToISOFormat(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const timeString = "00:00:00";

  return `${formattedDate} ${timeString}`;
}

export const convertDateToISO = (date) => {
  if (date && typeof date == "object") {
    return date.toISOString();
  } else if (date && typeof date == "string") {
    let dateVal = new Date(date);
    return dateVal.toISOString();
  } else {
    return null;
  }
};
export const convertISOToDate = (dateString) =>
  dateString ? new Date(dateString) : null;

export const createOptions = (array, firstVal, secondVal) => {
  let communitiesOptions = array?.map((obj) => ({
    label: obj.firstVal,
    value: obj.secondVal,
  }));
};


export function formatMillisecondsToDate(timestampString) {
  const date = new Date(Number(timestampString)); // Convert the string to a number and then to a Date object
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


export const formatReadableDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

export const formatReadableDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${datePart} ${timePart}`;
};


export function mergeArrays(couponArray = [], offerArray = []) {
  // console.log(couponArray, "from function")
  // Filter out objects with no data (empty objects) from both arrays
  const validCouponArray = couponArray.filter(obj => Object.keys(obj).length > 0);
  const validOfferArray = offerArray.filter(obj => Object.keys(obj).length > 0);

  // If both arrays have data, merge them
  if (validCouponArray.length > 0 && validOfferArray.length > 0) {
      return [...validCouponArray, ...validOfferArray];
  }
  
  // If only one array has data, return that array
  if (validCouponArray.length > 0) {
      return validCouponArray;
  }

  if (validOfferArray.length > 0) {
      return validOfferArray;
  }

  // If no array has data, return an empty array
  return [];
}

// export function calculateFinalPrice(data, { serviceId, moduleId = {}, coupon = null }, state) {
//   // Validate data
//   if (!data || !Array.isArray(data) || !data.length) {
//     console.error("Invalid data");
//     return null;
//   }

//   let basePrice = 0; // Initialize base price
//   let offerDetails = {}; // Store offer details
//   let couponDetails = {}; // Store coupon details
//   let totalOfferDiscount = 0; // Discount from offers
//   let totalCouponDiscount = 0; // Discount from coupons
//   let finalPrice = 0; // Final calculated price

//   // Step 1: Determine base price using moduleId (subscriptionId or quotationId)
//   if (serviceId && moduleId.subscriptionId) {
//     // Case: Service ID and Subscription ID
//     const subscription = data[0]?.subscription?.find(sub => sub._id === moduleId.subscriptionId);
//     const service = data[0]?.services?.find(svc => svc._id === serviceId);

//     if (subscription && service) {
//       basePrice = subscription.amount || 0;
//     } else {
//       console.error("Invalid Service ID or Subscription ID");
//       return null;
//     }
//   } else if (serviceId && moduleId.quotationId) {
//     // Case: Service ID and Quotation ID
//     const quotation = data[0]?.quotations?.find(qtn => qtn._id === moduleId.quotationId);
//     const service = data[0]?.services?.find(svc => svc._id === serviceId);

//     if (quotation && service) {
//       basePrice = quotation.amount || 0;
//     } else {
//       console.error("Invalid Service ID or Quotation ID");
//       return null;
//     }
//   } else if (serviceId) {
//     // Case: Only Service ID
//     const service = data[0]?.services?.find(svc => svc._id === serviceId);

//     if (service) {
//       basePrice = service.amount || 0;
//     } else {
//       console.error("Invalid Service ID");
//       return null;
//     }
//   } else {
//     console.error("Service ID is required");
//     return null;
//   }

//   finalPrice = basePrice; // Start with base price

//   // Step 2: Apply offers
//   const offer = data[0]?.offerservices?.[0]?.offers?.[0];
//   if (offer) {
//     let discountAmount = 0;

//     // Apply percentage discount
//     if (offer.discountPercent) {
//       discountAmount = basePrice * (offer.discountPercent / 100);
//       totalOfferDiscount += discountAmount;
//       finalPrice -= discountAmount;
//     }

//     // Apply direct discount
//     if (offer.discountPrice) {
//       totalOfferDiscount += offer.discountPrice;
//       finalPrice -= offer.discountPrice;
//     }

//     offerDetails = {
//       discountPercent: offer.discountPercent || 0,
//       discountPrice: offer.discountPrice || 0,
//       offerId: offer._id || null,
//       discountType: offer.discountPercent ? "percentage" : "direct",
//       usage: "Multi Use",
//       amount: totalOfferDiscount,
//     };
//   }

//   // Step 3: Apply coupon
//   if (coupon && typeof coupon === "object") {
//     let couponDiscountAmount = 0;

//     if (coupon.discountPercent) {
//       couponDiscountAmount = basePrice * (coupon.discountPercent / 100);
//       totalCouponDiscount += couponDiscountAmount;
//       finalPrice -= couponDiscountAmount;
//     }

//     if (coupon.discountPrice) {
//       totalCouponDiscount += coupon.discountPrice;
//       finalPrice -= coupon.discountPrice;
//     }

//     couponDetails = {
//       couponId: coupon.couponId || null,
//       discountType: coupon.discountPercent ? "percentage" : "direct",
//       discountPercent: coupon.discountPercent || 0,
//       discountPrice: coupon.discountPrice || 0,
//       amount: couponDiscountAmount,
//     };
//   } else if (coupon) {
//     console.warn("Invalid coupon format. It should be an object.");
//   }

//   // Ensure final price is not negative
//   finalPrice = Math.max(finalPrice, 0);

//   // Update state
//   state.basePrice = basePrice;
//   state.offerDetails = offerDetails;
//   state.couponDetails = couponDetails;
//   state.totalOfferDiscount = totalOfferDiscount;
//   state.totalCouponDiscount = totalCouponDiscount;
//   state.finalPrice = finalPrice;

//   // Save final price to localStorage
//   localStorage.setItem("finalPrice", finalPrice.toFixed(2));

//   // Log details
//   console.log(`Final price calculated and saved: ${finalPrice.toFixed(2)}`);
//   console.log(`Total Offer Discount: ${totalOfferDiscount}`);
//   console.log(`Total Coupon Discount: ${totalCouponDiscount}`);
//   console.log("Offer details:", offerDetails);
//   console.log("Coupon details:", couponDetails);

//   return finalPrice.toFixed(2); // Return final price as a string
// }

export function calculateFinalPrice(data, subscriptionId, state) {
  // console.log(data, "Input data");

  // Validate if the data array exists and has elements
  if (!data || !data.length) {
    // console.error("Invalid data");
    return { finalPrice: 0, discountAmount: 0 }; // Return default values
  }

  let finalPrice = data[0]?.cost || 0; // Start with the original cost
  let discountAmount = 0; // Initialize discount amount
  // console.log(finalPrice, "Initial cost from data");

  // Case 1: Handle Quotation (offers will not be applied)
  if (data[0]?.quotation) {
    finalPrice = data[0]?.quotation.amount || 0;
    // console.log("Quotation amount used:", finalPrice);

    // No offer should be applied in case of quotation
    return {
      finalPrice: finalPrice.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
    };
  }

  // Case 2: If a subscription is selected, use the subscription amount
  if (subscriptionId) {
    const subscription = data[0]?.subscription?.find((sub) => sub._id === subscriptionId);
    if (subscription) {
      finalPrice = subscription.amount;
      // console.log("Using subscription amount:", finalPrice);
    } else {
      // console.error("Subscription ID not found");
    }
  }

  // Case 3: If an offer is applied, calculate the discount
  const offer = data[0]?.offerservices?.[0]?.offers?.[0];
  let offerDetails = {};
  if (offer) {
    if (offer.discountPercent) {
      // Apply percentage discount
      discountAmount = finalPrice * (offer.discountPercent / 100);
      state.totalCouponDiscount = (state.totalCouponDiscount || 0) + discountAmount;
      finalPrice -= discountAmount;
      // console.log(`Applied percentage discount: ${offer.discountPercent}%, Discount Amount: ${discountAmount}`);
    }

    if (offer.discountPrice) {
      // Apply direct discount amount
      discountAmount = offer.discountPrice;
      state.totalCouponDiscount = (state.totalCouponDiscount || 0) + discountAmount;
      finalPrice -= discountAmount;
      // console.log(`Applied direct discount: ${offer.discountPrice}`);
    }

    // Store offer details
    offerDetails = {
      discountPercent: offer.discountPercent || null,
      offerId: offer._id || null,
      discountType: offer.discountPercent ? "percentage" : "direct",
      usage: "Multi Use",
      amount: discountAmount,
    };

    // Prevent duplicate offers
    const foundOffer = state?.appliedOfferArray?.find(
      (existingOffer) => existingOffer.offerId === offerDetails.offerId
    );

    if (!foundOffer && offerDetails.offerId) {
      state.appliedOfferArray = state.appliedOfferArray || [];
      state.appliedOfferArray.push(offerDetails);
      // console.log("Added new offer:", offerDetails);
    } else {
      // console.log("Offer already exists or invalid.");
    }
  }

  // Update appliedCoupanArray and offerDetails in state
  state.appliedCoupanArray = state.appliedCoupanArray || [];
  if (offerDetails.offerId) {
    state.appliedCoupanArray.push(offerDetails);
  }
  state.offerDetails = offerDetails;

  // Save the final price to localStorage
  finalPrice = Math.max(0, finalPrice); // Ensure the price is not negative
  localStorage.setItem("finalPrice", finalPrice.toFixed(2));
  // console.log(`Final price calculated and saved: ${finalPrice.toFixed(2)}`);

  // Return both final price and discount amount
  return {
    finalPrice: finalPrice.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
  };
}

function calculatePriceRegular(data, isOfferValid) {

  // console.log(data, "Invalid data for regular calculation");
  if (typeof data !== 'object' || data === null) {
    // console.error("Invalid data for regular calculation");
    return { finalPrice: 0, discountAmount: 0 }; // Default to 0 if no data is provided
  }

  let cost = data?.cost || 0; // Get the base cost
  let discountAmount = 0;
console.log(data?.offerservices[0]?.offers, "from inside the offer calculation")
  let offerDetails = {}
  // Check if there are valid offers and apply them
  if (data?.offerservices[0]?.offers && isOfferValid) {
    console.log("inside if block for offer calculation")
    const result = applyOfferToPrice(cost, data);
    cost = result.finalPrice;
    discountAmount = result.discountAmount;
    offerDetails = result.offerDetails
  } else {
    // console.log("No offers to apply for regular cost.");
  }

  console.log(offerDetails, "offer details after calculation")
  // console.log(`Final regular price: ${cost}, Discount: ${discountAmount}`);
  return { finalPrice: cost, discountAmount, offerDetails };
}

function calculatePriceSubscription(data, subscriptionId, isOfferValid) {
  // console.log(data, "from subscription component")
  if (!data || !data?.subscription.length > 0) {
    // console.error("Invalid data for subscription calculation");
    return { finalPrice: 0, discountAmount: 0 };
  }

  const subscription = data?.subscription?.find(
    (sub) => sub._id === subscriptionId
  );

  if (!subscription) {
    // console.error("Subscription ID not found");
    return { finalPrice: 0, discountAmount: 0, subscription };
  }

  let subscriptionPrice = subscription.amount || 0;
  let discountAmount = 0;
  let offerDetails = {}
  // console.log(data?.offerservices[0]?.offers, "offer from function")
  // Check if there are valid offers and apply them
  if (data?.offerservices[0]?.offers && isOfferValid) {
    const result = applyOfferToPrice(subscriptionPrice, data);
    subscriptionPrice = result.finalPrice;
    discountAmount = result.discountAmount;
    offerDetails = result.offerDetails
  } else {
    // console.log("No offers to apply for subscription price.");
  }

  // console.log(
  //   `Final subscription price: ${subscriptionPrice}, Discount: ${discountAmount}`
  // );
  return { finalPrice: subscriptionPrice, discountAmount, subscription, offerDetails };
}

function calculatePriceQuotation(data, quotationId) {
  // console.log(data, "isnide quotation block from function")
  if (typeof data !== 'object' || data === null) {
    // console.error("Invalid data for quotation calculation");
    return { finalPrice: 0, discountAmount: 0 };
  }

  // console.log(data.quotations,quotationId, "quotations")
  const quotation = data?.quotations?.find(
    (quote) => quote._id === quotationId
  );

  // console.log(quotation, "foiund quotaTION")
  if (!quotation) {
    // console.error("Quotation ID not found");
    return { finalPrice: 0, discountAmount: 0 };
  }

  const quotationPrice = quotation.amount || 0;
  // console.log(`Quotation price calculated: ${quotationPrice}`);
  return { finalPrice: quotationPrice, discountAmount: 0 }; // No discounts for quotations
}

export function calculateFinalPriceByType(data, type, id = null,isOfferValid) {
  // console.log(type, "from function")
  switch (type) {
    case "regular":
      return calculatePriceRegular(data, isOfferValid);

    case "subscription":
      return calculatePriceSubscription(data, id, isOfferValid);

    case "quotation":
      return calculatePriceQuotation(data, id);

    default:
      // console.error("Invalid type specified");
      return { finalPrice: 0, discountAmount: 0 };
  }
}
function applyOfferToPrice(price, data) {
  if (!data?.offerservices[0]?.offers) {
    // console.log("No offers available for this service.");
    return { finalPrice: price, discountAmount: 0 }; // No discount applied
  }

  const offer = data?.offerservices[0]?.offers[0]; // Assume one offer
  // console.log(offer , "offer from the function")
  let discountAmount = 0;

  // Apply discount percentage if present
  // if (offer.discountPercent) {
  //   const percentDiscount = price * (offer.discountPercent / 100);
  //   discountAmount += percentDiscount;
  //   price -= percentDiscount;
  // }

  // Apply fixed discount if present
  // if (offer.discountPrice) {
  //   discountAmount += offer.discountPrice;
  //   price -= offer.discountPrice;
  // }
  if (offer.discountType === "fixed" && offer.discountPercent) {
    discountAmount += offer.discountPercent;
    price -= offer.discountPercent;
  } 
  // Apply percentage discount if present
  else {
    const percentDiscount = price * (offer.discountPercent / 100);
    discountAmount += percentDiscount;
    price -= percentDiscount;
  }
 const offerDetails = {
    discountPercent: offer.discountPercent,
    offerId: offer._id, // Assuming offer has an _id
    discountType: offer.discountPercent ? "percentage" : "direct",
    usage: "Multi Use",
    amount: discountAmount,
  };

  // console.log(`Price after applying offer: ${price}`);
  return { finalPrice: price, discountAmount, offerDetails };
}


//This function will return true if two objects (obj1={}, obj2={}) are equal

export const isEqualObject = (obj1, obj2) => {
  // Check if both are strictly equal (edge case)
  if (obj1 === obj2) return true;

  // Check if either is not an object or is null
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // Get keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is different
  if (keys1.length !== keys2.length) return false;

  // Compare values for each key
  for (let key of keys1) {    
    if(key === "yearOfStablish"){  //special case
      if(new Date(obj1[key]).getDate() !== new Date(obj2[key]).getDate()){
        return false;
      }
    }else  if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

 // remove multiple spaces from text 
 export const handleExtraSpaces = (text) =>{
  let newText = text.split(/[ ]+/);
  return (newText.join(" "))
}

export const detectCardType = (cardNumber) => {
  const cardPatterns = {
    Visa: /^4/,
    MasterCard: /^5[1-5]/,
    Discover: /^6/,
    'American Express': /^3[47]/,
  };

  for (const [cardType, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cardNumber)) {
      return cardType;
    }
  }
  return 'Unknown';
};
