"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ product }) => {
    const { dispatch } = useCart();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [sizes, setSizes] = useState([]); // State to store sizes
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        // Store all images from product media in the images array
        if (product?.media?.length > 0) {
            const productImages = product.media.map(image => image.url);
            setImages(productImages);
            setSelectedImage(productImages[0]); // Set the first image as the selected image
        }

        // Extract sizes from product variants
        if (product?.variants?.length > 0) {
            const productSizes = product.variants.map(variant => {
                const sizeAttribute = variant.attributes.find(attr => attr.attribute.name === "Size");
                return sizeAttribute ? sizeAttribute.values[0].name : null;
            }).filter(size => size); // Filter out any null values
            setSizes(productSizes);
            setSelectedSize(productSizes[0]); // Set the first size as the selected size
        }
    }, [product]);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: product.id,
                name: product.name,
                price: product.pricing.priceRange.start.gross.amount,
                size: selectedSize,
                image: selectedImage,
                oldPrice: product.oldPrice
            }
        });
    };

    return (
        <div className="p-6 container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
                    <div className="flex flex-row lg:flex-col space-y-0 lg:space-y-2 space-x-2 md:space-x-0 mt-4 col-span-12 lg:col-span-3">
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                width={500}
                                height={500}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 rounded-lg cursor-pointer border ${selectedImage === image ? "border-black" : "border-gray-300"}`}
                                onClick={() => setSelectedImage(image)} // Update selected image on click
                            />
                        ))}
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <Image
                            src={selectedImage}
                            alt="Product"
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
                {/* Product Details */}
                <div>
                    <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
                    <div className="flex items-center mt-4 gap-5">
                        <p className='text-2xl text-black font-bold'>${product.pricing.priceRange.start.gross.amount}</p>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 border-b pb-4">
                        {/* Assuming you have a way to parse the description */}
                    </p>

                    {/* Size Options */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700">Choose Size</h3>
                        <div className="flex flex-wrap space-x-2 sm:space-x-4 mt-2">
                           {sizes && 
                           (
                            sizes.map((size, index) => (
                              <button
                                  key={index}
                                  className={`px-4 py-2 mt-2 text-xs md:text-base rounded-3xl ${selectedSize === size
                                      ? "bg-black text-white font-semibold"
                                      : "bg-[#F0F0F0] text-[#606060]"
                                      }`}
                                  onClick={() => setSelectedSize(size)}
                              >
                                  {size}
                              </button>
                          ))
                           )
                           }
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="mt-4 flex items-center space-x-4 text-black">
                        <div className="flex items-center border rounded-3xl bg-[#F0F0F0]">
                            <button
                                className="px-4 py-2 text-lg"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button
                                className="px-4 py-2 text-lg"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button onClick={handleAddToCart} className="px-6 py-2 bg-black text-sm md:text-base text-white rounded-3xl">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;