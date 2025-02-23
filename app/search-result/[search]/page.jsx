import Affiliate from '@/app/components/Affiliate';
import CommonComponent from '@/app/components/CommonComponent';
import DressStyle from '@/app/components/DressStyle';
import WrappedPage from '@/app/components/SearchResult';
import { fetchData } from '@/app/lib/fetchData'
import React from 'react'
import FilterAndDisplay from './FilterAndDisplay';
export const runtime = "edge";

const page = async ({params}) => {

    const {search} = await params

  
    const decoded = decodeURIComponent(search)
    const {searchProduct} = await fetchData(null,decoded,null)
    const products = searchProduct.map((edge) => edge.node)
    
  return (
    <div>
        <FilterAndDisplay products={products} title={decoded} />
        <DressStyle/>
        <Affiliate/>
    </div>
  )
}

export default page