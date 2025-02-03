// app/page.js
import CommonComponentWrapper from '@/app/components/CommonComponentWrapper';
import { Loader } from '@/app/components/Loader';
import { fetchData } from '@/app/lib/fetchData';
import React, { Suspense } from 'react';

export const runtime = 'edge';

// Fetch data function (wrapped in React.cache for deduplication)
const getData = React.cache(async (category) => {
    const { productByCategory } = await fetchData(category, null, null);
    return productByCategory.map((edge) => edge.node);
});

// Component that fetches and renders the data
async function ProductList({ category }) {
    const products = await getData(category);
    return <CommonComponentWrapper title={category} products={products} />;
}

// Page component
export default function Page({ params }) {
    const { category } = params;

    return (
        <div>
            <Suspense fallback={<Loader />}>
                <ProductList category={category} />
            </Suspense>
        </div>
    );
}