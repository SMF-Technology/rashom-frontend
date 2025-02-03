import React from 'react'
import Cart from '../components/cart/Cart'
export const runtime = 'edge';
const page = () => {
  return (
    <div>
        <h1>
          <Cart />
        </h1>
    </div>
  )
}

export default page