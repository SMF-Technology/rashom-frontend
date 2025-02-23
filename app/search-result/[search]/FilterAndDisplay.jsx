"use client";

import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import CommonComponentWrapper from "@/app/components/CommonComponentWrapper";
export const runtime = "edge";

const FilterAndDisplay = ({ products, title }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categoryNames = products.map((product) => product.category.name);

  console.log("cat name",categoryNames);
  
  const normalizeString = (str) => str.toLowerCase().trim();

  const handleFilterChange = (filter) => {
    console.log("Selected Filter:", filter);
    if (!filter) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          normalizeString(product.category.name) === normalizeString(filter)
      );
      setFilteredProducts(filtered);
    }
  };

  const productLength = filteredProducts.length

  return (
    <div>
      <FilterComponent lengthOfProduct={productLength} onFilterChange={handleFilterChange} title={title} />
      <CommonComponentWrapper title="" products={filteredProducts} />
    </div>
  );
};

export default FilterAndDisplay;
