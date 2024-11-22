import React from 'react'
import  fp1 from '../../assets/img/fp1.png'
import  fp2 from '../../assets/img/fp2.png'
import  fp3 from '../../assets/img/fp3.png'
import  fp4 from '../../assets/img/fp4.png'
import  fp5 from '../../assets/img/fp5.png'
import  fp6 from '../../assets/img/fp6.png'
import  fp8 from '../../assets/img/fp8.png'
import  fp9 from '../../assets/img/fp9.png'
import  fp10 from '../../assets/img/fp10.png'
import  fp11 from '../../assets/img/fp11.png'
import  fp12 from '../../assets/img/fp12.png'
import  fp13 from '../../assets/img/fp13.png'
import  fp14 from '../../assets/img/fp14.png'
import  fp15 from '../../assets/img/fp15.png'
import  fp16 from '../../assets/img/fp16.png'
import  fp18 from '../../assets/img/fp18.png'
import  fp19 from '../../assets/img/fp19.png'
import  fp20 from '../../assets/img/fp20.png'
import  fp21 from '../../assets/img/fp21.png'
import  fp22 from '../../assets/img/fp22.png'
import  fp23 from '../../assets/img/fp23.png'

import Marquee from 'react-fast-marquee'
 
const FooterProviders = () => {
     const providers=[fp1, fp2, fp3, fp4, fp5, fp6,  fp8, fp9, fp10, fp11, fp12, fp13, fp14, fp15, fp16, fp18, fp19, fp20, fp21, fp22, fp23]

     const date = new Date(); const year = date.getFullYear();


    return (
    <div style={{background:'#0D0D0D'}} className='py-5' >
       <p className='d-block text-center'>Best viewed by Google Chrome 72.0 or higher. Best viewed at a resolution of 1280x1024 or higher</p>
       <p className="d-block text-center my-4">TigerMM Copyright © {year} . All rights reserved.</p>
      <div className='mt-3 d-flex flex-wrap align-items-center justify-content-center gap-3 px-0 px-sm-4  mb-5 mb-sm-0'>
         {providers.map((img,index)=>{
            return <img src={img} className='providerImg ' key={index} />
        })}
        </div>
    </div>
  )
}

export default FooterProviders
