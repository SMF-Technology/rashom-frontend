import CommonComponent from '@/app/components/CommonComponent';
import CommonComponentWrapper from '@/app/components/CommonComponentWrapper';
import products from '@/app/data/productsData';
import React from 'react';
export const runtime = "edge";

const Page = ({ params }) => {
  const { category, subCategory } = params; 
  const decodedCategory = decodeURIComponent(category);
  const decodedSubCategory = subCategory ? decodeURIComponent(subCategory) : null;

  const fetchProaductByCategory=(category,subCategory = null) => {
    return products.filter((product) => {
     const isCategoryMatch = product.category.toLowerCase() === category.toLowerCase()
     const isSubCategoryMatch = subCategory ? product.subCategory.toLowerCase() === subCategory.toLowerCase() : true
 
     return isCategoryMatch && isSubCategoryMatch
    })
   } 

  const filteredProducts = fetchProaductByCategory(decodedCategory,decodedSubCategory)

  

  return (
    <div>
      <h1>Category: {decodedCategory}</h1>
      <h2>Subcategory: {decodedSubCategory}</h2>

      <CommonComponentWrapper title={decodedCategory} subTitle={decodedSubCategory} products={filteredProducts} />
    </div>
  );
};

export default Page;
