"use client";

import MegaMenuWithHover from "./NavbarLayout"; // This is for large screens
import SmallNavbar from "./SmallNavbar"; // This is for small screens
import { CiSearch } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";
import OfferText from "./OfferText";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./profile/LoginModal";
import ProfileDropdown from "./profile/ProfileDropdown";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // Store userEmail in state

  useEffect(() => {
    // Fetch userEmail from localStorage on the client side
    const storedEmail = localStorage.getItem("userEmail");
    setUserEmail(storedEmail);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search-result/${encodeURIComponent(query)}`);
    }
  };

  const cartLength = cart.length;
  const favoriteLength = favorites.length;

  return (
    <div className="mx-auto container">
      <OfferText />
      {isSmallScreen ? (
        <SmallNavbar />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto my-auto">
          <div>
            <MegaMenuWithHover />
          </div>

          <div className="mt-2 mx-auto">
            <Link href="/" className="text-center mx-auto text-black font-bold text-xl md:text-2xl uppercase my-auto">
              Resom
            </Link>
          </div>

          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                  <CiSearch />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search here"
                  className="border border-gray-300 text-gray-700 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <Link href="/favorite">
                <button className="text-gray-700 text-2xl relative">
                  <GrFavorite />
                  <span className="absolute bottom-4 bg-red-600 rounded-3xl text-xs py-1 px-2 text-white -right-3">
                    {favoriteLength}
                  </span>
                </button>
              </Link>

              <Link href="/cart">
                <button className="text-gray-700 text-2xl relative">
                  <HiOutlineShoppingBag />
                  <span className="absolute bottom-4 bg-red-600 rounded-3xl text-xs py-1 px-2 text-white -right-2">
                    {cartLength}
                  </span>
                </button>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-700 text-2xl"
                >
                  {userEmail ? <FaUser /> : <LuUserRound />}
                </button>

                {isDropdownOpen && (
                  <>
                    {userEmail ? (
                      <ProfileDropdown
                        onClose={() => setIsDropdownOpen(false)}
                        setUserEmail={setUserEmail} // Pass setUserEmail to ProfileDropdown
                      />
                    ) : (
                      <LoginModal
                        isOpen={isDropdownOpen}
                        onClose={() => setIsDropdownOpen(false)}
                        setUserEmail={setUserEmail} // Pass setUserEmail to LoginModal
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setUserEmail={setUserEmail} // Pass setUserEmail to LoginModal
      />
    </div>
  );
};

export default Header;