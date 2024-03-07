import Phaser from "phaser";

class OsloConquest extends Phaser.Scene {
  preload() {
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    // this.add.image(400, 300, "sky");

    // const particles = this.add.particles(0, 0, "red", {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: "ADD",
    // });

    // const logo = this.physics.add.image(400, 100, "logo");

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    // particles.startFollow(logo);
    var scene = this;
    var graphics = this.add.graphics();

    // Definer punktene for polygonet

    // Definer punkter for polygoner i et JavaScript-objekt
    var polygonData = {
      l1: {
        name: "Stovner",
        points: [
          [726, 43],
          [742, 73],
          [757, 159],
          [757, 200],
          [728, 226],
          [705, 211],
          [661, 215],
          [656, 189],
          [676, 163],
          [646, 150],
          [640, 137],
          [648, 113],
        ],
        color: 0xff0000,
      },

      l2: {
        name: "Grorud",
        points: [
          [726, 43],
          [648, 113],
          [640, 137],
          [646, 150],
          [612, 180],
          [558, 210],
          [559, 200],
          [570, 182],
          [563, 160],
          [550, 169],
          [535, 162],
          [530, 136],
          [557, 136],
          [571, 121],
          [563, 90],
          [604, 60],
          [618, 86],
          [629, 112],
          [632, 81],
          [688, 46],
          [691, 13],
          [712, 11],
        ],
        color: 0x00ff00,
      },
      // Legg til flere polygoner her
    };

    // Tegn polygoner fra objektet
    Object.entries(polygonData).forEach(function ([name, data]) {
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
      var textObject = scene.add.text(points[0][0], points[0][1], sted, {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#ffffff",
      });
      textObject.setOrigin(0.5); // Sentrer tekst
    });

    // Gjør polygonet synlig
    graphics.setVisible(true);
  }
}

export default OsloConquest;
