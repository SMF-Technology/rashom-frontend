"use client"; 

import { useState } from "react";
import CommonComponent from "./CommonComponent";

const CommonComponentWrapper = ({ title, products }) => {
    const [visibleProducts, setVisibleProducts] = useState(4);

    const handleViewAll = () => {
        setVisibleProducts(products.length);
    };

    return (
        <CommonComponent
            title={title}
            products={products}
            onViewAll={handleViewAll} 
            visibleProducts={visibleProducts}
        />
    );
};

export default CommonComponentWrapper;