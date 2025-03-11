import React, { useState, useEffect } from 'react';

import productsData from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

import shopBanner from '../../assets/shopbanner.jpg'

const ShopPage = () => {
    const filters = {
        categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
        colors: ['all', 'red', 'black', 'orange'],
        priceRanges: [
            { label: 'under $50', min: 0, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $150', min: 100, max: 200 },
            { label: '$200 and above', min: 200, max: Infinity }
        ],
    };

    // const [products, setProducts] = useState(productsData);
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(16);
    
    const {category, color, priceRange} = filtersState;

    // const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    const [minPrice, maxPrice] = priceRange
    ? priceRange.split('-').map(Number)
    : [undefined, undefined];


    // const { data : {products= [], totalPages, totalProducts } ={}, error, isLoading} = useFetchAllProductsQuery({
    //     category : category!=='all' ? category : '',
    //     color : color !== 'all'? color : '', 
    //     minPrice : isNaN(minPrice) ? '' : minPrice, 
    //     maxPrice : isNaN(maxPrice) ? '' : maxPrice, 
    //     page : currentPage, 
    //     limit : productsPerPage,
    // })
// -----------------------------------------------
    // AI
    // const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    //     category: category !== 'all' ? category : '', 
    //     color: color !== 'all' ? color : '', 
    //     minPrice: isNaN(minPrice) || minPrice === undefined ? '' : minPrice, 
    //     maxPrice: isNaN(maxPrice) || maxPrice === undefined ? '' : maxPrice, 
    //     page: currentPage, 
    //     limit: productsPerPage,
    // });
    

    // const applyFilters = () => {
    //     let filteredProducts = productsData;

    //     // Filter by category
    //     if (filtersState.category !== 'all') {
    //         filteredProducts = filteredProducts.filter(
    //             (product) => product.category === filtersState.category
    //         );
    //     }

    //     // Filter by color
    //     if (filtersState.color !== 'all') {
    //         filteredProducts = filteredProducts.filter(
    //             (product) => product.color === filtersState.color
    //         );
    //     }

    //     // Filter by price range
    //     if (filtersState.priceRange) {
    //         const { min, max } = filtersState.priceRange;
    //         filteredProducts = filteredProducts.filter(
    //             (product) => product.price >= min && product.price <= max
    //         );
    //     }

    //     setProducts(filteredProducts);
    // };
    // code in v
    // useEffect(() => {
    //     applyFilters();
    // }, [filtersState]);

    // const clearFilters = () => {
    //     setFiltersState({
    //         category: 'all',
    //         color: 'all',
    //         priceRange: { min: 0, max: Infinity },
    //     });
    // };

    const totalProducts = 2;
    const totalPages = 2;

    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: '',
        });
    };

    // pagination---------------------------------
    // const handlePageChange = (pageNumber) =>{
    //     if(pageNumber > 0 && pageNumber){
    //         setCurrentPage(pageNumber)
    //     }
    // }    

    // if(isLoading) return <div>Loading...</div>
    // if(error) return <div>Error Loading...</div>

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + productsData.length - 1; 

// --------------------------------------------

    return (
        <>
            <section  className="bg-primary-light h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[20rem] xl:h-[22rem] bg-cover bg-center flex align-center justify-center flex-col"
                style={{ backgroundImage: `url(${shopBanner})` }}>
                {/* <h2 className="section__header capitalize">Search Page</h2>
                <p className="section__subheader">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur obcaecati porro molestias.
                </p> */}
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />

                    <div>
                        <h3 className='text-xl font-medium mb-4'>
                            Showing {startProduct} to {endProduct} of {totalProducts} products
                        </h3>

                        <ProductCards products={productsData} />

                        {/* pagination control */}

                        <div className='mt-6 flex justify-center ' >
                            <button 
                            onClick={()=> handlePageChange(currentPage - 1)}
                            className='px-4 py-2 bg-gray-200 text-gray-700  rounded-md mr-2'>Previous</button>
                            {
                                [...Array(totalPages)].map((_,index)=> (
                                    <button key={index}
                                    onClick={()=> handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                                    >{index + 1}</button>
                                ))
                            }
                            <button 
                            onClick={()=> handlePageChange(currentPage + 1)} 
                            className='px-4 py-2 bg-gray-200 text-gray-700  rounded-md ml-2'>next</button>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;
