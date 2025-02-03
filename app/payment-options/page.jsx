import React from 'react'
import PaymentOption from '../components/payment/PyamentOption'
import DressStyle from '../components/DressStyle'
import Affiliate from '../components/Affiliate'
export const runtime = 'edge';
const page = () => {
  return (
    <div>
        <PaymentOption />
        <DressStyle/>
        <Affiliate />
    </div>
  )
}

export default page