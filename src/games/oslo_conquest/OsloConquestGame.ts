import Phaser from "phaser";
import { GameMap } from "./GameMap";
import oslo_conquest_map from "./oslo_conquest_map.json";

class OsloConquestGame extends Phaser.Scene {
  museTekst: Phaser.GameObjects.Text;
  gameMap: GameMap;

  preload() {
    let scene = this;
    this.gameMap = new GameMap(oslo_conquest_map);
  }

  create() {
    let scene = this;

    this.museTekst = scene.add.text(10, 10, "", { fill: "#00ff00" });

    let graphics = this.add.graphics();
    graphics.lineStyle(1, 0x000000, 1);

    // Tegn polygoner fra objektet
    console.log(this.gameMap);
    this.gameMap.drawMap(graphics);
    for (const bydel of this.gameMap.map.tiles) {
      console.log(bydel);
      for (const delbydel of bydel.subtiles) {
        console.log(delbydel);
        console.log(delbydel.name.text);

        //const piece = scene.add.polygon(0, 0, delbydel.points, bydel.color);

        // Plasser tekst i polygon
        let delbydelNavn = scene.add.text(
          delbydel.name.position[0],
          delbydel.name.position[1],
          delbydel.name.text,
          {
            fontFamily: "Arial",
            fontSize: 10,
            color: "#ffffff",
          }
        );
        delbydelNavn.setOrigin(0.5); // Sentrer tekst
      }

      // Plasser tekst i polygon
      let textObject = scene.add.text(
        bydel.name.position[0],
        bydel.name.position[1],
        bydel.name.text,
        {
          fontFamily: "Arial",
          fontSize: 16,
          color: "#ffffff",
        }
      );
      textObject.setOrigin(0.5); // Sentrer tekst
    }

    // Gjør polygonet synlig
    //graphics.setVisible(true);

    const camera = scene.cameras.main;
    let cameraDragStartX;
    let cameraDragStartY;

    scene.input.on("pointerdown", () => {
      cameraDragStartX = camera.scrollX;
      cameraDragStartY = camera.scrollY;
    });

    scene.input.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        camera.scrollX =
          cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
        camera.scrollY =
          cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
      }
    });

    scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      // Get the current world point under pointer.
      const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      const newZoom = camera.zoom - camera.zoom * 0.001 * deltaY;
      camera.zoom = Phaser.Math.Clamp(newZoom, 0.25, 2);

      // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
      camera.preRender();
      const newWorldPoint = camera.getWorldPoint(pointer.x, pointer.y);
      // Scroll the camera to keep the pointer under the same world point.
      camera.scrollX -= newWorldPoint.x - worldPoint.x;
      camera.scrollY -= newWorldPoint.y - worldPoint.y;
    });
  }

  update() {
    const pointer = this.input.activePointer;

    this.museTekst.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`,
      `isDown: ${pointer.isDown}`,
      `rightButtonDown: ${pointer.rightButtonDown()}`,
    ]);
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game_container",
    mode: Phaser.Scale.NONE,
    width: 767,
    height: 811,
  },
  scene: OsloConquestGame,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  plugins: {
    scene: [
      {
        key: "GameObjectFactory",
        plugin: GameMap,
        mapping: "add",
      },
    ],
  },
};

const start_oslo_conquest = () => {
  console.log("Lager nytt spill");
  return new Phaser.Game(config);
};

export default start_oslo_conquest;
