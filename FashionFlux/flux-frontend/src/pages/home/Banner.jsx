import React from 'react';
import { Link } from "react-router-dom";

import bannerImg from '../../assets/Hero.jpg';

const Banner = () => {
  return (
    <section className='py-[3rem]'>

      <div 
        className="header__container flex items-center justify-center flex-col bg-cover bg-center h-[60vh] md:h-[70vh] px-4 text-center "
        style={{ backgroundImage: `url(${bannerImg})` }}
        >
        <h1 className="text-white font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl">
          End of Season Sale
        </h1>
        <h2 className="text-white text-lg md:text-xl mt-2">
          Up to 60% off on almost everything
        </h2>
        <Link to="/shop">
          <button className="mt-6 px-6 py-4 bg-white text-black font-semibold text-sm md:text-sm transition-all duration-300 hover:bg-gray-200">
            Shop Now
          </button>
        </Link>
      </div>
      </section>
  );
};

export default Banner;
