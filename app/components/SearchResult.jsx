"use client"

import React, { Suspense, useState } from "react";

import p1 from '../../public/images/p1.png'
import p2 from '../../public/images/p2.png'
import p3 from '../../public/images/p3.png'
import { GrFavorite } from "react-icons/gr";
import Image from 'next/image';
import ReactStars from 'react-stars'
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { fetchData } from "../lib/fetchData";
import CommonComponent from "./CommonComponent";



const Page = async () => {

    const searchParams = useSearchParams();

    const query = searchParams.get("query") || ""; // Get the query from search params, default to empty string if not found

    const [filter, setFilter] = useState("");


    


    return (

        <div className="container mx-auto px-4 py-8">

            <div className="flex justify-between">

                <div>

                    <h1 className="text-2xl font-bold mb-4 text-black">{query}</h1>

                    <p className="text-gray-500 mb-6">3 items found for "{query}"</p>

                </div>

                <div>

                    <div className="relative mb-6">

                        <select

                            className="block appearance-none w-48 bg-white border-b-2 border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none"

                            onChange={(e) => setFilter(e.target.value)}

                        >

                            <option value="">Sort by</option>

                            <option value="pocket">Pocket Tee</option>

                            <option value="henley">Henley</option>

                            <option value="polo">Polo</option>

                            <option value="graphics">Graphic</option>

                        </select>

                    </div>

                </div>

            </div>


            {/* Product Grid */}

          

        </div>

    );

};


const WrappedPage = () => (

    <Suspense >

        <Page />

    </Suspense>

);


export default WrappedPage;