import React from "react"
import Sdata from "./Sdata"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import './Slider.css'

const SliderCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <Slider {...settings}>
        {Sdata.map((value) => {
          return (
            <>
              <div className='slide__box flex justify-center align-center'  key={value.id} style={{ backgroundImage: `url(${value.cover})`}} >   
                <div className='flex justify-center align-center flex-col'>
                  <p className="text-center">{value.desc}</p>
                  <h1 className="text-center font-medium">{value.title}</h1>
                  <button className='w-fit h-fit text-white font-semibold py-2 px-3 border-solid outline-1 mx-auto my-[20px]'>SHOP NOW</button>
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    
    </>
  )
}

export default SliderCard
