"use client"
import { useState } from 'react';
import { LiaEditSolid } from "react-icons/lia";
import { LuUserRound } from "react-icons/lu";
import { IoReorderFourOutline } from "react-icons/io5";
import { TiFolderDelete } from "react-icons/ti";
import { CiCreditCard1 } from "react-icons/ci";
import { TbAffiliate } from "react-icons/tb";
import { TbHelp } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import DefaultAccordion from '../Accordion';
import ProfileTab from './tab/ProfileTab';
import OrderTab from './tab/OrderTab';
import SecurityTab from './tab/SecurityTab';
import PaymentTab from './tab/PaymentTab';
import AffiliateTab from './tab/AffiliateTab';
import { FaCopy, FaShareAlt } from 'react-icons/fa';
const ManageAccount = () => {

    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: "profile", icon: <LuUserRound />, label: "Profile" },
        { id: "orders", icon: <IoReorderFourOutline />, label: "My Orders" },
        { id: "security", icon: <TiFolderDelete />, label: "Security" },
        { id: "payment", icon: <CiCreditCard1 />, label: "Payment" },
        { id: "affiliate", icon: <TbAffiliate />, label: "Affiliate" },
        { id: "help", icon: <TbHelp />, label: "Need Help" },
        { id: "logout", icon: <TbLogout2 />, label: "Log Out" },
    ];

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

    const activeTabObject = tabs.find(tab => tab.id === activeTab);

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div>
                        <ProfileTab />
                    </div>
                )
            case "security":
                return (
                    <div>
                        <SecurityTab />

                    </div>
                )
            case "affiliate":
                return (
                    <div>
                        <AffiliateTab />
                    </div>
                );
            case "orders":
                return (
                    <div>
                        <OrderTab />
                    </div>

                )
            case "payment":
                return (
                    <div >
                        <PaymentTab />
                    </div>
                )

            case "help":
                return (

                    <div className='grid grid-cols-1'>
                        <DefaultAccordion />
                    </div>
                )

        }
    }

    return (

        <div className='container mx-auto'>
            <h1 className="text-xl font-bold mb-6">MANAGE ACCOUNT</h1>

            <div className='p-5 rounded-t-lg bg-gray-100'>
                <div className='flex rounded-lg justify-between bg-white p-5'>
                    <div >
                        {activeTabObject && (

                            <button>{activeTabObject.label}</button>

                        )}
                    </div>
                    <div>
                        <LiaEditSolid className='text-xl font-bold' />
                    </div>
                </div>
            </div>
            <div className="mb-5 rounded-b-lg bg-gray-100 flex md:flex-row flex-col">


                {/* Sidebar */}
                <aside className="w-64  p-4 border-r mx-auto">
                    <nav className="space-y-4">
                        {tabs.map((tab) => (
                            <button key={tab.id}
                                className={`flex gap-2 items-center w-full p-2 text-left rounded-lg hover:bg-white ${activeTab === tab.id && 'bg-white'}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className='my-auto'>{tab.icon}</span>   {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-6">
                    {renderContent()}
                </main>


            </div>
        </div>
    );
}


export default ManageAccount