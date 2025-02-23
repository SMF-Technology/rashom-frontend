import React, { useState } from 'react'
import { FaCreditCard, FaBarcode, FaPix } from "react-icons/fa6";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
const PaymentTab = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const paymentMethods = [
        { id: "credit", label: "Credit", icon: <FaCreditCard /> },
        { id: "debit", label: "Debit", icon: <BsFillCreditCard2FrontFill /> },
        { id: "boleto", label: "Boleto", icon: <FaBarcode /> },
        { id: "pix", label: "Pix", icon: <FaPix /> },
    ];

    const handleMethodChange = (methodId) => {
        setSelectedMethod(methodId);
    };

    return (
        <div className='grid grid-cols-1'>
            <div>

                <ul className="space-y-4">
                    {paymentMethods.map((method) => (
                        <li
                            key={method.id}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer ${selectedMethod === method.id
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
        </div>
    )
}

export default PaymentTab