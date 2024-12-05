import { TILE_SET } from "./cityTiles";

export function collapseTiles(tiles, NUM_ROWS, NUM_COLS) {

    let allCollapsed = false;
    let iterations = 0;

    tiles.forEach((tile, index) => {
        tiles[index].isSameElevation = getElevationValue()
    });

    console.log('original tiles: ', tiles)

    while (allCollapsed === false) {
        console.log('starting iteration:', iterations);

        // 1. Find the tile with the least entropy
        let minEntropy = 1000;
        let minEntropyTileIndex = -1;

        tiles.forEach((tile, index) => {
            if (tile.entropy < minEntropy && tile.collapsed === false) {
                minEntropy = tile.entropy;
            }
        });

        let tilesWithMinEntropy = tiles.filter(tile => tile.entropy === minEntropy && tile.collapsed === false);
        let chosenTile = tilesWithMinEntropy[Math.floor(Math.random() * tilesWithMinEntropy.length)];
        minEntropyTileIndex = tiles.indexOf(chosenTile);

        if (minEntropyTileIndex != -1) {

            // 2. Collapse the tile
            let tileOptions = getTileOptions(tiles, minEntropyTileIndex, NUM_ROWS, NUM_COLS);

            if (tileOptions.length !== 0) {
                let chosenTileIndex = Math.floor(Math.random() * tileOptions.length)
                let chosenTileConfig = tileOptions[chosenTileIndex];

                // console.log('tileOptions', tileOptions);
                // console.log('minEntropyTileIndex', minEntropyTileIndex);
                // console.log('min Tile', tiles[minEntropyTileIndex]);
                // console.log('chosenTileConfig', chosenTileConfig);

                let tempTiles = [...tiles];

                console.log(`assigning tile ${chosenTileConfig.name} to index: ${minEntropyTileIndex}`);
                tempTiles[minEntropyTileIndex] = {
                    order: iterations,
                    collapsed: true,
                    elevation: chosenTileConfig.elevation,
                    connections: {
                        top: chosenTileConfig.connections.top,
                        right: chosenTileConfig.connections.right,
                        bottom: chosenTileConfig.connections.bottom,
                        left: chosenTileConfig.connections.left
                    },
                    name: chosenTileConfig.name,
                    entropy: 0,
                }

                tiles = tempTiles;
            } else {
                console.log('NO OPTIONS FOR TILE', minEntropyTileIndex);

                let topTile = minEntropyTileIndex - NUM_COLS < 0 ? null : tiles[minEntropyTileIndex - NUM_COLS];
                let rightTile = (minEntropyTileIndex + 1) % NUM_COLS === 0 ? null : tiles[minEntropyTileIndex + 1];
                let bottomTile = minEntropyTileIndex + NUM_COLS > tiles.length ? null : tiles[minEntropyTileIndex + NUM_COLS];
                let leftTile = (minEntropyTileIndex - 1) % NUM_COLS === NUM_COLS - 1 ? null : tiles[minEntropyTileIndex - 1];
                console.log(topTile, rightTile, bottomTile, leftTile);
            }

        }

        // 3. Update the entropy of the surrounding tiles
        tiles = updateSurroundingEntropy(tiles, minEntropyTileIndex, NUM_ROWS, NUM_COLS);

        if (tiles.filter(tile => tile.entropy === 0) === tiles.length || iterations > NUM_COLS * NUM_ROWS) {
            allCollapsed = true;
            console.log('ALL COLLAPSED', allCollapsed);
        }

        console.log('tiles', tiles.slice());
        iterations++;
    }

    return tiles;
}

