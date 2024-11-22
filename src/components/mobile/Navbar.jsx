import { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../assets/css/navbar.css";
import { IoMdClose } from "react-icons/io";
import home from "../../assets/img/home.svg";
import logo from "../../assets/img/logo.png";
import money from "../../assets/img/money.png";
import register from "../../assets/img/register.svg";
import promotion from "../../assets/img/promotion.svg";
import trophy from "../../assets/img/trophy.svg";
import profile from "../../assets/img/profile.svg";
import contact from "../../assets/img/contact.svg";
import deposit from "../../assets/img/deposit.svg";
import about from "../../assets/img/about.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneVolume, FaViber } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import { Button, Spinner } from "react-bootstrap";
import LanguageDropdown from "../LanguageDropdown";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { lan, auth, user } = useContext(AuthContext);
  const { data: agent } = useFetch(BASE_URL + "/agent");
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
      name: "Cash In/Out History",
      link: "/information?tab=transfer",
    },
    {
      img: promotion,
      name_mm: "ပရိုမိုးရှင်း",
      name: "Promotion",
      link: "/promotion",
    },
    { img: contact, name_mm: "ဆက်သွယ်ရန်", name: "Contact", link: "/contact" },
    // {
    //   img: about,
    //   name_mm: "ကျွန်ုပ်တို့အကြောင်း",
    //   name: "About Us",
    //   link: "/about",
    // },
  ];
  const [show, setShow] = useState(false);

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
    <>
      <div className="navbar app-gradient py-0 px-2 shadow-lg ">
        <div className="d-flex align-items-center gap-1 gap-sm-2">
          <div
            onClick={() => setShow(true)}
            className=" cursor-pointer py-1 px-2 rounded  border border-dark bg-dark text-white"
          >
            <HiOutlineMenuAlt2 size={25} />
          </div>
          <Link to={"/"}>
            <img src={logo} className="navLogo" />
          </Link>
        </div>

        {auth && (
          <div className="d-flex align-items-center gap-sm-2">
            <Link to={"/information?tab=transfer"}>
              <img src={deposit} className="navDepositImg" />
            </Link>
            <div>
              <Link to={"/information?tab=profile"}>
                <div className="text-center" style={{ marginBottom: "0px" }}>
                  <img src={profile} className="me-1 navProfileImg" />
                  <small className="navBalance fw-bold">{user?.name}</small>
                </div>
                <div
                  style={{ background: "#3C0646" }}
                  className="ms-1 d-flex py-1 text-white px-2 px-sm-3 rounded-4"
                >
                  <small className="navBalance">
                    {Number(user?.balance).toLocaleString()} MMK{" "}
                  </small>
                  <span className="repeatIcon bg-danger ms-1">
                    <BsArrowRepeat size={16} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Offcanvas
        className="sidebar text-white "
        show={show}
        onHide={() => setShow(false)}
      >
        <div className=" px-sm-2">
          <Offcanvas.Header className=" w-100">
            <Offcanvas.Title className="w-100 d-flex align-items-center justify-content-between">
              <p> </p>
              <IoMdClose
                onClick={() => setShow(false)}
                className="cursor-pointer"
                size={30}
                color="#fff"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="w-100">
            {navLinks.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(item.link);
                    setShow(false);
                  }}
                  key={index}
                  className="cursor-pointer  mb-3 d-flex align-items-center gap-3"
                >
                  <img src={item.img} className="sideBarImg" />
                  <p className="fw-bold sidebarTitle">
                    {lan == "en" ? item.name : item.name_mm}
                  </p>
                </div>
              );
            })}
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
                    <h6 className="fw-semibold">{lan === "en" ? "Register" : "စာရင်းသွင်းပါ" }</h6>
                  </div>
                </div>
              </Link>
              <Link to={"/login"}>
                <div className="loginBtn mb-3">
                  <div className="text-center pt-3 ">
                    <h6 className="fw-semibold">{lan === "en" ? "Login" : "အကောင့်ဝင်ပါ" }</h6>
                  </div>
                </div>
              </Link>
              </>
            )}

            <div className="mt-4 w-max px-4 px-sm-5 py-2 cursor-pointer sidebarSocial text-center rounded-3">
              <FaPhoneVolume size={28} />
              <p className=" fw-semibold">{agent?.phone}</p>
            </div>
            {/* <h5 className=" sidebarTeleText text-center fw-semibold mt-4 mb-3">
              Telegram
              <span className="mx-1 mx-sm-3">|</span>
              0912346590
            </h5>
            <h5 className="sidebarViberText text-center fw-semibold">
              Viber
              <span className="mx-1 mx-sm-3">|</span>
              0912346590
            </h5> */}
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navbar;
