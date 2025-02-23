"use client";
import { useState, useEffect } from "react";

const OfferText = () => {
    const texts = [
        "Welcome to our website!",
        "Check out our latest products.",
        "Contact us for more information.",
        "Stay updated with our newsletter.",
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState("left");

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Change text every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentTextIndex]);

    const handlePrev = () => {
        setAnimationDirection("right");
        setCurrentTextIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
    };

    const handleNext = () => {
        setAnimationDirection("left");
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 w-auto mx-auto text-black">
                <div className="flex items-center justify-center space-x-1">
                    {/* <button
                        onClick={handlePrev}
                        className="font-extrabold transition duration-75"
                    >
                        &lt;
                    </button> */}
                    <div className="relative overflow-hidden w-96 h-10">
                        {texts.map((text, index) => (
                            <div
                                key={index}
                                className={`absolute w-full text-center transition-transform duration-500 ${index === currentTextIndex
                                        ? "translate-x-0"
                                        : animationDirection === "left"
                                            ? "-translate-x-full"
                                            : "translate-x-full"
                                    }`}
                            >
                                <p className="text-lg font-semibold my-auto mt-2">{text}</p>
                            </div>
                        ))}
                    </div>

                    {/* <button
                        onClick={handleNext}
                        className="font-extrabold transition duration-200"
                    >
                        &gt;
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default OfferText;
