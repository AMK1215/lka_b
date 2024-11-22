import React from "react";
import launchLobby from "../../hooks/LaunchLobby";

export default function AllProviders({ allProviders }) {
    
  return (
    <>
    <div className="ms-2 row mt-3 mb-5 mx-auto">
      {allProviders &&
        allProviders.map((item, index) => (
          <div
          key={index}
            className="p-0 cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 mb-sm-3"
            onClick={launchLobby(
                item.pivot.game_type_id == 4 ? 8 : item.pivot.game_type_id,
                item.code,
            )}
          >
            <img src={item.imgUrl} className="gameImg  rounded-3 " />
          </div>
        ))}
    </div>
    </>
  );
}
