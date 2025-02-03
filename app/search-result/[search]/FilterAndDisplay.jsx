"use client";

import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import CommonComponent from "@/app/components/CommonComponent";
import CommonComponentWrapper from "@/app/components/CommonComponentWrapper";

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
