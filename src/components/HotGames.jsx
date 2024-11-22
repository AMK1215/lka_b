import React from "react";
import { IoGameController } from "react-icons/io5";
import launchGame from "../hooks/LaunchGame";

export default function HotGames({item}) {
  return (
    <>
      <div className="cursor-pointer col-2 px-1 mb-3 ">
        <div className="gameCardLg">
          <img src={item.image_url} className="img-fluid rounded-top-3" />
          <div className="rounded-bottom-3 fw-semibold px-2 activeGameList text-black">
            <h5 className="pt-1 fw-semibold mb-0">{"Hot"} | Game</h5>
            <div className="d-flex align-items-center gap-2">
              <IoGameController size={35} />
              <p className="fw-semibold">68</p>
            </div>
          </div>
          <div className="gameCardLgBtn rounded-5 d-flex align-items-center justify-content-center shadow-lg"
          onClick={launchGame(item.game_type_id, item.product_code, item.code)}
          >
            <p className="fw-semibold">ဂိမ်းကစားရန်</p>
          </div>
        </div>
      </div>
    </>
  );
}
