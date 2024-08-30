export const TILE_SET = [
    // BLANK TILE
    {
        name: 'blank',
        connections: {
            top: false,
            right: false,
            bottom: false,
            left: false
        }
    },
    // CROSS TILE
    {
        name: 'cross',
        connections: {
            top: true,
            right: true,
            bottom: true,
            left: true
        }
    },
    // HORIZONTAL LINE TILE
    {
        name: 'horizontal-line',
        connections: {
            top: false,
            right: true,
            bottom: false,
            left: true
        }
    },
    // VERTICAL LINE TILE
    {
        name: 'vertical-line',
        connections: {
            top: true,
            right: false,
            bottom: true,
            left: false
        }
    }
];

export function matchTile(tileConfig) {
    if (!tileConfig || !tileConfig.connections) {
        return null
    }

    let options = TILE_SET.filter(tile => {
        return tileConfig.connections.top === tile.top.connection &&
            tileConfig.connections.right === tile.right.connection &&
            tileConfig.connections.bottom === tile.bottom.connection &&
            tileConfig.connections.left === tile.left.connection
    })

    if (options.length === 0) {
        return null;
    }
    else {
        return options[0];
    }
}