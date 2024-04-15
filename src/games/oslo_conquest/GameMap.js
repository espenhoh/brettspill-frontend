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
      this.#drawPolygon(graphics, boardPiece);
    }
    console.log(this.boardPieces);
  }

  #drawPolygon(graphics, boardPiece) {
    // Sett linjefarge og -tykkelse
    graphics.lineStyle(2, 0x000000); // Tykkelse 2, farge grønn
    graphics.fillStyle(boardPiece.color, 1); // Rød farge
    // Tegn polygonlinje
    graphics.beginPath();
    graphics.moveTo(
      boardPiece.polygon.points[0].x,
      boardPiece.polygon.points[0].y
    );
    for (var i = 1; i < boardPiece.polygon.points.length; i++) {
      graphics.lineTo(
        boardPiece.polygon.points[i].x,
        boardPiece.polygon.points[i].y
      );
    }
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();
    console.log(boardPiece);

    //graphics.fillStyle(bydel.color, 1);
  }
}

class BoardPiece {
  constructor(points, color) {
    this.polygon = new Phaser.Geom.Polygon(points);
    this.color = color;
  }
}
