import Phaser from "phaser";

export class GameMap {
  constructor(gameMap) {
    this.map = gameMap;
    this.polygons = [];

    for (const tile of this.map.tiles) {
      for (const subtile of tile.subtiles) {
        subtile.polygon = new Phaser.Geom.Polygon(subtile.points);
        this.polygons.push(subtile.polygon);
      }
    }
  }

  drawMap(graphics) {
    for (const polygon of this.polygons) {
      this.#drawPolygon(graphics, polygon);
    }
    console.log(this.polygons);
  }

  #drawPolygon(graphics, polygon) {
    // Sett linjefarge og -tykkelse
    graphics.lineStyle(2, 0x000000); // Tykkelse 2, farge grønn
    graphics.fillStyle(0xeb4034, 1); // Rød farge
    // Tegn polygonlinje
    graphics.beginPath();
    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);
    for (var i = 1; i < polygon.points.length; i++) {
      graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();
    console.log(polygon);

    //graphics.fillStyle(bydel.color, 1);
  }
}
