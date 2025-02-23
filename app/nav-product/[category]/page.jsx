import CommonComponent from '@/app/components/CommonComponent';
import CommonComponentWrapper from '@/app/components/CommonComponentWrapper';
import { fetchData } from '@/app/lib/fetchData';
import React from 'react';
export const runtime = "edge";

const page = async ({ params }) => {
    const { category } = await params;

    const { productByCategory } = await fetchData(category,null,null);
  

    const products = productByCategory.map((edge) => edge.node);



    return (
        <div>
            <CommonComponentWrapper title={category} products={products} />
        </div>
    );
}

export default page;