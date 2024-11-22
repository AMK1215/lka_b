import React from "react";
import home from "../../assets/img/home.png";
import slot from "../../assets/img/slot.svg";
import fish from "../../assets/img/fish.svg";
import card from "../../assets/img/card.svg";
import football from "../../assets/img/sport.svg";
import "../../assets/css/footer.css";
import { Link, useSearchParams } from "react-router-dom";

const BottomMenu = () => {
  const [searchParams] = useSearchParams();
  const items = [
    { img: home, link: "/", value: null },
    { img: slot, link: "/games?type=slot&&list=PP", value: "slot" },
    { img: fish, link: "/games?type=fishing&&list=PlayStar", value: "fishing" },
    { img: card, link: "/games?type=live casino&&list=PP", value: "live casino" },
    { img: football, link: "/games?type=sport book", value: "sport book" },
  ];
  return (
    <div className="bottomMenu">
      <div className="">
        <div className="row justify-content-between bottomMenu app-gradient">
          {items.map((item, index) => {
            return (
              <div key={index} className={`${
                searchParams.get("type") === item.value
                  ? "  activeFixedBottomIcon"
                  : " "
              }  col-2 py-3 text-center`}>
                <Link
                  
                  to={item.link}
                  
                >
                  <img src={item.img} className={`fixedBottomIcon ${index===0 ? 'normalColor' :''}`} />
                </Link>
              </div>

            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
