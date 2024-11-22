import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./mobile/Navbar";
import BottomMenu from "./mobile/BottomMenu";
import SidebarLg from "./desktop/SidebarLg";
import { AuthContextProvider } from "../contexts/AuthContext";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <AuthContextProvider>
        <Navbar />
        {/* Mobile */}
        <div className="mobileScreenContainer">
          <Outlet />
        </div>
        <div className="lgScreenContainer">
          <div
            className="row "
            style={{
              minHeight: "100vh",
              overflowY: "scroll",
              height: "max-content",
            }}
          >
            <div className="col-3 sidebarLg app-gradient">
              <SidebarLg />
            </div>
            <div className="col-9 px-0">
              <Outlet />
            </div>
          </div>
        </div>
        <BottomMenu />
      </AuthContextProvider>
  );
};

export default Layout;
