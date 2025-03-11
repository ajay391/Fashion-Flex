import React, { useState } from 'react';
import { Link } from "react-router-dom";
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';

import Accordion from '../../../components/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const SingleProduct = () => {
    const dispatch = useDispatch();

    const singleProduct = {
        "_id": 10,
        "name": "Hyper Drift Oversized Tee",
        "category": "Oversized T-shirts",
        "description": "A premium oversized tee for ultimate comfort and street style.",
        "price": 59.99,
        "oldPrice": 79.99,
        "images": [
            "https://i.pinimg.com/736x/3e/bb/51/3ebb513183bf7fa98da81e9f3dfe1bd7.jpg",
            "https://i.pinimg.com/736x/76/8c/75/768c75d88762e595d1633bf7f17b0fe3.jpg",
            "https://i.pinimg.com/736x/93/d5/c4/93d5c498f9800930a8012a4a53bdbaec.jpg",
            "https://i.pinimg.com/736x/26/d7/c7/26d7c7c37a815afcee7e2d25f952c6cb.jpg"
        ],
        "color": "Green",
        "rating": 4.2
    };

    const [mainImage, setMainImage] = useState(singleProduct.images[0]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle current or close all
    };

    const accordionData = [
        {
            title: "Material & Care",
            content: (
                <ul>
                    <li>✔ Premium Heavy Gauge Fabric</li>
                    <li>✔ 100% Cotton</li>
                    <li>✔ Machine Wash</li>
                </ul>
            ),
        },
        {
            title: "Country of Origin",
            content: "India (and proud)",
        },
        {
            title: "Manufactured & Sold By",
            content: (
                <div>
                    <p><strong>The Souled Store Pvt. Ltd.</strong></p>
                    <p>224, Tantia Jogani Industrial Premises</p>
                    <p>J.R. Boricha Marg, Lower Parel (E), Mumbai - 400 011</p>
                </div>
            ),
        }
    ];

    return (
        <>
            {/* Breadcrumb Navigation */}
            <section className="max-w-[1400px] mx-auto px-4 pt-[40px]">
                <div className="text-sm text-gray-500 space-x-2">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span> / </span>
                    <Link to="/shop" className="hover:text-primary">Shop</Link>
                    <span> / </span>
                    <span className="text-gray-800">{singleProduct.name}</span>
                </div>
            </section>

            {/* Product Section */}
            <section className="max-w-[1400px] mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-8 items-start">
                    
                    {/* Thumbnail Images (Left Side for Large Screens) */}
                    <div className="hidden md:flex flex-col gap-4">
                        {singleProduct.images.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt="Thumbnail" 
                                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md cursor-pointer border-2 transition-all
                                    ${mainImage === img ? 'border-primary' : 'border-gray-300'}`} 
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="w-full flex justify-center">
                        <img 
                            src={mainImage} 
                            alt={singleProduct.name} 
                            className="w-full max-w-[550px] sm:max-w-[600px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[800px] h-auto aspect-[4/5] object-cover rounded-lg shadow-md"
                        />
                    </div>

                      {/* Thumbnails Below for Small Screens */}
                      <div className="flex md:hidden justify-center gap-4 mt-4">
                        {singleProduct.images.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt="Thumbnail" 
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all
                                    ${mainImage === img ? 'border-primary' : 'border-gray-300'}`} 
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>

                    {/* Product Details */}
                    <div className="w-full">
                        <h3 className="text-3xl font-semibold mb-6">{singleProduct.name}</h3>
                        <p className="text-xl font-medium mb-6 text-gray-400">{singleProduct.category}</p>
                        <p className="text-xl text-black mb-6 font-semibold">
                        {singleProduct.oldPrice && <s className="text-red-400 mr-2">${singleProduct.oldPrice} </s>} Rs. {singleProduct.price}
                        </p>

                        <p className="text-gray-600 mb-2">Please select a size </p>

                        <div className="mb-5 flex gap-3">
                            <div 
                                className="w-[50px] h-[35px] border-2 border-gray-500 bg-transparent text-gray-600 font-normal  hover:bg-gray-100 focus:outline-none flex items-center justify-center cursor-pointer"
                                 // Add click functionality
                            >
                                XS
                            </div>
                            <div 
                                className="w-[50px] h-[35px] border-2 border-gray-500 bg-transparent text-gray-600 font-normal  hover:bg-gray-100 focus:outline-none flex items-center justify-center cursor-pointer"
                                 // Add click functionality
                            >
                                S
                            </div>
                            <div 
                                className="w-[50px] h-[35px] border-2 border-gray-500 bg-transparent text-gray-600 font-normal  hover:bg-gray-100 focus:outline-none flex items-center justify-center cursor-pointer"
                                 // Add click functionality
                            >
                                M
                            </div>
                            <div 
                                className="w-[50px] h-[35px] border-2 border-gray-500 bg-transparent text-gray-600 font-normal  hover:bg-gray-100 focus:outline-none flex items-center justify-center cursor-pointer"
                                 // Add click functionality
                            >
                               L
                            </div>
                            <div 
                                className="w-[50px] h-[35px] border-2 border-gray-500 bg-transparent text-gray-600 font-normal  hover:bg-gray-100 focus:outline-none flex items-center justify-center cursor-pointer"
                                 // Add click functionality
                            >
                               XL
                            </div>
                        </div>

                        {/* <p className="text-gray-600 mb-6">{singleProduct.description}</p> */}

                        <div className="space-y-2 mb-7">
                        <label htmlFor="quantity">Quantity </label>
                            <select id="quantity" name="quantity" className="w-fit p-2 border-2 border-gray-300 bg-white mx-3">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            {/* <p><strong>Category: </strong> {singleProduct.category}</p> 
                            <p><strong>Color: </strong> {singleProduct.color}</p> 
                            <div className="flex items-center">
                                <strong className="mr-2">Rating: </strong>
                                <RatingStars rating={singleProduct.rating} />
                            </div> */}
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            className="w-fit mb-7 bg-black text-white px-8 py-3 shadow-md hover:bg-gray-800 transition-all"
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(singleProduct); }}
                        >
                            Add to Cart
                        </button>

                        <p className="text-gray-500 text-sm flex items-start gap-2 p-1 ">
                            <i className="ri-refresh-line text-gray-500 text-[20px]"></i>
                            This product can be returned or exchanged within 30 days of purchase. No questions asked.
                        </p>

                        <div className='my-4'>

                        <div className="border-t">
                            {accordionData.map((item, index) => (
                                <Accordion 
                                    key={index}
                                    title={item.title} 
                                    content={item.content} 
                                    isOpen={openIndex === index}
                                    onToggle={() => toggleAccordion(index)}
                                />
                            ))}
                        </div>

                            {/* <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                >
                                <Typography component="span">Accordion 1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                >
                                <Typography component="span">Accordion 2</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                                >
                                <Typography component="span">Accordion Actions</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                                <AccordionActions>
                                <Button>Cancel</Button>
                                <Button>Agree</Button>
                                </AccordionActions>
                            </Accordion> */}


                        </div>

                    </div>

                  

                </div>
            </section>
        </>
    );
};

export default SingleProduct;
