import React from "react";
import launchGame from "../../hooks/LaunchGame";

export default function GameLists({item}) {
  return (
    <>
      <div
        className="p-0 cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 mb-sm-3"
        onClick={launchGame(item.game_type_id, item.product_code, item.code)}
      >
        <img src={item.image_url} className="gameImg  rounded-3 " />
      </div>
    </>
  );
}
