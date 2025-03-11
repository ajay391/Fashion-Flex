import React from 'react'

import { Link } from 'react-router-dom';  
import RatingStars from '../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({products}) => {

    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    // console.log(products)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {products.map((product) => (
                <div key={product._id} className='product__card  overflow-hidden'>
                    <div className='relative'>
                        <Link to={`/shop/${product._id}`} className='block'>
                            <img
                                src={product.image}
                                alt={product.name}
                                className='max-h-[24rem] h-[24rem] w-full object-cover hover:scale-[1.03] transition-all duration-300'
                            />
                        </Link>
                        {/* <Link to={`/shop/${product._id}`} className='block'>
                            <img
                                src={product.image}
                                alt={product.name}
                                className='h-[24rem] sm:h-[20rem] md:h-[22rem] lg:h-[24rem] xl:h-[26rem] w-full object-cover hover:scale-[1.03] transition-all duration-300'
                            />
                        </Link> */}

                    </div>

                    {/* Product Info & Cart Button in Row */}
                    <div className='px-0 py-4 flex justify-between items-center'>
                        {/* Name & Price */}
                        <div>
                            <h4 className='text-lg font-semibold text-gray-800'>{product.name}</h4>
                            <p className='text-gray-600'>
                                {product.oldPrice ? <s className="text-red-500 mr-2">${product.oldPrice}</s> : null}
                                Rs. {product.price}
                            </p>
                        </div>

                        {/* Cart Button */}
                        <button
                            onClick={() => handleAddToCart(product)}
                            className='bg-black text-white py-3 px-4 ml-3 rounded hover:bg-gray-800 transition-all'
                        >
                            <i className="ri-shopping-cart-2-line"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;