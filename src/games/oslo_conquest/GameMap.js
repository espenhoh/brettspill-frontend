import Phaser from "phaser";

export class GameMap {
  constructor(gameMap) {
    this.tiles = [];

    for (const tile of gameMap.tiles) {
      const gameMapTile = [];
      for (const subtile of tile.subtiles) {
        gameMapTile.push(this.#createSubTile(subtile));
      }
      this.tiles.push(gameMapTile);
    }
    console.log(this.tiles);
  }

  #createSubTile(subtile) {
    const createdSubTile = {};
    createdSubTile.name = subtile.name;
    createdSubTile.polygon = new Phaser.Geom.Polygon(subtile.points);
    return createdSubTile;
  }
}
