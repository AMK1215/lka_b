import React, { useContext, useEffect } from "react";
import { FaHistory, FaUser } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../assets/css/information.css";
import Profile from "../components/mobile/Profile";
 import BankAccount from "../components/mobile/BankAccount";
import MoneyTransfer from "../components/mobile/MoneyTransfer";
import ChangePassword from "../components/mobile/ChangePassword";
import Log from "../components/mobile/Log";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
 

const InformationPage = () => {
  const { content } = useContext(AuthContext);
  const navigate = useNavigate();
   const [searchParams] = useSearchParams();
  const heading = [
    {
      id: 1,
      icon: <FaUser />,
      title: content.nav.profile_user,
      link: "/information?tab=profile",
      value: "profile",
    },
    {
      id: 2,
      icon: <IoWalletSharp />,
      title: content.nav.money_transfer,
      link: "/information?tab=transfer",
      value: "transfer",
    },
    {
      id: 3,
      icon: <FaHistory />,
      title: content.nav.logs,
      link: "/information?tab=logs&log=1",
      value: "logs",
    },
  ];
  const tab = searchParams.get("tab");
  useEffect(() => {
    if (!tab) navigate("/information?tab=profile");
  }, []);
  return (
    <AuthContextProvider>
    <div className="mb-5 pb-5" style={{ overflowX: "hidden" }}>
      <div style={{ background: "#560A61" }} className="row">
        {heading.map((item) => {
          return (
            <div
              key={item.id}
              className={`${
                item.value === searchParams.get("tab") ? "activeInfoTab" : ""
              } text-center col-4`}
            >
              <div className={` py-2 text-center cursor-pointer`}>
                <Link to={item.link} className="text-center ">
                  <div className="infoIcon">{item.icon}</div>
                  <small className="infoTitle mt-sm-1 d-block fw-semibold">
                    {item.title}
                  </small>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-4 px-2 px-sm-5 mx-auto">
        {tab === "profile" && (
          <>
            <Profile />
            {/* <BankAccount/> */}
            <ChangePassword />
          </>
        )}
        {tab === "transfer" && <MoneyTransfer content={content} />}
        {tab === "logs" && <Log content={content} />}
      </div>
    </div>
    </AuthContextProvider>
  );
};

export default InformationPage;
