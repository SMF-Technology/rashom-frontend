"use client";

import React, { useState } from "react";

const FilterComponent = ({ onFilterChange,title,lengthOfProduct }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value); // Pass the selected filter to the parent
  };

  return (

    <div className="container mx-auto px-4 py-8">

       <div className="flex justify-between"> 
       <div>
       <h1 className="text-2xl font-bold mb-4 text-black">{title}</h1>

<p className="text-gray-500 mb-6">{lengthOfProduct} items found for "{title}"</p>
        </div>

    <div className="relative mb-6">
      <select
        className="block appearance-none w-48 bg-white border-b-2 border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="">All Categories</option>
        <option value="juices">Juices</option>
        <option value="henley">Henley</option>
        <option value="polo">Polo</option>
        <option value="graphics">Graphic</option>
      </select>
    </div>
       </div>
    </div>
  );
};

export default FilterComponent;
