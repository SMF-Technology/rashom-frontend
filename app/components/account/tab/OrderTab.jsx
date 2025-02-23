import React from 'react'

import order from "../../../../public/images/order.png"
import Image from 'next/image';

import p1 from '../../../../public/images/p1.png'
import p2 from '../../../../public/images/p2.png'
import p3 from '../../../../public/images/p3.png'
    const orderProducts = [
        {
            id: 1,
            name: "T-shirt with Tape Details",
            image: p2, // Replace with your image paths
            price: 120,
            color: "Green",
            size: "Large",
            status: "Canceled"
        },
        {
            id: 2,
            name: "Skinny Fit Jeans",
            image: p1,
            price: 240,
            color: "Blue",
            size: "Small",
            status: "On the way"
        },
        {
            id: 3,
            name: "T-shirt with Tape Details",
            image: p3,
            price: 120,
            color: "Black",
            size: "Medium",
            status: "Pending"
        },
        {
            id: 4,
            name: "Sleeve Striped T-shirt",
            image: p2,
            price: 130,
            color: "Brown",
            size: "Large",
            status: "Completed"
        },
        {
            id: 5,
            name: "Sleeve Striped T-shirt",
            image: p2,
            price: 130,
            color: "Green",
            size: "Large",
            status: "Completed"
        },
        {
            id: 6,
            name: "Sleeve Striped T-shirt",
            image: p2,
            price: 130,
            color: "Green",
            size: "Large",
            status: "On the way"
        },
    ];

    const statusStyles = {
        Canceled: "text-gray-400",
        "On the way": "text-red-500",
        Pending: "text-red-500",
        Completed: "text-gray-500",
    };

const OrderTab = () => {
  return (
    <div>
           {orderProducts.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row items-start p-4 bg-white rounded-lg mb-5">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={order}
                                                alt="Product"
                                                className="w-20 h-28 object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-grow ml-4">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                Product Size: {item.size} Color: {item.color}
                                            </p>
                                            <p className="text-lg font-semibold mt-1">${item.price}</p>
                                            <button className="text-black font-semibold underline mt-1">Purchase History</button>
                                        </div>
                                        <div className="flex flex-col justify-between h-full gap-2 items-end md:gap-5">
                                            <div>
                                                <p className={`text-sm font-semibold  ${statusStyles[item.status]}`}>{item.status}</p>
                                            </div>
                                            <div className="flex flex-col items-end ">
                                                {item.status === "Completed" && (
                                                    <div className="flex flex-col gap-2">
                                                        <button className="px-4 py-2 bg-black text-white rounded-3xl">Buy Again</button>
                                                        <button className="px-4 py-2 bg-white border border-black text-black rounded-3xl">
                                                            Return/Refund
                                                        </button>
                                                    </div>
                                                )}
                                                {item.status === "Pending" && (
                                                    <div className="flex flex-col gap-2">
                                                        <button className="px-4 py-2 bg-black text-white rounded-3xl">Buy Again</button>
                                                        <button className="px-4 py-2 bg-white border border-black text-black rounded-3xl">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                                {item.status === "On the way" && (
                                                    <div className="flex flex-col gap-2">
                                                        <button className="px-4 py-2 bg-black text-white rounded-3xl">Track</button>
                                                    </div>
                                                )}
                                                {item.status === "Canceled" && (
                                                    <div className="flex flex-col gap-2">
                                                        <button className="px-4 py-2 bg-black text-white rounded-3xl">Buy Again</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
    </div>
  )
}

export default OrderTab