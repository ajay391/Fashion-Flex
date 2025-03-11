import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Categories = () => {
    const categories = [
        { id: 1, name: 'Pants', path: 'accessories', image: category1 },
        { id: 2, name: 'Shirts', path: 'dress', image: category2 },
        { id: 3, name: 'Hoodies', path: 'jewellery', image: category3 },
        { id: 4, name: 'Jackets', path: 'cosmetics', image: category4 }
    ];

    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
            swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, [categories]);

    return (
        <div className='max-w-[1200px] mx-auto px-4 py-10 relative'>
            <h2 className="text-center text-xl md:text-3xl font-bold mb-8 uppercase text-gray-800">
                Shop by Categories
            </h2>

            {/* Swiper with Custom Navigation */}
            <div className="relative">
             <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        500: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }} // 🔥 Fix here
                    className="w-full"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="p-4">
                            <Link to={`/categories/${category.path}`} className="block group">
                                <div className="relative overflow-hidden rounded-lg shadow-md transition-transform transform group-hover:scale-105">
                                    <img 
                                        src={category.image} 
                                        alt={category.name} 
                                        className="w-full h-[250px] object-cover rounded-lg"
                                    />
                                </div>
                                <h4 className="text-center text-lg font-semibold mt-5 text-gray-700">
                                    {category.name}
                                </h4>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button 
                    ref={prevRef} 
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-10"
                >
                    <FaChevronLeft size={20} />
                </button>
                <button 
                    ref={nextRef} 
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-10"
                >
                    <FaChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Categories;
