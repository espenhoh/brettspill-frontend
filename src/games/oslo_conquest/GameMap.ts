import Phaser from "phaser";

type Point = [number, number];
type Points = Point[];

type Name = {
  text: string;
  position: Point;
};

type Subtile = {
  name: Name;
  points: Points;
};

type Tile = {
  name: Name;
  subtiles: Subtile[];
  points: Points;
  color: number;
};

type GameMapType = {
  tiles: Tile[];
};

export class GameMap {
  map: GameMapType;
  boardPieces: BoardPiece[];

  constructor(gameMap: GameMapType) {
    this.map = gameMap;
    this.boardPieces = [];

    for (const tile of this.map.tiles) {
      for (const subtile of tile.subtiles) {
        let boardPiece = new BoardPiece(subtile.points, tile.color);
        this.boardPieces.push(boardPiece);
      }
    }
  }

  drawMap(graphics: Phaser.GameObjects.Graphics) {
    for (const boardPiece of this.boardPieces) {
      boardPiece.draw(graphics);
    }
  }
}

class BoardPiece {
  polygon: Phaser.Geom.Polygon;
  color: number;

  constructor(points: Points, color: number) {
    this.polygon = new Phaser.Geom.Polygon(points as any);
    this.color = color;
  }

  draw(graphics: Phaser.GameObjects.Graphics) {
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
