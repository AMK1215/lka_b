import React, { useContext, useEffect, useState } from "react";
import all from "../../assets/img/all.png";
import slot from "../../assets/img/slotL.png";
import casino from "../../assets/img/casinoL.png";
import sport from "../../assets/img/sportL.png";
import fish from "../../assets/img/fishL.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import HotGames from "../HotGames";
import Games from "../Games";
import Providers from "../Providers";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "react-bootstrap";

const GameTabsLg = () => {
  const { lan } = useContext(AuthContext);
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
  // console.log(sportGames);

  // const { data: game_lists } = useFetch(BASE_URL + "/game/gamelist/1/1");
  const { data: hotGames } = useFetch(BASE_URL + "/hotgamelist");

  const allProviders = [];
  slot_providers?.map((item) => allProviders.push(item));
  casino_providers?.map((item) => allProviders.push(item));
  sport_providers?.map((item) => allProviders.push(item));
  fish_providers?.map((item) => allProviders.push(item));

  const gameTabs = [
    { img: all, name: "All Games", name_mm: "ဂိမ်းအားလုံး", value: "all" },
    { img: all, name: "Hot Games", name_mm: "ဟော့ဂိမ်းများ", value: "hot" },
    { img: slot, name: "Slot Games", name_mm: "စလော့ဂိမ်း", value: "slot" },
    {
      img: casino,
      name: "Casino Gams",
      name_mm: "ကာစီနို",
      value: "live casino",
    },
    {
      img: fish,
      name: "Fishing Games",
      name_mm: "ငါးပစ်ဂိမ်း",
      value: "fishing",
    },
    {
      img: sport,
      name: "Sport Games",
      name_mm: "အားကစားဂိမ်း",
      value: "sport book",
    },
  ];

  const navigate = useNavigate();

  const [games, setGames] = useState([]);
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
  // console.log(gameLists);

  return (
    <div className="px-4 d-none d-lg-block ">
      <div className="row mt-4">
        {gameTabs.map((item, index) => {
          return (
            <div
              onClick={() => {
                item.value === "all" && navigate(`?type=${item.value}`);
                item.value === "hot" && navigate(`?type=${item.value}`);
                item.value === "slot" &&
                  navigate(
                    `?type=${item.value}&&list=${slot_providers[0].short_name}`
                  );
                item.value === "live casino" &&
                  navigate(
                    `?type=${item.value}&&list=${casino_providers[0].short_name}`
                  );
                item.value === "fishing" &&
                  navigate(
                    `?type=${item.value}&&list=${fish_providers[0].short_name}`
                  );
                item.value === "sport book" && navigate(`?type=${item.value}`);
              }}
              key={index}
              className="cursor-pointer col-2 px-1"
            >
              <img src={item.img} className="gameTabImgLg rounded-3 " />
              <div className="p-2 gameTabTitleLg rounded-bottom-3">
                {lan === "en" ? item.name : item.name_mm}
              </div>
            </div>
          );
        })}
      </div>

      {gameType == "slot" && slot_providers && (
        <Swiper className="mySwiper mt-3" slidesPerView={10}>
          {slot_providers.map((list, index) => {
            return (
              <SwiperSlide
                onClick={() => {
                  navigate(`?type=${gameType}&&list=${list.short_name}`);
                }}
                key={index}
              >
                <div
                  className={`${
                    searchParams.get("list") === list.short_name
                      ? "activeGameList"
                      : ""
                  }
               ${index === 0 && "gameListStart"}
                ${index === slot_providers.length - 1 && "gameListEnd"}
                  cursor-pointer text-center fw-semibold py-1 px-3 px-sm-4  gameProvider text-nowrap`}
                >
                  {list.short_name}{" "}
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {gameType == "live casino" && casino_providers && (
        <Swiper className="mySwiper mt-3" slidesPerView={10}>
          {casino_providers.map((list, index) => {
            return (
              <SwiperSlide
                onClick={() => {
                  navigate(`?type=${gameType}&&list=${list.short_name}`);
                }}
                key={index}
              >
                <div
                  className={`${
                    searchParams.get("list") === list.short_name
                      ? "activeGameList"
                      : ""
                  }
               ${index === 0 && "gameListStart"}
                ${index === casino_providers.length - 1 && "gameListEnd"}
                  cursor-pointer text-center fw-semibold py-1 px-3 px-sm-4  gameProvider text-nowrap`}
                >
                  {list.short_name}{" "}
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {gameType == "fishing" && fish_providers && (
        <Swiper className="mySwiper mt-3" slidesPerView={10}>
          {fish_providers.map((list, index) => {
            return (
              <SwiperSlide
                onClick={() => {
                  navigate(`?type=${gameType}&&list=${list.short_name}`);
                }}
                key={index}
              >
                <div
                  className={`${
                    searchParams.get("list") === list.short_name
                      ? "activeGameList"
                      : ""
                  }
               ${index === 0 && "gameListStart"}
                ${index === fish_providers.length - 1 && "gameListEnd"}
                  cursor-pointer text-center fw-semibold py-1 px-3 px-sm-4  gameProvider text-nowrap`}
                >
                  {list.short_name}{" "}
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="row mt-4">
        {loading && <Spinner />}
        {gameType === null || gameType === "all"
          ? allProviders?.map((item, index) => (
              <Providers item={item} key={index} type={gameType} />
            ))
          : gameType === "hot"
          ? hotGames?.map((item, index) => <HotGames item={item} key={index} />)
          : gameType !== "all" &&
            gameType !== "hot" &&
            gameType !== "sport book"
          ? gameLists &&
            gameLists?.map((item, index) => (
              <Games
                item={item}
                key={index}
                type={gameType}
                loading={gameLoading}
              />
            ))
          : gameType === "sport book"
          ? sport_providers?.map((item, index) => (
              <Providers item={item} key={index} type={gameType} />
            ))
          : null}
      </div>
    </div>
  );
};

export default GameTabsLg;
