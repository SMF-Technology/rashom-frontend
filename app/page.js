"use client"
import DressStyle from "./components/DressStyle";
import Affiliate from "./components/Affiliate";
import ImageSlider from "./components/ImageSlider";
import { fetchData } from "./lib/fetchData";
import CommonComponentWrapper from "./components/CommonComponentWrapper";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { Loader } from "./components/Loader";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const newArrival = gql`
  {
    products(channel: "default-channel", first: 40, sortBy: { field: CREATED_AT, direction: DESC }) {
      edges {
        node {
          id
          name
          rating
          description
          category {
            id
            name
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
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
            id
            url
          }
          variants {
            id
            name
            sku
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;


const topSelling = gql`
  {
    products(channel: "default-channel", first: 10, sortBy: { field: PUBLISHED, direction: ASC }) {
      edges {
        node {
          id
          name
          description
          rating
          category {
            id
            name
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
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
            id
            url
          }
          variants {
            id
            name
            sku
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default  function Home() {
    const [newArrivalData, setNewArrivalData] = useState([]);
    const [topSellingData, setTopSellingData] = useState([]);
    const [isLoadingNewArrival, setIsLoadingNewArrival] = useState(true);
  const [isLoadingTopSelling, setIsLoadingTopSelling] = useState(true);

  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        setIsLoadingNewArrival(true);
        const response = await request(API_URL, newArrival);
        setNewArrivalData(response?.products?.edges || []);
      } catch (error) {
        console.error("Error fetching New Arrival data:", error);
      } finally {
        setIsLoadingNewArrival(false);
      }
    };

    fetchNewArrivalData();
  }, []);


  useEffect(() => {
    const fetchTopSellingData = async () => {
      try {
        setIsLoadingTopSelling(true);
        const response = await request(API_URL, topSelling);
        setTopSellingData(response?.products?.edges || []);
      } catch (error) {
        console.error("Error fetching Top Selling data:", error);
      } finally {
        setIsLoadingTopSelling(false);
      }
    };

    fetchTopSellingData();
  }, []);
    
  
  //const { productsData, productsData1 } = await fetchData();

  const products = newArrivalData?.map((edge) => edge.node);
  const topSell = topSellingData?.map((edge) => edge.node);
  console.log("product check in live",products);
  
  // const topSellingProducts = productsData1?.map((edge) => edge.node);

  

  return (
    <main >
      <ImageSlider />
      {isLoadingNewArrival ? (
          <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <CommonComponentWrapper title="New Arrival" products={products} />
      )}
      {isLoadingTopSelling ? (
          <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <CommonComponentWrapper title="Top Selling" products={topSell} />
      )}
      
     
      <DressStyle />
      <Affiliate />
    </main>
  );
}