import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GameHeading from "../components/mobile/GameHeading";
import GameProviders from "../components/mobile/GameProviders";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Spinner } from "react-bootstrap";
import GameLists from "../components/mobile/GameLists";
import AllProviders from "../components/mobile/AllProviders";

const GamesPage = () => {
  const { data: slotGames, loading } = useFetch(
    BASE_URL + "/gameTypeProducts/1"
  );
  const { data: casinoGames } = useFetch(BASE_URL + "/gameTypeProducts/2");
  const { data: sportGames } = useFetch(BASE_URL + "/gameTypeProducts/3");
  const { data: fishGames } = useFetch(BASE_URL + "/gameTypeProducts/4");

  const slot_providers = slotGames?.game_type?.products;
  const casino_providers = casinoGames?.game_type?.products;
  const sport_providers = sportGames?.game_lobby?.products;
  const fish_providers = fishGames?.game_type?.products;

  const { data: hotGames } = useFetch(BASE_URL + "/hotgamelist");

  const allProviders = [];
  slot_providers?.map((item) => allProviders.push(item));
  casino_providers?.map((item) => allProviders.push(item));
  sport_providers?.map((item) => allProviders.push(item));
  fish_providers?.map((item) => allProviders.push(item));

  const searchParams = new URLSearchParams(window.location.search);
  const gameType = searchParams.get("type" || "all");
  const gameList = searchParams.get("list");

  let type =
    gameType == "fishing"
      ? 8
      : gameType == "live casino"
      ? 2
      : gameType == "sport book"
      ? 3
      : gameType == "slot"
      ? 1
      : "";
  let provider = allProviders.filter((item) => item.short_name == gameList)[0]
    ?.id;

  const { data: gameLists, loading: gameLoading } = useFetch(
    BASE_URL + "/game/gamelist/" + provider + "/" + type
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      <GameHeading />
      <GameProviders gameType={gameType} 
      gameList={gameList} 
      slot_providers = {slot_providers} 
      casino_providers = {casino_providers}
      fish_providers = {fish_providers}
      />
      <div className="py-4 px-2 px-sm-4">
        <div className="d-flex justify-content-between">
          <h4 className="fw-bold text-white ms-2">
            {searchParams.get("type").toUpperCase()}
          </h4>
          <h4>
          {searchParams.get("list")}
          </h4>
        </div>

        {gameType == "all" && (
          <AllProviders allProviders={allProviders} />
        )}
        {gameType == "sport book" && (
          <AllProviders allProviders={sport_providers} />
        )}
        {gameType == "hot" && (
          <div className="ms-2 row mt-3 mb-5 mx-auto">
            {hotGames?.map((item, index) => {
              return (
                <GameLists key={index} item={item} />
              );
            })}
          </div>
        )}
        <div className="ms-2 row mt-3 mb-5 mx-auto">
          {gameLoading ? <Spinner /> : gameLists && gameLists?.map((item, index) => {
            return (
              <GameLists key={index} item={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
