import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'

import Products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
     const {categoryName} = useParams();
     const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() =>{
        const filtered = Products.filter((product)=> product.category === categoryName.toLowerCase());
        setFilteredProducts(filtered)
    }, [categoryName])

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur obcaecati porro molestias.</p>

    </section>

    <div className='section__container'>
        <ProductCards products={filteredProducts}/>
    </div>
        
    </>
  )
}

export default CategoryPage