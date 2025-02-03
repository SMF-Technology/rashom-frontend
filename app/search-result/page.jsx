

import React from 'react'
import WrappedPage from '../components/SearchResult'
import DressStyle from '../components/DressStyle'
import Affiliate from '../components/Affiliate'
export const runtime = 'edge';
const page = () => {


  return (
    <div>
      <WrappedPage />
      <DressStyle />
      <Affiliate />
    </div>
  )
}

export default page