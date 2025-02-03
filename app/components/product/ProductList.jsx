// components/ProductList.js
import React from 'react';
import Image from 'next/image';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-lg">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={300} // Set your desired width
            height={300} // Set your desired height
            className="w-full h-48 object-cover" 
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;