function updateSurroundingEntropy(tiles, tileIndex, NUM_ROWS, NUM_COLS) {
    let chosenTile = tiles[tileIndex];

    let topTile = tileIndex - NUM_COLS < 0 ? null : tiles[tileIndex - NUM_COLS];
    let rightTile = (tileIndex + 1) % NUM_COLS === 0 ? null : tiles[tileIndex + 1];
    let bottomTile = tileIndex + NUM_COLS > tiles.length ? null : tiles[tileIndex + NUM_COLS];
    let leftTile = (tileIndex - 1) % NUM_COLS === NUM_COLS - 1 ? null : tiles[tileIndex - 1];

    if (topTile && !topTile.collapsed) {
        let topTileOptions = getTileOptions(tiles, tileIndex - NUM_COLS, NUM_ROWS, NUM_COLS);
        topTile.entropy = computeEntropy(topTileOptions);
        console.log('topTileOptions', topTileOptions);

        console.log(`Top tile(${tileIndex - NUM_COLS}) now has ${topTileOptions.length} options.`);
        console.log(`New entropy: ${topTile.entropy}`);
    }

    if (rightTile && !rightTile.collapsed) {
        let rightTileOptions = getTileOptions(tiles, tileIndex + 1, NUM_ROWS, NUM_COLS);
        rightTile.entropy = computeEntropy(rightTileOptions);
        console.log('rightTileOptions', rightTileOptions);

        console.log(`Right tile(${tileIndex + 1}) now has ${rightTileOptions.length} options.`);
        console.log(`New entropy: ${rightTile.entropy}`);
    }

    if (bottomTile && !bottomTile.collapsed) {
        let bottomTileOptions = getTileOptions(tiles, tileIndex + NUM_COLS, NUM_ROWS, NUM_COLS);
        bottomTile.entropy = computeEntropy(bottomTileOptions);
        console.log('bottomTileOptions', bottomTileOptions);

        console.log(`Bottom tile(${tileIndex + NUM_COLS}) now has ${bottomTileOptions.length} options.`);
        console.log(`New entropy: ${bottomTile.entropy}`);
    }

    if (leftTile && !leftTile.collapsed) {
        let leftTileOptions = getTileOptions(tiles, tileIndex - 1, NUM_ROWS, NUM_COLS);
        leftTile.entropy = computeEntropy(leftTileOptions);
        console.log('leftTileOptions', leftTileOptions);

        console.log(`Left tile(${tileIndex - 1}) now has ${leftTileOptions.length} options.`);
        console.log(`New entropy: ${leftTile.entropy}`);
    }

    console.log('=====================================');

    return tiles;
}

function getTileOptions(tiles, tileIndex, NUM_ROWS, NUM_COLS) {
    let chosenTile = tiles[tileIndex];

    let topTile = tileIndex - NUM_COLS < 0 ? null : tiles[tileIndex - NUM_COLS];
    let rightTile = (tileIndex + 1) % NUM_COLS === 0 ? null : tiles[tileIndex + 1];
    let bottomTile = tileIndex + NUM_COLS > tiles.length ? null : tiles[tileIndex + NUM_COLS];
    let leftTile = (tileIndex - 1) % NUM_COLS === NUM_COLS - 1 ? null : tiles[tileIndex - 1];

    let filteredOptions = TILE_SET.filter(tile => {
        let topMatch = checkMatchConstraints(topTile, tile, 'bottom', 'top', chosenTile.isSameElevation);
        let rightMatch = checkMatchConstraints(rightTile, tile, 'left', 'right', chosenTile.isSameElevation);
        let bottomMatch = checkMatchConstraints(bottomTile, tile, 'top', 'bottom', chosenTile.isSameElevation);
        let leftMatch = checkMatchConstraints(leftTile, tile, 'right', 'left', chosenTile.isSameElevation);

        // let bottomMatch = bottomTile && bottomTile.collapsed ? bottomTile.connections.top === tile.connections.bottom : true;
        // let leftMatch = leftTile && leftTile.collapsed ? leftTile.connections.right === tile.connections.left : true;

        return topMatch && rightMatch && bottomMatch && leftMatch;
    })

    return filteredOptions;
}

function getElevationValue() {
    const ELEVATION_PARAM = 90;

    return Math.random() * 100 < ELEVATION_PARAM;
}

function checkMatchConstraints(newTile, originalTile, newDirection, originalDirection, isSameElevation) {
    if (newTile && newTile.collapsed) {
        let connectionCheck = newTile.connections[newDirection] === originalTile.connections[originalDirection];

        // let elevationCheck = isSameElevation ? newTile.elevation === originalTile.elevation : newTile.elevation != originalTile.elevation;
        let elevationCheck = true;
        return connectionCheck && elevationCheck;
    }
    else {
        return true
    }
}

export function computeEntropy(entropyTiles) {
    let SUM_WEIGHTS = 0;

    let tilesWithWeights = entropyTiles.filter(tile => Object.keys(tile).includes('weight'));
    if (tilesWithWeights.length != entropyTiles.length || entropyTiles.length === 0) {
        SUM_WEIGHTS = entropyTiles.length;

        let result = -1 * entropyTiles.reduce((acc, tile) => {
            return acc + (1 / SUM_WEIGHTS) * Math.log2(1 / SUM_WEIGHTS);
        }, 0);

        return result;
    }
    else {
        console.log("THIS SHOULDN'T HAPPEN")
        entropyTiles.forEach(tile => {
            SUM_WEIGHTS += tile.weight;
        })

        // REST OF WEIGHTED ENTROPY CALCULATION

        return -1;
    }


}