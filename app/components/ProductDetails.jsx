"use client";

import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Tabs from "@/app/components/Tabs";
import Image from "next/image";
import ReactStars from "react-stars";
import { useCart } from "../context/CartContext";
import { Loader } from "./Loader";
import parse from 'html-react-parser';
import DescriptionAccordion from "./DescriptionAccordion";
import DeliveryAccordion from "./DeliveryAccordion";

const ProductDetails = ({ product }) => {
    const { dispatch } = useCart();
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [material, setMaterial] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(images[0] || "/placeholder.png");


    const originalPrice = product?.pricing?.priceRange?.start?.gross?.amount || 0;
    const discountAmount = product?.pricing?.discount?.gross?.amount || 0;
    const discountPercentage = originalPrice ? ((discountAmount / originalPrice) * 100).toFixed(2) : 0;

    useEffect(() => {
        if (product?.media?.length > 0) {
            const productImages = product.media.map(image => image.url);
            setImages(productImages);
            setSelectedImage(productImages[0]);
        }

        if (product?.attributes?.length > 0) {
            const materialAttribute = product.attributes.find(attr => attr.attribute.name === "Material");
            if (materialAttribute) {
                setMaterial(materialAttribute?.values[0]?.name);
            }

            const colorAttribute = product.attributes.find(attr => attr.attribute.name === "Color");
            if (colorAttribute) {
                const colorsGet = colorAttribute.values.map(value => value.name);
                setColors(colorsGet);
                setSelectedColor(colorsGet[0] || "");
            }

            const sizeAttribute = product.attributes.find(attr => attr.attribute.name === "Size");
            if (sizeAttribute) {
                const sizeGet = sizeAttribute.values.map(value => value.name);
                setSizes(sizeGet);
                setSelectedSize(sizeGet[0] || "");
            }
        }
    }, [product]);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: product.id,
                name: product.name,
                price: product?.pricing?.priceRange?.start?.gross?.amount || 0,
                size: selectedSize,
                quantity,
                color: selectedColor,
                image: selectedImage,
                oldPrice: product?.pricing?.discount?.gross?.amount
            }
        });
    };

    let productDescription = "";

    if (product?.description) {
        try {
            const descriptionData = JSON.parse(product.description);
            if (descriptionData?.blocks) {
                productDescription = descriptionData.blocks
                    .map(block => block.data.text || "")
                    .join("<br/>");
            } else {
                productDescription = descriptionData.toString();
            }
        } catch (error) {
            console.error("Error parsing product description as JSON:", error);
            productDescription = product.description;
        }
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-6 container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
                    <div className="flex flex-row lg:flex-col space-y-0 lg:space-y-2 space-x-2 md:space-x-2 lg:space-x-0 mt-4 col-span-12 lg:col-span-3">
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                width={500}
                                height={500}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 rounded-lg cursor-pointer border ${selectedImage === image ? "border-black" : "border-gray-300"}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                    {selectedImage && (
  <Image
    src={selectedImage}
    alt="Product"
    width={500}
    height={500}
    className="w-full h-auto rounded-lg"
  />
)}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
                    {product.rating > 0 && (
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="text-yellow-500 text-lg">
                                <ReactStars count={5} size={24} value={product.rating} color2={'#ffd700'} />
                            </span>
                            <span className="text-sm text-gray-600 mt-1">{product.rating}/5</span>
                        </div>
                    )}
                    <div className="flex items-center mt-4 gap-5">
                        <p className='text-2xl text-black font-bold'>${product.pricing?.priceRange?.start?.gross?.amount}</p>
                        {product?.pricing?.discount?.gross?.amount && (
                            <div className="flex gap-5 my-auto">
                                <p className="text-lg line-through font-bold text-gray-400">${product?.pricing?.discount?.gross?.amount}</p>
                                <p className='bg-[#FFEBEB] text-[#FF3333] text-sm px-3 py-1 my-auto rounded-full'> - {discountPercentage}% </p>
                            </div>
                        )}
                    </div>

                    {colors.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">Select Colors</h3>
                            <div className="flex flex-wrap space-x-4 mt-2 border-b pb-4">
    {colors.map((color, index) => {
        // Validate if the color is a valid hex or a CSS color name
        const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
        const isValidColorName = /^[a-zA-Z]+$/.test(color) && CSS.supports("color", color);

        // Apply the color as a background style if it's valid
        const buttonStyle = isValidHex || isValidColorName ? { backgroundColor: color } : { backgroundColor: "gray" };

        return (
            <button
                key={index}
                className={`w-10 h-10 rounded-full relative ${
                    color.toLowerCase() === "white" ? "border border-black" : "border-none"
                }`}
                style={buttonStyle}
                onClick={() => setSelectedColor(color)}
            >
                {selectedColor === color && (
                    <span
                        className={`absolute inset-0 flex items-center justify-center ${
                            selectedColor.toLowerCase() === "white" ? "text-black" : "text-white"
                        } text-xl`}
                    >
                        <FaCheck />
                    </span>
                )}
            </button>
        );
    })}
</div>
                        </div>
                    )}

                    {sizes.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">Choose Size</h3>
                            <div className="flex flex-wrap space-x-2 sm:space-x-4 mt-2">
                                {sizes.map((size, index) => (
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
                                ))}
                            </div>
                        </div>
                    )}

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

                    <DescriptionAccordion title={"Product Description"} description={parse(productDescription)} />
                    <DeliveryAccordion />
                </div>
            </div>

            <div className="w-full mt-5">
                <Tabs material={material} />
            </div>
        </div>
    );
};

export default ProductDetails;