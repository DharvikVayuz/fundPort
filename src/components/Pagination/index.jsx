// PaginationComponent.jsx
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ totalItems = 10, itemsPerPage = 10 }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Local state for managing the current page
  const [currentPage, setCurrentPage] = useState(searchParams.get("page"));
  // console.log("currentPage",searchParams.get("page"));

  // Calculate the total number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    // Update local state when the page prop changes
    setCurrentPage(searchParams.get("page") || 1);
  }, [searchParams.get("page")]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1; // 1-based for URL
    setCurrentPage(newPage); // Update local state for the active class
    searchParams.set("page", newPage);
    searchParams.set("limit", itemsPerPage);
    navigate({ search: searchParams.toString() });
  };

  return (
    <ReactPaginate
      previousLabel={" Prev"}
      nextLabel={"Next "}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      containerClassName={"flex justify-center item-center space-x-1 px-2 py-2"}
      pageClassName={"block"}
      pageLinkClassName={
        " px-2 py-1 rounded-md text-[12px] border border-[#525252] font-medium "
      }
      previousClassName={
        currentPage === 1 ? " opacity-50 cursor-not-allowed" : "block"
      }
      previousLinkClassName={"px-4 py-1 border  border-[#525252] rounded-md text-[12px] "}
      nextClassName={
        currentPage === pageCount ? "opacity-50 cursor-not-allowed" : "block"
      }
      nextLinkClassName={"px-4 py-1 border border-[#525252] rounded-md text-[12px]"}
      breakClassName={"block"}
      breakLinkClassName={"px-2 py-1 border rounded-md "}
      activeClassName={
        "!border  !border-none  rounded-md  text-white bg-[#0A1C40] "
      } // Active page styling
      forcePage={currentPage - 1} // ReactPaginate is 0-indexed, so adjust for 1-based pages
      disabledClassName={"opacity-50 cursor-not-allowed"} // Disable the buttons
    />
  );
};

export default Pagination;
