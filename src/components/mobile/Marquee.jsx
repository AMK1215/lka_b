import React from 'react'
import { BsVolumeUp } from 'react-icons/bs'
import useFetch from '../../hooks/useFetch'
import BASE_URL from '../../hooks/baseURL'
 

const Marquee = () => {
   const {data: bannerText} = useFetch(BASE_URL + "/bannerText");
 
  return (
    <div className='d-flex align-items-center gap-2 shadow-lg  homeMarquee  p-1  m-2 w-100'>
        <BsVolumeUp size={18} className='ms-2 soundIcon marqueeText' />
        <marquee className='marqueeText' behavior="" direction="left">
           {bannerText?.text}
        </marquee>
    </div>
    

   )
}

export default Marquee
