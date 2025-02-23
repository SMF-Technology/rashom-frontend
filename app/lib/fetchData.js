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


export async function fetchData(slug, searchTerm, productId) {
  const headers = {
    cache: "no-store", // Disable caching
  };

  console.log("Fetching data with categorySlug:", slug, "and searchTerm:", searchTerm, "and id :", productId);

  let response = null;
  let response1 = null;
  let allData = null;
  let categoryProduct = null;
  let searchProduct = null;
  let singleProduct = null;
  let allCategories = null;

  try {
    response = await request(API_URL, newArrival, {}, headers);
    response1 = await request(API_URL, topSelling, {}, headers);
    allData = await request(API_URL, allProducts, {}, headers);
    allCategories = await request(API_URL, categories, {}, headers);

    if (slug) {
      categoryProduct = await request(API_URL, filterByCategory, { slug }, headers);
    }
    if (searchTerm) {
      searchProduct = await request(API_URL, searchResult, { searchTerm }, headers);
    }
    if (productId) {
      singleProduct = await request(API_URL, singleProductDetails, { id: productId }, headers);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    productsData: response?.products?.edges || [],
    productsData1: response1?.products?.edges || [],
    allProductsData: allData?.products?.edges || [],
    productByCategory: categoryProduct?.category?.products?.edges || [],
    searchProduct: searchProduct?.products?.edges || [],
    singleProduct: singleProduct?.product || null,
    allCategoriesName: allCategories?.categories?.edges || [],
  };
}
