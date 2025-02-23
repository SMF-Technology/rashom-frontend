"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import b1 from '../../public/images/banner4.png'
import b2 from '../../public/images/p4.png'

const ImageSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
       <div>
        <Image className="w-full h-[150px] sm:h-[250px] md:h-[500px] object-fill" src={b1} alt='slider-image' />
       </div>
       <div>
        <Image className="w-full h-[150px] sm:h-[250px] md:h-[500px] object-fill" src={b1} alt='slider-image' />
       </div>
      
     
      </Slider>
    </div>
  );
};

export default ImageSlider;
