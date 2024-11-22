import React from 'react'
import { Carousel } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch'
import BASE_URL from '../../hooks/baseURL'

const Carousels = () => {
  const {data: banners} = useFetch(BASE_URL + "/banner");
  
  return (
    <Carousel>
      {banners && banners.map((banner,index)=>{
        return  <Carousel.Item key={index}>
          <img src={banner.img_url} className='bannerImg' />
        </Carousel.Item>
      })}
   
    </Carousel>
  )
}

export default Carousels
