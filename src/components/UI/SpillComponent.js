import React, { useEffect } from "react";

import styles from "./SpillComponent.module.css";
import start_oslo_conquest from "../../games/oslo_conquest/OsloConquestGame";

import bydeler from "./Bydeler.png";

import { useParams } from "react-router-dom";

const SpillComponent = ({ newGame }) => {
  const { navn } = useParams();

  const start_spill = (spill_navn) => {
    switch (spill_navn) {
      case "oslo_conquest":
        return start_oslo_conquest();
      default:
        throw Error("Ingen spill kalt " + spill_navn);
    }
  };

  useEffect(() => {
    const game = start_spill(navn);
    return () => game.destroy(true);
  }, []);

  return (
    <div className={styles.game_container_holder} id="game_container"></div>
  );
};

export default SpillComponent;
