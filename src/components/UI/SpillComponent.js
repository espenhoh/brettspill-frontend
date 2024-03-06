import React, { useEffect } from "react";

import styles from "./SpillComponent.module.css";

const SpillComponent = ({ config }) => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => game.destroy(true);
  }, []);

  return <div id="game_container"></div>;
};

export default SpillComponent;
