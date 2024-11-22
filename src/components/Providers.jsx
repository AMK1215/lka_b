import React from "react";
import { IoGameController } from "react-icons/io5";
import launchGame from "../hooks/LaunchGame";
import launchLobby from "../hooks/LaunchLobby";

export default function Providers({item, type}) {
    // console.log(item);
    
  return (
    <>
      {/*  */}
      <div className="cursor-pointer col-2 px-1 mb-3 ">
        <div className="gameCardLg">
          <img src={item.imgUrl} className="img-fluid rounded-top-3" />
          <div className="rounded-bottom-3 fw-semibold px-2 activeGameList text-black">
            <h5 className="pt-1 fw-semibold mb-0">{item.pivot.game_type_id == 1 ? "Slot" : item.pivot.game_type_id == 2 ? "Live Casino" : item.pivot.game_type_id == 3 ? "Sport Books" : "Fishing"} | Game</h5>
            <div className="d-flex align-items-center gap-2">
              <IoGameController size={35} />
              <p className="fw-semibold">68</p>
            </div>
          </div>
          <div
            className="gameCardLgBtn rounded-5 d-flex align-items-center justify-content-center shadow-lg"
            onClick={launchLobby(
              item.pivot.game_type_id == 4 ? 8 : item.pivot.game_type_id,
              item.code,
            )}
          >
            <p className="fw-semibold">ဂိမ်းကစားရန်</p>
          </div>
        </div>
      </div>
    </>
  );
}
