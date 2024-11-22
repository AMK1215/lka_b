import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { FaPhoneVolume, FaViber } from "react-icons/fa";
import profile from "../../assets/img/profile.svg";
import contact from "../../assets/img/contact.svg";
import about from "../../assets/img/about.svg";
import home from "../../assets/img/home.svg";
import money from "../../assets/img/money.png";
import promotion from "../../assets/img/promotion.svg";
import { Link } from "react-router-dom";
import slot from "../../assets/img/slot.svg";
import fish from "../../assets/img/fish.svg";
import card from "../../assets/img/card.svg";
import football from "../../assets/img/sport.svg";
import { BsArrowRepeat } from "react-icons/bs";
import depositLg from "../../assets/img/depositLg.png";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";

const SidebarLg = () => {
  const { lan, auth, user, content } = useContext(AuthContext);
  const { data: agent } = useFetch(BASE_URL + "/agent");
  // console.log(agent);

  const [loader, setLoader] = useState(false);
  const navLinks = [
    { img: home, name_mm: "ပင်မ", name: "Home", link: "/" },
    {
      img: profile,
      name_mm: "မိမိမှတ်တမ်း",
      name: "My Records",
      link: "/information?tab=profile",
    },
    {
      img: money,
      name_mm: "ငွေသွင်း/ငွေထုတ်",
      name: "Cash In/Out",
      link: "/information?tab=transfer",
    },
    {
      img: promotion,
      name_mm: "ပရိုမိုးရှင်း",
      name: "Promotions",
      link: "/promotion",
    },
    { img: contact, name_mm: "ဆက်သွယ်ရန်", name: "Contact", link: "/contact" },
    // { img: about, name_mm: "ကျွန်ုပ်တို့အကြောင်း",name: "About Us", link: "/about" },
  ];
  const items = [
    {
      img: slot,
      link: "/?type=slot&&list=PP",
      value: "slot",
      name: "Slots",
      name_mm: "စလော့ဂိမ်းများ",
    },
    {
      img: fish,
      link: "/?type=fishing&&list=PlayStar",
      value: "fishing",
      name: "Fishing",
      name_mm: "ငါးပစ်ဂိမ်းများ",
    },
    {
      img: card,
      link: "/?type=live casino&&list=PP",
      value: "live casino",
      name: "Live Casino",
      name_mm: "ကာစီနိုဂိမ်းများ",
    },
    {
      img: football,
      link: "/?type=sport book",
      value: "sport book",
      name: "Sport Book",
      name_mm: "အားကစားဂိမ်းများ",
    },
  ];
  const logout = async (e) => {
    e.preventDefault();
    setLoader(true);
    localStorage.removeItem("token");
    window.location.href = "/login";
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      if (response.ok) {
        // console.log("Logout success!");
        setLoader(false);
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="sidebarLgContainer">
      <div className="text-center my-1">
        <Link to={"/"}>
          <img src={logo} className="" width={230} />
        </Link>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        {auth && (
          <div>
            <Link to={"/information?tab=profile"}>
              <div
                className="d-flex align-items-center gap-2 justify-content-center"
                style={{ marginBottom: "0px" }}
              >
                <img src={profile} className="me-1 navProfileImg" />
                <h5 className="navBalance fw-bold">
                  {user?.name && user.name}
                </h5>
              </div>
              <div
                style={{ background: "#3C0646" }}
                className="ms-1 d-flex py-1  text-white px-2 px-sm-3 rounded-4 mb-3"
              >
                <p className="navBalance">
                  {user?.balance && Number(user.balance).toLocaleString()} MMK
                </p>
                {/* <span className="repeatIcon bg-danger ms-1">
                  <BsArrowRepeat size={16} />
                </span> */}
              </div>
            </Link>
            <Link className="btn btn-warning rounded-5 w-100" to={"/information?tab=transfer"}>
            {content?.wallet?.deposit}
              {/* <img src={depositLg} className="depositLgImg" /> */}
            </Link>
          </div>
        )}
      </div>
      <div className="text-center px-4 mt-4">
        {auth && (
          <div className="registerBtn mb-3 cursor-pointer" onClick={logout}>
            <div className="text-center pt-3 ">
              {loader && <Spinner size="sm" className="me-2" />}
              <h5 className="fw-semibold d-inline">
                {lan === "en" ? "Logout" : "အကောင့်ထွက်ရန်"}
              </h5>
            </div>
          </div>
        )}
        {!auth && (
          <>
            <Link to={"/register"}>
              <div className="registerBtn">
                <div className="text-center pt-3 ">
                  <h6 className="fw-semibold">
                    {lan === "en" ? "Register" : "စာရင်းသွင်းပါ"}
                  </h6>
                </div>
              </div>
            </Link>
            <Link to={"/login"}>
              <div className="loginBtn mb-3">
                <div className="text-center pt-3 ">
                  <h6 className="fw-semibold">
                    {lan === "en" ? "Login" : "အကောင့်ဝင်ပါ"}
                  </h6>
                </div>
              </div>
            </Link>
          </>
        )}

        {navLinks.map((item, index) => {
          return (
            <Link to={item.link} key={index}>
              <div className="py-2 mb-3 px-4 rounded-5 border border-2 border-white text-center d-flex align-items-center justify-content-center gap-2">
                <img src={item.img} className="sidebarLgIcon" />
                <p className="fw-semibold">
                  {lan == "en" ? item.name : item.name_mm}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {items.map((item, index) => {
        return (
          <Link
            to={item.link}
            className="lgGameTab py-1 mx-3 d-flex items-center justify-content-center gap-2 mb-2"
            key={index}
          >
            <img src={item.img} className="fixedBottomIcon lgGameTabText" />
            <p className="fw-semibold lgGameTabText">
              {lan === "en" ? item.name : item.name_mm}
            </p>
          </Link>
        );
      })}
      <div className="mt-4 w-max px-4 px-sm-5 py-2 cursor-pointer sidebarSocial text-center rounded-3">
        <FaPhoneVolume size={28} />
        <p className=" fw-semibold">{agent?.phone}</p>
      </div>
      {/* <h5 className=" sidebarTeleText text-center fw-semibold mt-4 mb-3">
        Telegram
        <span className="mx-1 mx-sm-3">|</span>
        0912346590
      </h5>
      <h5 className="sidebarViberText text-center fw-semibold mb-5">
        Viber
        <span className="mx-1 mx-sm-3">|</span>
        0912346590
      </h5> */}
    </div>
  );
};

export default SidebarLg;
