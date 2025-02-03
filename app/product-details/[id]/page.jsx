"use client"

import Affiliate from '@/app/components/Affiliate';
import DressStyle from '@/app/components/DressStyle';
import ProductDetails from '@/app/components/ProductDetails';
import RelatedProduct from '@/app/components/RelatedProduct';
import { gql, request } from 'graphql-request';
import React, { useState, useEffect } from 'react';
import { Loader } from '@/app/components/Loader'; // Assuming you have a Loader component

export const runtime = 'edge';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const singleProductDetails = gql`
  query getSingleProduct($id: ID!) {
    product(channel: "default-channel", id: $id) {
      id
      name
      rating
      description
      category {
        id
        name
      }
      variants {
        id
        attributes {
          attribute {
            name
          }
          values {
            name
          }
        }
      }
      attributes {
        attribute {
          name
        }
        values {
          name
        }
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
            }
          }
        }
        discount {
          gross {
            amount
          }
        }
      }
      media {
        url
        alt
      }
    }
  }
`;

const page =  ({ params }) => {
  const { id } = params;

  const [singleProduct, setSingleProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchSingleProduct = async (productId) => {
      try {
        setIsLoading(true); // Start loader
        const response = await request(API_URL, singleProductDetails, { id: productId });
        setSingleProduct(response.product);
      } catch (error) {
        console.error('Error fetching single product:', error);
      } finally {
        setIsLoading(false); // Stop loader
      }
    };

    const decodedId = decodeURIComponent(id);
    fetchSingleProduct(decodedId);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : singleProduct ? (
        <>
          <ProductDetails product={singleProduct} />
          <RelatedProduct />
          <DressStyle />
          <Affiliate />
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default page;
