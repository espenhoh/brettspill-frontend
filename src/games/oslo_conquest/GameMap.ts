import Phaser from "phaser";

export class GameMap {
  constructor(gameMap) {
    this.map = gameMap;
    this.boardPieces = [];

    for (const tile of this.map.tiles) {
      for (const subtile of tile.subtiles) {
        let boardPiece = new BoardPiece(subtile.points, tile.color);
        this.boardPieces.push(boardPiece);
      }
    }
  }

  drawMap(graphics) {
    for (const boardPiece of this.boardPieces) {
      boardPiece.draw(graphics);
    }
  }
}

class BoardPiece {
  constructor(points, color) {
    this.polygon = new Phaser.Geom.Polygon(points);
    this.color = color;
  }

  draw(graphics) {
    // Sett linjefarge og -tykkelse
    graphics.lineStyle(2, 0x000000); // Tykkelse 2, farge grønn
    graphics.fillStyle(this.color, 1); // Rød farge
    // Tegn polygonlinje
    graphics.beginPath();
    graphics.moveTo(this.polygon.points[0].x, this.polygon.points[0].y);
    for (var i = 1; i < this.polygon.points.length; i++) {
      graphics.lineTo(this.polygon.points[i].x, this.polygon.points[i].y);
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    //graphics.fillStyle(bydel.color, 1);
  }
}
