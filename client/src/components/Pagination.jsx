import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 cursor-pointer"
      >
        Previous
      </button>
      
      {/* Page Indicator */}
      <span className="mx-4 mt-1 text-white text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
      
      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
