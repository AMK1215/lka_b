import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/mobile/Footer";
import Carousel from "../components/mobile/Carousel";
import "../assets/css/home.css";
import { Link } from "react-router-dom";
import { FaGift, FaViber } from "react-icons/fa";
import Telegram from "../assets/img/tele.png";
import Viber from "../assets/img/viber.png";
import Facebook from "../assets/img/fb.png";
import Line from "../assets/img/line.webp"
import adsImg from '../assets/img/ads.png';
import Marquee from "../components/mobile/Marquee";
import BASE_URL from "../hooks/baseURL";
import useFetch from "../hooks/useFetch";
import { IoWalletOutline } from "react-icons/io5";
import GameTabsLg from "../components/desktop/GameTabsLg";
import LanguageDropdown from "../components/LanguageDropdown";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Modal } from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const HomePage = () => {
    const { lan, auth } = useContext(AuthContext);
    const {data: agent} = useFetch(BASE_URL + "/agent");
    const { data: contacts } = useFetch(BASE_URL + "/contact");

    let viber = contacts && contacts.find((item) => item.name == "Viber");
    let telegram = contacts && contacts.find((item) => item.name == "Telegram");
    let facebook = contacts && contacts.find((item) => item.name == "Facebook");
  
    const MySwal = withReactContent(Swal);
    const { data:ads } = useFetch(BASE_URL + "/popup-ads-banner");

    const showAlertWithImage = () => {
        MySwal.fire({
          text: 'ငွေသွင်းငွေထုတ်အတွက် အကြောင်းကြားစာ ဆက်သွယ်နိုင်ပါတယ် အခုပဲ ဆက်သွယ်လိုက်ပါ  @bossi',
          imageUrl: ads?.img_url , // Replace with your image URL
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Ads Image',
          confirmButtonText: 'OK'
        });
      };

    useEffect(()=>{
    if(ads?.img_url)  showAlertWithImage()
    },[ads?.img_url])
  
  return (
    <div >
       <div className="px-lg-3">
        <div className="d-flex align-items-center  gap-sm-3">
          <Marquee />
          <LanguageDropdown />
        </div>
        <Carousel />
        
        {!auth && (
          <div className="beforeLoginHome my-5 pb-3">
            <Link to={"/register"}>
              <div className="registerBtn mb-3 ">
                <div className="text-center pt-3 ">
                  <h5 className="fw-semibold">
                    {lan === "en" ? "Register" : "စာရင်းသွင်းရန်"}
                  </h5>
                </div>
              </div>
            </Link>
            <Link to={"/login"}>
              <div className="loginBtn mb-3">
                <div className="text-center pt-3">
                  <h5 className="fw-semibold">
                    {lan === "en" ? "Login" : "အကောင့်ဝင်ရန်"}
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="beforeLoginHome my-5 pb-3">
          <Link to={"/information?tab=transfer"}>
            <button className="w-full py-2 rounded-3 sidebarSocial bg-white text-center text-black fw-bold">
              <IoWalletOutline size={30} className="me-2" />
              {lan === "en" ? "Cash In/Out" : "ငွေသွင်း/ငွေထုတ်"}
            </button>
          </Link>

          {/* <Link to={viber?.value} target="_blank" className="mt-4 w-full text-center d-flex align-items-center justify-content-center gap-2  py-2 cursor-pointer sidebarSocial text-center rounded-3">
            <FaViber size={28} />
            <p className=" fw-semibold">: {viber?.value}</p>
          </Link> */}
          <Link
            to={"/promotion"}
            className="mt-4  w-full text-center d-flex align-items-center justify-content-center gap-2   py-2 cursor-pointer homePromotionBtn text-center rounded-3"
          >
            <FaGift size={28} />
            <p className=" fw-semibold  ">
              {lan === "en" ? "Promotion" : "ပရိုမိုးရှင်း"}
            </p>
          </Link>
          <div className="mt-4  d-flex align-items-center  justify-content-center gap-4">
            {contacts && contacts.map((item, index) => {
              return (
                <Link to={item.value} target="_blank" key={index}>
                  <img 
                  src={item.name == "Facebook" ? Facebook : item.name == "Viber" ? Viber : item.name == "Telegram" ? Telegram : item.name == "Line" ? Line : item.name == "WhatsApp" ? WhatsApp : ""} 
                  className="homeContactImg" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Desktop Games Tabs */}
      <GameTabsLg />
      <Footer contact={contacts} />
    </div>
  );
};

export default HomePage;
