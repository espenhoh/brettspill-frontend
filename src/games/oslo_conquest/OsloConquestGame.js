import Phaser from "phaser";
import gameMap from "./oslo_conquest_map.json";

class OsloConquest extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    let scene = this;
    let graphics = this.add.graphics();

    // Tegn polygoner fra objektet
    for (const bydel of gameMap.bydeler) {
      for (const delbydel of bydel.delbydeler) {
        graphics.fillStyle(bydel.color, 1);
        graphics.fillPoints(
          delbydel.points.map(function (point) {
            return new Phaser.Geom.Point(point[0], point[1]);
          }),
          true
        );
        console.log(delbydel.name.text);
        // Plasser tekst i polygon
        let delbydelNavn = scene.add.text(
          delbydel.name.position[0],
          delbydel.name.position[1],
          delbydel.name.text,
          {
            fontFamily: "Arial",
            fontSize: 10,
            color: "#000000",
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
    graphics.setVisible(true);
  }
}

export default OsloConquest;
