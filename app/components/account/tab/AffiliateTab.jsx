import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa6";
import { IoArrowUp } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
const AffiliateTab = () => {
    const [referralLink] = useState('https://your-ecommerce.com/referral/12345');
    const [activeSection, setActiveSection] = useState(null);

    const statusStyles = {
        Sold: "text-gray-400",
        Return: "text-gray-400",
        "In Stock": "text-[#FF5F00]",
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied!');
    };

    const handleShareLink = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join Our Affiliate Program',
                url: referralLink
            }).catch(console.error);
        } else {
            alert('Share not supported on this browser.');
        }
    };



    const sectionTab = [
        {
            id: "total-affiliates", label: "Total Affiliates", desc: "325 Affiliates", growth: {
                icon: <IoArrowUp className="text-green-500" />,
                value: "5% this month",
            }
        },
        {
            id: "total-sales", label: "Total Sales", desc: "$50,000", growth: {
                icon: <IoArrowUp className="text-green-500" />,
                value: "15% this month",
            }
        },
        {
            id: "total-payouts", label: "Total Payouts", desc: "$10,000", growth: {
                icon: <IoArrowUp className="text-green-500" />,
                value: "5% this month",
            }
        },
        {
            id: "return-product", label: "Return Product", desc: "50 Returns", growth: {
                icon: <IoArrowUp className="text-green-500" />,
                value: "2% this month",
            }
        },
        {
            id: "pending-payouts", label: "Pending Payouts", desc: "$2,000", growth: {
                icon: <IoArrowUp className="text-green-500" />,
                value: "5% this month",
            }
        },
    ]

    // Data or components for each section
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'total-affiliates':
                return (
                    <div>
                        <h1 className='font-bold text-2xl flex items-center hover:cursor-pointer' onClick={() => setActiveSection(null)}> <MdKeyboardArrowLeft className=' font-extrabold text-3xl' /> Total Affiliate </h1>
                        <div className='mt-6 bg-white p-4 rounded-lg grid grid-cols-12'>
                            <div className='col-span-12 md:col-span-4 text-sm'>
                                <p>Total Sold : 19 Products</p>
                                <p>Total Return : 03 Products</p>
                                <p className='text-[#FF5F00]'>In Stock 56 Products</p>

                            </div>
                            <div className='col-span-12 md:col-span-8 mt-5'>

                                <table className='w-full border-collapse '>
                                    <thead>
                                        <tr className='border-b-2 mb-5'>
                                            <th className='font-normal'>Date</th>
                                            <th className='font-normal'>Order ID</th>
                                            <th className='font-normal'>Sale</th>
                                            <th className='font-normal'>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3">Sold</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3">Sold</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3">Sold</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3">Sold</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">In Stock</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">In Stock</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                        <button className='px-10 py-2 bg-black flex rounded-lg mt-4 text-white'>Payments</button>
                        </div>

                    </div>
                );
                case 'total-sales':
                    return (
                        <div>
                        <h1 className='font-bold text-2xl flex items-center hover:cursor-pointer' onClick={() => setActiveSection(null)}> <MdKeyboardArrowLeft className=' font-extrabold text-3xl' /> Total Sales </h1>
                        <div className='mt-6 bg-white p-4 rounded-lg grid grid-cols-12'>
                            <div className='col-span-12 md:col-span-4 text-sm'>
                                <p>Total Sales : $ 12450</p>
                                <p>Total Earnings : $ 12450</p>
                                <p>Pending Commissions : $ 450</p>
    
                            </div>
                            <div className='col-span-12 md:col-span-8 mt-5'>
    
                                <table className='w-full border-collapse '>
                                    <thead>
                                        <tr className='border-b-2 mb-5'>
                                            <th className='font-normal'>Date</th>
                                            <th className='font-normal'>Order ID</th>
                                            <th className='font-normal'>Sale</th>
                                            <th className='font-normal'>Commission</th>
                                        </tr>
                                    </thead>
    
                                    <tbody>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td className="py-3">12 Dec</td>
                                            <td className="py-3">#A2301</td>
                                            <td className="py-3">$120.00</td>
                                            <td className="py-3 text-[#FF5F00]">$12</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>

                        <div className='flex justify-end'>
                        <button className='px-10 py-2 bg-black flex rounded-lg mt-4 text-white'>Payments</button>
                        </div>
                    </div>
                    );
            case 'total-payouts':
                return (
                    <div>
                    <h1 className='font-bold text-2xl flex items-center hover:cursor-pointer' onClick={() => setActiveSection(null)}> <MdKeyboardArrowLeft className=' font-extrabold text-3xl' /> Payout Details </h1>
                    <div className='mt-6 bg-white p-4 rounded-lg grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-4 text-sm'>
                            <p>Pending Payouts : $ 12450</p>
                            <p>Expected Payout</p>
                            <p>Date : 7th January 2025</p>

                        </div>
                        <div className='col-span-12 md:col-span-8 mt-5'>

                            <table className='w-full border-collapse '>
                                <thead>
                                    <tr className='border-b-2 mb-5'>
                                        <th className='font-normal'>Date</th>
                                        <th className='font-normal'>Amount</th>
                                        <th className='font-normal'>Method</th>
                                        <th className='font-normal'>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='text-center'>
                                        <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-[#FF5F00]">Pending</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-green-600">Withdraw</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-red-600">Pending</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                    <div className='flex justify-end'>
                    <button className='px-10 py-2 bg-black flex rounded-lg mt-4 text-white'>Payments</button>
                    </div>
                </div>
                );
            case 'return-product':
                return (
                    <div>
                    <h1 className='font-bold text-2xl flex items-center hover:cursor-pointer' onClick={() => setActiveSection(null)}> <MdKeyboardArrowLeft className=' font-extrabold text-3xl' /> Return Product </h1>
                    <div className='mt-6 bg-white p-4 rounded-lg grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-4 text-sm'>
                            <p>Pending Payouts : $ 12450</p>
                            <p>Expected Payout</p>
                            <p>Date : 7th January 2025</p>

                        </div>
                        <div className='col-span-12 md:col-span-8 mt-5'>

                            <table className='w-full border-collapse '>
                                <thead>
                                    <tr className='border-b-2 mb-5'>
                                        <th className='font-normal'>Date</th>
                                        <th className='font-normal'>Amount</th>
                                        <th className='font-normal'>Method</th>
                                        <th className='font-normal'>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='text-center'>
                                        <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-[#FF5F00]">Pending</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-green-600">Withdraw</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-red-600">Pending</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                    <div className='flex justify-end'>
                    <button className='px-10 py-2 bg-black flex rounded-lg mt-4 text-white'>Payments</button>
                    </div>
                </div>
                );
            case 'pending-payouts':
                return (
                    <div>
                    <h1 className='font-bold text-2xl flex items-center hover:cursor-pointer' onClick={() => setActiveSection(null)}> <MdKeyboardArrowLeft className=' font-extrabold text-3xl' /> Pending Payout </h1>
                    <div className='mt-6 bg-white p-4 rounded-lg grid grid-cols-12'>
                        <div className='col-span-12 md:col-span-4 text-sm'>
                            <p>Pending Payouts : $ 12450</p>
                            <p>Expected Payout</p>
                            <p>Date : 7th January 2025</p>

                        </div>
                        <div className='col-span-12 md:col-span-8 mt-5'>

                            <table className='w-full border-collapse '>
                                <thead>
                                    <tr className='border-b-2 mb-5'>
                                        <th className='font-normal'>Date</th>
                                        <th className='font-normal'>Amount</th>
                                        <th className='font-normal'>Method</th>
                                        <th className='font-normal'>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='text-center'>
                                        <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-black">Paid</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-[#FF5F00]">Pending</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-green-600">Withdraw</td>
                                    </tr>
                                    <tr className='text-center'>
                                    <td className="py-3">12 Dec</td>
                                        <td className="py-3 text-red-600">$120.00</td>
                                        <td className="py-3">Boleto</td>
                                        <td className="py-3 text-red-600">Pending</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>

                    <div className='flex justify-end'>
                    <button className='px-10 py-2 bg-black flex rounded-lg mt-4 text-white'>Payments</button>
                    </div>
                </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>

            {activeSection === null && <h3 className='text-xl font-bold mb-4'>Affiliate Program</h3>}
            {activeSection ? renderSectionContent() :

                <div className='grid grid-cols-2 gap-4 mt-6 hover:cursor-pointer'>
                    {sectionTab?.map((tab) => (
                        <div onClick={() => setActiveSection(tab.id)} key={tab?.id} className='bg-gray-200 p-4 rounded-lg'>
                            <h1>{tab?.label}</h1>

                            <div className='flex justify-between mt-5'>
                                <p> {tab?.desc} </p>
                                <p className='flex items-center'> {tab?.growth?.icon} {tab?.growth?.value} </p>
                            </div>
                        </div>
                    ))}
                </div>
            }
          {activeSection === null && (
              <div className='flex gap-4 mt-6 justify-end'>
              <button onClick={handleCopyLink} className='px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2'>
                  <FaCopy /> Copy Referral Link
              </button>
              <button onClick={handleShareLink} className='px-4 py-2 bg-purple-500 text-white rounded flex items-center gap-2'>
                  <FaShareAlt /> Share Referral Link
              </button>
          </div>
          )}
        </div>
    );
};

export default AffiliateTab;