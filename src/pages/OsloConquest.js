import axios from "axios";
import React from "react";

import Example from "../games/oslo_conquest/OsloConquestGame";
import SpillComponent from "../components/UI/SpillComponent";

const OsloConquest = (props) => {
  const config = {
    type: Phaser.AUTO,
    scale: {
      parent: "game_container",
      mode: Phaser.Scale.NONE,
      width: 767,
      height: 811,
    },
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    //transparent: true,
  };

  return (
    <div>
      <SpillComponent config={config}></SpillComponent>
    </div>
  );
};

export default OsloConquest;
