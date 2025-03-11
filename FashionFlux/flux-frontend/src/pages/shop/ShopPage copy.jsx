import React , {useState , useEffect} from 'react';

import productsData from '../../data/products.json'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';



const ShopPage = () => {

    const filters = {
        categories : ['all' , 'shirts' , 'Jeans' , 'T-shirts' ] , 
        colors : [ 'all' , 'red' , 'black' , 'orange'],
        priceRanges: [
            {label:'under 500' , min:0 , max:50},
            {label:'500 - 1000' , min:50 , max:100},
            {label:'1000 - 1500' , min:100 , max:150},
            {label:'1500 above' , min:150 , max:Infinity}
        ]
    
    }

    const [products, setProducts] = useState(productsData)
    const [filtersState, setFiltersState] = useState({
        category : 'all',
        color : 'all',
        priceRange : ''
    })

    // console.log(productsData)

    const applyFilters = () => {
        let filteredProducts  = productsData;

        if(filtersState.category && filtersState.category !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.category === filtersState.category)
        }

        if(filtersState.color && filtersState.color !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.color === filtersState.color)
        }

        if(filtersState.priceRange){
            const [minPrice , maxPrice] = filtersState.priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
        }

        setProducts(filteredProducts)
    }

    useEffect(()=> {
        applyFilters()
    }, [filtersState])

    const clearFilters = () => {
        setFiltersState({
            category : 'all',
            color : 'all',
            priceRange : ''
        })
    }

   
  return (
    <>
        <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>Search Page</h2>
            <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur obcaecati porro molestias.</p>
        </section>

        <section className='section__container '>
            <div className='flex flex-col md:flex-row md:gap-12 gap-8'>

                <ShopFiltering 
                filters={filters} 
                filtersState={filtersState} 
                setFiltersState={setFiltersState} 
                clearFilters={clearFilters} />

                <div>
                    <h3>Products Available</h3>
                    <ProductCards products={products} />

                </div>


            </div>

        </section>

    </>
  )
}

export default ShopPage