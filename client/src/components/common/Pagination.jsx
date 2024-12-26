import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalEntries,
}) => {
  return (
    <div className="flex items-center justify-end py-2 font-inter">
      <div className="flex items-center space-x-2">
        <div className="text-sm text-[#3D3E3F]">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries}{" "}
          entries
        </div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded font-medium ${
            currentPage === 1
              ? " text-[#717273] cursor-not-allowed"
              : " text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="bg-[#025AE0] w-[32px] h-[32px] rounded-md font-medium text-white flex justify-center items-center">
          {currentPage}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : " text-[#025AE0]"
          }`}
        >
          Next
        </button>
        <select
          className="select-no-arrow px-2 py-1 border border-gray-300 rounded text-[#3D3E3F] bg-white"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
