
import CommonComponent from '@/app/components/CommonComponent';
import CommonComponentWrapper from '@/app/components/CommonComponentWrapper';
import products from '@/app/data/productsData';
import React from 'react'

export const runtime = "edge";

const page = async ({params}) => {
    
    const { tag } = params || {}; 

    const filterProductsByTag = (tag) => {
        return products.filter(product => product.tags.includes(tag))

    }
    
    
    const filterProducts = filterProductsByTag(tag)   

    return <div>
        <CommonComponentWrapper title={tag} products={filterProducts} />
    </div>;
}

export default page