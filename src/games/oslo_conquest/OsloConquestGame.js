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
    var scene = this;
    var graphics = this.add.graphics();

    // Definer punktene for polygonet

    // Definer punkter for polygoner i et JavaScript-objekt

    // Tegn polygoner fra objektet
    Object.entries(gameMap).forEach(function ([name, data]) {
      var points = data.points;
      var color = data.color;
      var sted = data.name;

      graphics.fillStyle(color, 1);
      graphics.fillPoints(
        points.map(function (point) {
          return new Phaser.Geom.Point(point[0], point[1]);
        }),
        true
      );

      // Plasser tekst i polygon
      var textObject = scene.add.text(
        sted.position[0],
        sted.position[1],
        sted.text,
        {
          fontFamily: "Arial",
          fontSize: 16,
          color: "#ffffff",
        }
      );
      textObject.setOrigin(0.5); // Sentrer tekst
    });

    // Gjør polygonet synlig
    graphics.setVisible(true);
  }
}

export default OsloConquest;
