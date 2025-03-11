import React from 'react'

const PromoBanner = () => {
  return (
    <div className='section__container banner__container'>
      <div className="banner__card">
          <span><i className='ri-truck-fill'></i></span>
          <h4>Fast & Free Shipping</h4>
          <p>Get your orders delivered quickly with our free nationwide shipping.</p>
      </div>
      <div className="banner__card">
          <span><i className='ri-money-dollar-circle-fill'></i></span>
          <h4>Cash on Delivery</h4>
          <p>Enjoy secure payment with our hassle-free cash-on-delivery option.</p>
      </div>
      <div className="banner__card">
          <span><i className='ri-refresh-line'></i></span>
          <h4>Easy Returns</h4>
          <p>Shop with confidence! We offer a seamless 7-day return policy.</p>
      </div>
  </div>
  )
}

export default PromoBanner