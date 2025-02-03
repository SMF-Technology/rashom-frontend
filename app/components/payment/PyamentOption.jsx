"use client";

import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import Link from "next/link";
const PaymentOption = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: "credit", label: "Credit", icon: <FaCreditCard/> },
    { id: "debit", label: "Debit", icon: <BsFillCreditCard2FrontFill/> },
    { id: "boleto", label: "Boleto", icon: <FaBarcode/> },
    { id: "pix", label: "Pix", icon: <FaPix/>},
  ];

  // Define the handleMethodChange function
  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
  };

  return (
    <div className="container mx-auto p-5">
          <h2 className="text-lg font-semibold mb-4">SELECT PAYMENT METHOD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>

          <ul className="space-y-4">
            {paymentMethods.map((method) => (
              <li
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedMethod === method.id
                    ? "border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleMethodChange(method.id)}
              >
                <span className="text-2xl mr-4">{method.icon}</span>
                <span className="text-gray-800 font-medium">{method.label}</span>
                <span className="ml-auto">
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => handleMethodChange(method.id)}
                    className="form-radio h-5 w-5 text-black"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#F0EFED] rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-center">Summary</h2>
          <div className="space-y-4 p-5">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-medium">$150.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Shipping & Handling</span>
              <span className="text-red-500 font-medium">FREE</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-gray-800 font-semibold">Total</span>
              <span className="text-gray-800 font-semibold">$100.00</span>
            </div>
          </div>
         <div className="p-5">
         {selectedMethod ? (
              <Link
                href="/order-confirm"
                className="block mx-auto mt-6 bg-black w-full text-center rounded-3xl py-2 text-white"
              >
              Continue
              </Link>
            ) : (
              <button
                disabled
                className="block mx-auto mt-6 bg-gray-400 w-full text-center rounded-3xl py-2 text-white cursor-not-allowed"
              >
                Process to Pay
              </button>
            )}
         </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
