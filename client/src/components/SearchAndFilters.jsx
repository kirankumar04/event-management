import React from 'react';

const SearchAndFilters = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, categories }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
        aria-label="Search for events by name or location"
      />

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
        aria-label="Filter events by category"
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilters;
