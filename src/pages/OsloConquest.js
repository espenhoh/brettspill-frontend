import axios from "axios";
import React from "react";

import Example from "../games/oslo_conquest/OsloConquestGame";
import SpillComponent from "../components/UI/SpillComponent";

const OsloConquest = (props) => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game_container",
    scene: Example,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  return (
    <div>
      <SpillComponent config={config}></SpillComponent>
    </div>
  );
};

export default OsloConquest;
