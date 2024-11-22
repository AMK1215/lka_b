import React, { useContext, useEffect } from "react";
import BASE_URL from "./baseURL";
import { useNavigate } from "react-router-dom";

const launchLobby = (type, provider) => async (e) => {
  e.preventDefault();
  const auth = localStorage.getItem("token");
  if(!auth) {
    window.location.href = "/login";
  }
  const inputData = {
    productId: provider,
    gameType: type,
  };

  try {
    const response = await fetch(`${BASE_URL}/direct/Seamless/LaunchGame`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error("Launch Game failed");
    }

    const data = await response.json();
    window.open(data.Url, "_blank");
    console.log("Launch Game success");
  } catch (error) {
    console.error("Launch Game error:", error);
  }
};

export default launchLobby;
