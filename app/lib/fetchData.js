// lib/fetchData.js
import { gql, request } from "graphql-request";

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

const allProducts = gql`
  {
    products(channel: "default-channel", first: 40) {
      edges {
        node {
          id
          name
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

const filterByCategory = gql` query getProductsByCategory($slug: String!)  {
 category(slug : $slug ) {
  id
  name
  products(channel :"default-channel",first : 50) {
    edges {
      node {
        id
        name
         media {
          id,
          url
        }
        rating
        pricing {
          priceRange {
            start {
              gross {
                amount
              }
            }
          }
        }
      }
    }
  }
}
}`


const searchResult = gql`query getSearchProduct($searchTerm : String!){
 products(channel: "default-channel", first: 40,search : $searchTerm) {
      edges {
        node {
          id
          name
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
}`

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


const categories = gql`
  {
   categories(first: 5) {
   edges{
    node{
      name
      parent {
        name
      }
    }
  }
  }
  }
`;


export async function fetchData(slug,searchTerm,productId) {

 
  console.log("Fetching data with categorySlug:", slug, "and searchTerm:", searchTerm,"and id :" ,productId);
    // Initialize variables to hold the data

    let response = null;

    let response1 = null;

    let allData = null;

    let categoryProduct = null;
    let searchProduct = null;
    let singleProduct = null
    let allCategories = null
  

    try {

        // Fetch all product data

        response = await request(API_URL, newArrival,{ timestamp: new Date().toISOString() });

        response1 = await request(API_URL, topSelling,{ timestamp: new Date().toISOString() });

        allData = await request(API_URL, allProducts,{ timestamp: new Date().toISOString() });
        allCategories = await request(API_URL, categories,{ timestamp: new Date().toISOString() });
     
        // Attempt to fetch category product data

        if(slug){
          categoryProduct = await request(API_URL, filterByCategory, { slug });
        }

        if(searchTerm)
        {
          searchProduct = await request(API_URL, searchResult, { searchTerm });

        }
        if(productId)
        {
          singleProduct = await request(API_URL, singleProductDetails, { id : productId });

        }
    } catch (error) {

        console.error("Error fetching data:", error);

    }


    // Check if categoryProduct is valid

    const productsByCategory = categoryProduct && categoryProduct.category 

        ? categoryProduct.category.products.edges 

        : []; // Default to an empty array if category is not found

    const productBySearch = searchProduct && searchProduct?.products ? searchProduct.products.edges : []
    const productDetails = singleProduct && singleProduct?.product ? singleProduct.product : null




    return {

        productsData: response?.products?.edges || [], // Return fetched data or empty array

        productsData1: response1?.products?.edges || [], // Return fetched data or empty array

        allProductsData: allData?.products?.edges || [], // Return fetched data or empty array

        productByCategory: productsByCategory, // Return products by category

        searchProduct : productBySearch,
        singleProduct : productDetails,
        allCategoriesName : allCategories?.categories?.edges || []
      
        

    };

}