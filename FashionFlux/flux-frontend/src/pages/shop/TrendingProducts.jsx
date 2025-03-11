import React, { useState } from "react";
import ProductCards from "./ProductCards";

import products from '../../data/products.json'

import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  

//   const { data, isLoading, isError } = useFetchAllProductsQuery({ limit: 50 });

//   const products = Array.isArray(data?.products) ? data.products : [];

//   console.log("API Response:", products);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };


//   if (isLoading) {
//     return <p className="text-center">Loading products...</p>;
//   }


//   if (isError) {
//     return <p className="text-center text-red-500">Failed to load products. Please try again.</p>;
//   }

  return (
    <section className="section__container product__container">
      <h2 className="text-center text-4xl md:text-4xl font-bold mb-6 uppercase text-gray-800">Just In</h2>
      <p className="section__subheader mb-5 pb-[16px] mx-auto text-gray-500">
        Stay ahead with the newest arrivals!
      </p>

      {/* Product cards */}
      <ProductCards products={products?.slice(0, visibleProducts)} />

      {/* Load More Button */}
      <div className="product__btn mt-7">
        {visibleProducts < products?.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
