import { TILE_SET } from "./PlayGroundTiles";

function collapseTiles(tiles, NUM_ROWS, NUM_COLS) {

    let allCollapsed = false;

    while (allCollapsed === false) {
        // 1. Find the tile with the least entropy
        let minEntropy = 1000;
        tiles.forEach(tile => {
            if (tile.entropy < minEntropy && tile.collapsed === false) {
                minEntropy = tile.entropy;
            }
        });

        // 2. Collapse the tile
        // 3. Update the entropy of the surrounding tiles
    }
}

function getTileEntropy(tiles, tileIndex, NUM_ROWS, NUM_COLS) {
    let chosenTile = tiles[tileIndex];

    let topTile = tileIndex - NUM_COLS < 0 ? null : tiles[tileIndex - NUM_COLS];
    let rightTile = tileIndex + 1 % NUM_COLS === 0 ? null : tiles[tileIndex + 1];
    let bottomTile = tileIndex + NUM_COLS > tiles.length ? null : tiles[tileIndex + NUM_COLS];
    let leftTile = tileIndex - 1 % NUM_COLS === NUM_COLS - 1 ? null : tiles[tileIndex - 1];

    let filteredOptions = TILE_SET.filter(tile => {
        let topMatch = topTile && topTile.collapsed ? topTile.bottom.connection === tile.top.connection : true;
        let rightMatch = rightTile && rightTile.collapsed ? rightTile.left.connection === tile.right.connection : true;
        let bottomMatch = bottomTile && bottomTile.collapsed ? bottomTile.top.connection === tile.bottom.connection : true;
        let leftMatch = leftTile && leftTile.collapsed ? leftTile.right.connection === tile.left.connection : true;

        return topMatch && rightMatch && bottomMatch && leftMatch;
    })
}

export function computeEntropy(entropyTiles) {
    let SUM_WEIGHTS = 0;

    let tilesWithWeights = entropyTiles.filter(tile => Object.keys(tile).includes('weight'));
    if (tilesWithWeights.length != entropyTiles.length) {
        SUM_WEIGHTS = entropyTiles.length;

        let result = -1 * entropyTiles.reduce((acc, tile) => {
            return acc + (1 / SUM_WEIGHTS) * Math.log2(1 / SUM_WEIGHTS);
        }, 0);

        return result;
    }
    else {
        entropyTiles.forEach(tile => {
            SUM_WEIGHTS += tile.weight;
        })

        // REST OF WEIGHTED ENTROPY CALCULATION

        return;
    }


}