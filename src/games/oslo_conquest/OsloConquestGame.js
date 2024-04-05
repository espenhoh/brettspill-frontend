import Phaser from "phaser";
import { GameMap } from "./GameMap";
import oslo_conquest_map from "./oslo_conquest_map.json";

class OsloConquestGame extends Phaser.Scene {
  museTekst;
  map;

  preload() {
    map = new GameMap(oslo_conquest_map);
  }

  create() {
    let scene = this;

    this.museTekst = scene.add.text(10, 10, "", { fill: "#00ff00" });

    let graphics = this.add.graphics();
    graphics.lineStyle(1, 0x000000, 1);
    // Tegn polygoner fra objektet
    for (const bydel of gameMap.bydeler) {
      for (const delbydel of bydel.delbydeler) {
        console.log(delbydel.name.text);
        const x = delbydel.points[0][0];
        const y = delbydel.points[0][1];
        console.log(x + "" + y);
        //const piece = scene.add.polygon(x, y, delbydel.points, bydel.color);
        // Sett linjefarge og -tykkelse
        graphics.lineStyle(2, 0x000000); // Tykkelse 2, farge grønn
        graphics.fillStyle(bydel.color, 1); // Rød farge

        // Tegn polygonlinje
        graphics.beginPath();
        graphics.moveTo(delbydel.points[0][0], delbydel.points[0][1]);
        for (var i = 1; i < delbydel.points.length; i++) {
          graphics.lineTo(delbydel.points[i][0], delbydel.points[i][1]);
        }
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();

        /*graphics.fillStyle(bydel.color, 1);
        graphics.fillPoints(
          delbydel.points.map(function (point) {
            return new Phaser.Geom.Point(point[0], point[1]);
          }),
          true
        );*/

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
  //transparent: true,
};

const start_oslo_conquest = () => {
  console.log("Lager nytt spill");
  return new Phaser.Game(config);
};

export default start_oslo_conquest;
