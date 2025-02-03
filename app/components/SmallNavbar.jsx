"use client"

import React, { useEffect, useState } from 'react'
import MegaMenuWithHover from './NavbarLayout'
import { CiSearch } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';
import Link from 'next/link';
import ProfileDropdown from './profile/ProfileDropdown';
import LoginModal from './profile/LoginModal';

const SmallNavbar = () => {


  const { cart } = useCart()
  const { favorites } = useFavorites()
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const cartLength = cart.length
  const favoriteLength = favorites.length

  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Ensure the component is mounted before using useRouter
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent rendering until mounted


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search-result?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className='mx-auto container'>
      <div className='flex flex-col'>
        <div className="mt-4 mx-auto text-center">
          <Link href="/" className="text-center mx-auto text-black font-bold text-xl md:text-2xl uppercase my-auto">
           Resom
          </Link>
        </div>
        <div>
          <div className='grid grid-cols-2 items-start mt-3 justify-between px-2'>
            <div >
              <MegaMenuWithHover />
            </div>
            <div >
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center space-x-4 mt-4">
                  <Link href="/favorite">
                    <button className="text-gray-700 text-2xl relative">
                      <GrFavorite />
                      <span className="absolute bottom-4 bg-red-600 rounded-3xl text-xs py-1 px-2 text-white -right-3"> {favoriteLength} </span>

                    </button>
                  </Link>
                  <Link href="/cart">
                    <button className="text-gray-700 text-2xl relative">
                      <HiOutlineShoppingBag />
                      <span className="absolute bottom-4 bg-red-600 rounded-3xl text-xs py-1 px-2 text-white -right-2"> {cartLength} </span>
                    </button>
                  </Link>
                  <div className="relative">

                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-700 text-2xl">

                      <LuUserRound />

                    </button>

                    {isDropdownOpen && (

                      <ProfileDropdown

                        onClose={() => setIsDropdownOpen(false)}

                        onProfileClick={() => {

                          setIsModalOpen(true); // Open the modal when Profile is clicked

                        }}

                      />

                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='mx-auto'>
            <div className="relative w-full px-4 mx-auto mt-2 mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search here"
                className="border border-gray-300 rounded-full w-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <span className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-500">
                <CiSearch />
              </span>
            </div>
          </div>

        </div>
      </div>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default SmallNavbar