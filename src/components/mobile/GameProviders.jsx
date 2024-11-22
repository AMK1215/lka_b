import React from "react";
import "../../assets/css/games.css";
import { useNavigate } from "react-router-dom";

const GameLists = ({ slot_providers, casino_providers, fish_providers }) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const gameType = searchParams.get("type" || "all");
  const gameList = searchParams.get("list");

  return (
    <>
      {gameType !== "all" &&
        gameType !== "hot" &&
        gameType !== "sport book" && (
          <div className="gameProviders py-3 px-2 px-sm-4 gap-2 gap-sm-3 gap-lg-4 gap-lg-0 d-flex algin-items-center ">
            {gameType === "slot" &&
              slot_providers?.map((list, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/games?type=${searchParams.get("type")}&&list=${
                          list.short_name
                        }`
                      );
                    }}
                    key={index}
                    className={`${
                      gameList === list.short_name ? "activeGameList" : ""
                    } cursor-pointer py-1 px-3 px-sm-4 rounded-2 gameProvider`}
                  >
                    {list.short_name}
                  </div>
                );
              })}
            {gameType === "live casino" &&
              casino_providers?.map((list, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/games?type=${searchParams.get("type")}&&list=${
                          list.short_name
                        }`
                      );
                    }}
                    key={index}
                    className={`${
                      gameList === list.short_name ? "activeGameList" : ""
                    } cursor-pointer py-1 px-3 px-sm-4 rounded-2 gameProvider`}
                  >
                    {list.short_name}
                  </div>
                );
              })}
            {gameType === "fishing" &&
              fish_providers?.map((list, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/games?type=${searchParams.get("type")}&&list=${
                          list.short_name
                        }`
                      );
                    }}
                    key={index}
                    className={`${
                      gameList === list.short_name ? "activeGameList" : ""
                    } cursor-pointer py-1 px-3 px-sm-4 rounded-2 gameProvider`}
                  >
                    {list.short_name}
                  </div>
                );
              })}
          </div>
        )}
    </>
  );
};

export default GameLists;
