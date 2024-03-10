import React, { useEffect } from "react";

import styles from "./SpillComponent.module.css";

import bydeler from "./Bydeler.png";

const SpillComponent = ({ config }) => {
  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => game.destroy(true);
  }, []);

  return (
    <div className={styles.game_container_holder} id="game_container"></div>
  );
};

export default SpillComponent;
