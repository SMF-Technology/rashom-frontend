"use client"


import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { Breadcrumbs } from "@material-tailwind/react";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
const CartPage = () => {

  const { cart, dispatch } = useCart()

  const [selectedItems, setSelectedItems] = useState([])
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const validCoupons = {
    A567890: { discount: 50, percentage: 30 },
  };
  const handleApplyCoupon = () => {
    if (validCoupons[coupon]) {
      const { discount, percentage } = validCoupons[coupon];
      setAppliedCoupon({ code: coupon, discount, percentage });
      setDiscountedSubtotal((prevSubtotal) => prevSubtotal - discount);
      setErrorMessage("");
    } else {
      setErrorMessage("You entered an invalid code");
      setAppliedCoupon(null);
    }
  };

  const calculateSubtotal = () => {
    return cart
        .filter((item) => selectedItems.includes(item.id))
        .reduce((total, item) => total + item.price * item.quantity, 0);
};
  const [discountedSubtotal, setDiscountedSubtotal] = useState(calculateSubtotal());
  const [shippingCost,setShippingCost] = useState(10)

  useEffect(() => {
    const subtotal = calculateSubtotal()
    setShippingCost(subtotal > 1000 ? 0 : 10)

    setDiscountedSubtotal(subtotal + (subtotal > 1000 ? 0 : 10));
}, [selectedItems, cart]);


  useEffect(() => {
    if (!appliedCoupon) {
      const subtotal = calculateSubtotal()
      setShippingCost(subtotal > 1000 ? 0 : 10);
      setDiscountedSubtotal(subtotal + (subtotal > 1000 ? 0 : 10));

    }
  }, [cart, appliedCoupon]);

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountedSubtotal(calculateSubtotal());
    setCoupon(""); // Clear the input field
  };






  const handleRemove = () => {
    if (selectedItems.length === 1) {
      // Single item removal
      dispatch({ type: "REMOVE_FROM_CART", payload: { id: selectedItems[0] } });
    } else if (selectedItems.length > 1) {
      // Bulk removal
      dispatch({ type: "BULK_REMOVE", payload: selectedItems });
    }

    // Clear selected items after removal
    setSelectedItems([]);
  };


  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  useEffect(() => {
    const allItemIds = cart.map((item) => item.id);
    setSelectedItems(allItemIds);
  }, [cart]);
  const updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const handleQuantityChange = (id, increment) => {
    const currentItem = cart.find(item => item.id === id);
    if (currentItem) {
      const newQuantity = increment ? currentItem.quantity + 1 : currentItem.quantity - 1;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      }
    }
  };


  // const subtotal = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="container mx-auto px-10">
      <Breadcrumbs separator=">" className="px-0 font-semibold">
        <Link href="/" className="opacity-60">
          Home
        </Link>
        <a href="#" className="opacity-60">
          Cart
        </a>

      </Breadcrumbs>

      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">SELECT ITEM(S)</h2>
        <button onClick={handleRemove}
          disabled={selectedItems.length === 0} className="flex my-auto gap-2 text-gray-600 "> <FaRegTrashCan className="my-auto" /> DELETE</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10">
        <div className="space-y-5 mb-5">
          {/* First column content */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex  items-center border shadow-md p-7 rounded-lg"
            >
              <input
                type="checkbox"
                className="mr-4 w-5 h-5"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <Image
                src={item.image}
                alt={item.name}
                width={20}
                height={20}
                className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Product Size: <span className="font-semibold">  {item.size}  </span> &nbsp; Color:  <span className="font-semibold"> {item.color}  </span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg font-bold text-black">${item.price}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-600 line-through ">
                      ${item.oldPrice}
                    </span>

                  )}
                </div>
                <div className="flex  px-7 py-2 w-[100px] rounded-3xl text-black bg-[#F0F0F0] mt-3 items-center space-x-2">
                  <button onClick={() => handleQuantityChange(item.id, false)}>-</button>
                  <span className="font-medium">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, true)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#F0EFED] self-start rounded-xl shadow-sm p-5 mb-5">
          <h1 className="text-center mt-5 font-semibold text-xl">Summary</h1>
          {!appliedCoupon ? (
            <div className="flex gap-3 items-start">
              <input placeholder="Enter Coupon"
                className="rounded-3xl w-[90%]  border border-[#1A1919] mt-5 bg-transparent p-2 "
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={handleApplyCoupon} className="px-5 rounded-3xl py-2 bg-black text-white mt-5">Apply</button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 mt-2">
              <div className="flex gap-2">
              <p className="my-auto">
                <FaRegCheckCircle className="text-3xl" />
              </p>
              <p className="font-semibold">

                {appliedCoupon.code} Applied <br />   <span className="text-red-500"> -${appliedCoupon.discount} ({appliedCoupon.percentage}% off)</span>
              </p>
              </div>
              <div>
                <button
                  onClick={handleRemoveCoupon}
                  className="px-5 rounded-3xl py-2 bg-black mt-5 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {errorMessage && <p className="text-red-500 mt-2 flex gap-2"> <PiWarningCircleLight className="my-auto" /> {errorMessage}</p>}
          

          <div className="flex justify-between font-semibold text-[#1A1919] mx-auto mt-10">
            <h3 className="">Subtotal</h3>
            <p>  ${discountedSubtotal.toFixed(2)} </p>
          </div>
          <div className="flex justify-between font-semibold text-[#1A1919] mx-auto mt-5 border-b border-[#1A1A1A] pb-5">
            <h3 className="">Estimated Shipping & Handling</h3>
            <p className={shippingCost === 0 && "text-red-600"}>
              {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
            </p>
          </div>
          <div className="flex justify-between font-semibold text-[#1A1919] mx-auto mt-10">
            <h3 className="">Total</h3>
            <p> ${discountedSubtotal.toFixed(2)} </p>
          </div>

          {appliedCoupon &&  <span className="text-black font-semibold"> -${appliedCoupon.discount} ({appliedCoupon.percentage}% off)</span>}

        
          <div>
            <Link href="/payment-options" className="block mx-auto mt-6 bg-black w-full text-center rounded-lg py-2 text-white"> Checkout</Link>
          </div>
        </div>
      </div>


    </div>

  );
};

export default CartPage;
