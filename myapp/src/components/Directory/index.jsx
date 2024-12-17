import React from "react";
import ShopMan from "./../../assets/ReplayMan.jpeg";
import ShopWoman from "./../../assets/ReplayWoman.jpeg";
import './styles.css'
const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${ShopWoman})`,
          }}
        ><a href="/search/womens">
        Shop Womens
      </a>
      </div>
        
        <div
        className="item"
          style={{
            backgroundImage: `url(${ShopMan})`,
          }}
        ><a href="/search/mens">
          Shop Mans
        </a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
