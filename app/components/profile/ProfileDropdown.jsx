import React from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { LuUserRound } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoReorderFourOutline } from "react-icons/io5";
import { TiFolderDelete } from "react-icons/ti";
import { CiCreditCard1 } from "react-icons/ci";
import { TbAffiliate } from "react-icons/tb";
import { TbHelp } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useSaleorAuthContext } from '@saleor/auth-sdk/react';

const ProfileDropdown = ({ onClose, onProfileClick, setUserEmail }) => {
    const [size, setSize] = React.useState(null);
    const router = useRouter();
    const userEmail = localStorage.getItem("userEmail"); // No need to parse
    const { signOut } = useSaleorAuthContext();

    const handleOpen = (value) => {
        setSize(value);
    };

    const handleLogout = () => {
        signOut()
        localStorage.removeItem("userEmail")
        setUserEmail(null)

        router.push("/")
        onClose();
    };



    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <div className="py-1">
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); userEmail ? router.push("/account") : onProfileClick(); }}
                >
                    {userEmail ? <FaUser className='my-auto' /> : <LuUserRound className="my-auto" />} Profile
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); console.log('My Order clicked'); }}
                >
                    <IoReorderFourOutline className='my-auto' /> My Order
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); console.log('Security clicked'); }}
                >
                    <TiFolderDelete className='my-auto' /> Security
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); console.log('Payment clicked'); }}
                >
                    <CiCreditCard1 className='my-auto' /> Payment
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); handleOpen("md"); }} // Open modal with size "md"
                >
                    <TbAffiliate className='my-auto' /> Affiliate
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { onClose(); handleOpen("md"); }} // Open modal with size "md"
                >
                    <TbHelp className='my-auto' /> Need Help
                </button>
                <button
                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                >
                    <TbLogout2 className='my-auto' /> Logout
                </button>
            </div>
            <Dialog
                open={size !== null} // Open the dialog if size is set
                size={size || "md"}
                handler={handleOpen}
            >
                <DialogHeader>It's a simple dialog.</DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty-five years to get these plants, twenty-five years of
                    blood, sweat, and tears, and I'm never giving up, I'm just
                    getting started. I'm up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)} // Close the dialog
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleOpen(null)} // Close the dialog
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default ProfileDropdown;