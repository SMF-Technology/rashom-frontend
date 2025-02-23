import Affiliate from '@/app/components/Affiliate';
import DressStyle from '@/app/components/DressStyle';
import ProductDetails from '@/app/components/ProductDetails';
import RelatedProduct from '@/app/components/RelatedProduct';
import { fetchData } from '@/app/lib/fetchData';
import React from 'react'

const page = async ({params}) => {

  const {id} = await params

  const decodedId = decodeURIComponent(id)

  const {singleProduct} = await fetchData(null,null,decodedId)
 
  
  
  return (
    <div>
      <ProductDetails product={singleProduct} />
      <RelatedProduct />
      <DressStyle />
      <Affiliate />
    </div>
  )
}

export default page