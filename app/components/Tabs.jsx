import { useState } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ReactStars from 'react-stars'
import reviewImage from '../../public/images/review.png'
import Image from "next/image";
import DefaultAccordion from "./Accordion";

function Tabs({material}) {

    const [inputValue, setInputValue] = useState('')
    const handleButtonClick = (buttonText) => {
        setInputValue((prevValue) => {
            if (prevValue === '') {
                return buttonText;
            } else {
                return prevValue + ', ' + buttonText;
            }
        });
    }

    const [activeTab, setActiveTab] = useState('details');
    const tabs = [
        { id: "details", label: "Product Details" },
        { id: "reviews", label: "Rating & Reviews" },
        { id: "faqs", label: "FAQs" },
    ];

    const reviews = [
        {
            name: "Sarah W.",
            date: "12 December 2024",
            rating: 5.0,
            text: "I absolutely love this dress! The fabric feels amazing, and the fit is just perfect. Highly recommend it!",
            helpful: 23,
            notHelpful: 2,
            image: "https://via.placeholder.com/80", // Replace with the actual image URL
        },
        // Add more reviews here
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "details":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="mt-4">
                            <h3 className="text-lg font-bold underline text-black">Detailed Specification:</h3>

                         {material &&    <ul className="mt-4 text-sm text-gray-600">
                                <p className="font-bold text-black">Material:</p>
                                <li className="pl-5">  {material}</li>
                             
                            </ul>}
                            <ul className="mt-4 text-sm text-gray-600">
                                <p className="font-bold text-black">Fabric Treatment:</p>
                                <li className="pl-5">Reactive dye, enzyme, and silicon washed</li>
                                <li className="pl-5">Preshrunk to minimize shrinkage</li>

                            </ul>
                            <ul className="mt-4 text-sm text-gray-600">
                                <p className="font-bold text-black">Design:</p>
                                <li className="pl-5">All-fabric design panels; cut and sew construction</li>
                                <li className="pl-5">Typography and artworks use normal/high-density screen print</li>
                            </ul>
                        </div>
                        <div className="mt-4">

                            <table className="w-full mt-4 border border-gray-300 text-sm text-black">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border">Size</th>
                                        <th className="px-4 py-2 border">Chest (Round)</th>
                                        <th className="px-4 py-2 border">Length</th>
                                        <th className="px-4 py-2 border">Sleeve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { size: "M", chest: 39, length: 27.5, sleeve: 8.5 },
                                        { size: "L", chest: 40.5, length: 28, sleeve: 8.75 },
                                        { size: "XL", chest: 43, length: 29, sleeve: 9 },
                                        { size: "2XL", chest: 45, length: 30, sleeve: 9.25 },
                                    ].map((row) => (
                                        <tr key={row.size}>
                                            <td className="px-4 py-2 border">{row.size}</td>
                                            <td className="px-4 py-2 border">{row.chest}</td>
                                            <td className="px-4 py-2 border">{row.length}</td>
                                            <td className="px-4 py-2 border">{row.sleeve}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case "reviews":
                return (
                    <div className=" mx-auto ">
                        {/* Rating Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div className="col-span-1 mx-auto">
                                <h1 className="text-5xl  font-bold text-black text-center mx-auto"> 4.7 <span className="text-2xl text-gray-400">/5</span></h1>
                                <div className="flex items-center my-2">
                                    <span className="text-yellow-500 text-lg mx-auto">
                                        <ReactStars count={5} size={24} value={4.5} color2={'#ffd700'} />
                                    </span>
                                </div>
                                <p className="text-gray-600 text-center">370 Reviews</p>
                                <button className="mt-4 px-6 py-2 bg-black text-white rounded-md">Write a Review</button>
                            </div>

                            {/* Summary Bars */}
                            <div>
                                {[
                                    { stars: 5, count: 195 },
                                    { stars: 4, count: 96 },
                                    { stars: 3, count: 48 },
                                    { stars: 2, count: 31 },
                                    { stars: 1, count: 0 },
                                ].map((item) => (
                                    <div key={item.stars} className="flex items-center mb-2 mt-5 text-black">
                                        <span className="text-sm ">{item.stars} Stars</span>
                                        <div className="flex-1 bg-gray-200 h-2 mx-2 rounded-full">
                                            <div
                                                className="bg-black h-2 rounded-full"
                                                style={{ width: `${(item.count / 370) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm">{item.count}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Returning Customers */}
                            <div className="text-center">
                                <h1 className="text-5xl font-bold text-black">95%</h1>
                                <p className="text-gray-600 mt-2">
                                    of our customers come back for more
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Praised for its perfect blend of style, comfort, and quality.
                                </p>
                            </div>
                        </div>

                        {/* Reviews */}
                        <h2 className="text-lg font-medium text-gray-800 mb-4">
                            Reviewed by 370 Customers
                        </h2>
                        <div className="border-b border-gray-300 mb-4"></div>
                        <div>
                            {reviews.map((review, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-start gap-4 mb-6">



                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex flex-col  text-black">
                                            <span className="text-sm ml-2 font-medium flex gap-3"> <FaStar className="text-yellow-400" /> Reviewed by {review.name}</span>
                                            <span className="text-sm ml-2 font-medium">{review.text}</span>
                                            <Image alt="reviewer-comment" src={reviewImage} className="w-20 h-20  mt-5" />
                                        </div>
                                        <div>
                                            <h1 className="text-sm text-gray-500">12 December 2024</h1>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <p className="text-black"> Was it helpful?</p>
                                                <button className="flex items-center text-green-600">
                                                    <FaThumbsUp className="mr-1" /> {review.helpful}
                                                </button>
                                                <button className="flex items-center text-red-600">
                                                    <FaThumbsDown className="mr-1" /> {review.notHelpful}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "faqs":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex gap-5 mt-5">
                                <input placeholder="Send a message the Seller" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border text-black border-[#929191] w-3/4 px-5 rounded-lg" />
                                <button className="px-5 py-2 bg-black text-white font-semibold rounded-lg">Send</button>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-4">
                                <button onClick={() => handleButtonClick('Fabric Type')} className="bg-[#F3F3F3]  rounded-lg text-[#606060] font-medium text-sm md:text-lg px-5 py-2">Fabric Type</button>
                                <button onClick={() => handleButtonClick('Return Policy')} className="bg-[#F3F3F3] rounded-lg text-[#606060] font-medium text-sm md:text-lg px-5 py-2">Return Policy</button>
                                <button onClick={() => handleButtonClick('Shipping Time')} className="bg-[#F3F3F3] rounded-lg text-[#606060] font-medium text-sm md:text-lg px-5 py-2">Shipping Time</button>
                                <button onClick={() => handleButtonClick('In Stock')} className="bg-[#F3F3F3] rounded-lg text-[#606060] font-medium text-sm md:text-lg px-5 py-2">In Stock</button>
                                <button onClick={() => handleButtonClick('Pockets Included')} className="bg-[#F3F3F3] rounded-lg text-[#606060] font-medium text-sm md:text-lg px-5 py-2">Pockets Included</button>
                            </div>
                        </div>

                        <div>
                            <DefaultAccordion />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex w-full border-b border-gray-300 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 px-4 text-base font-medium text-center ${activeTab === tab.id
                            ? "text-black border-b-2 border-black"
                            : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>{renderContent()}</div>
        </div>

    );
}

export default Tabs;
