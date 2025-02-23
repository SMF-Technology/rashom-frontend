"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useFavorites } from "../../context/FavoriteContext";

const Favorite = () => {
  const { favorites, dispatch } = useFavorites();
  const [selectedItems, setSelectedItems] = useState([]);

  console.log("favourite", favorites);

  const handleRemove = () => {
    if (selectedItems.length === 1) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: { id: selectedItems[0] } });
    } else if (selectedItems.length > 1) {
      dispatch({ type: "REMOVE_BULK_FROM_FAVORITES", payload: selectedItems });
    }
    setSelectedItems([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const allItemIds = favorites.map((item) => item.id);
    setSelectedItems(allItemIds);
  }, [favorites]);

  return (
    <div className="container mx-auto px-10">
      <Breadcrumbs separator=">" className="px-0 font-semibold">
        <Link href="/" className="opacity-60">
          Home
        </Link>
        <a href="#" className="opacity-60">
          Favorite
        </a>
      </Breadcrumbs>

      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">SELECT ITEM(S)</h2>
        <button
          onClick={handleRemove}
          disabled={selectedItems.length === 0}
          className="flex my-auto gap-2 text-gray-600"
        >
          <FaRegTrashCan className="my-auto" /> DELETE
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-10">
        <div className="space-y-5 mb-5">
          {favorites.map((item) => (
            <div key={item.id} className="flex items-center border shadow-md p-7 rounded-lg">
              <input
                type="checkbox"
                className="mr-4 w-5 h-5"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <Image
                src={item.media[0]?.url}
                alt={item.name}
                width={128}
                height={128}
                className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Product Size: <span className="font-semibold"> N/A </span> &nbsp;
                    Color: <span className="font-semibold"> N/A </span>
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg font-bold text-black">
                      ${item?.pricing?.priceRange?.start?.gross?.amount || 0}
                    </span>
                    {item?.pricing?.priceRange?.start?.gross?.amount && (
                      <span className="text-sm text-gray-600 line-through">
                        ${item?.pricing?.priceRange?.start?.gross?.amount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-auto ml-auto">
                  <Link href={`/product-details/${item.id}`} className="px-7 py-2 text-center rounded-3xl text-white bg-black">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
