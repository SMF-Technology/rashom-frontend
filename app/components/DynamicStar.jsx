"use client"
import dynamic from 'next/dynamic';


// Dynamically import ReactStars to ensure it only renders on the client side

const ReactStars = dynamic(() => import('react-stars'), { ssr: false });


const DynamicReactStars = (props) => {

    return <ReactStars {...props} />;

};


export default DynamicReactStars;