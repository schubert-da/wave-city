export const TILE_SET = [
    // BLANK TILE
    {
        name: 'blank',
        top: {
            connection: false
        },
        right: {
            connection: false
        },
        bottom: {
            connection: false
        },
        left: {
            connection: false
        }
    },
    // CROSS TILE
    {
        name: 'cross',
        top: {
            connection: true
        },
        right: {
            connection: true
        },
        bottom: {
            connection: true
        },
        left: {
            connection: true
        }
    },
    // HORIZONTAL LINE TILE
    {
        name: 'horizontal-line',
        top: {
            connection: false
        },
        right: {
            connection: true
        },
        bottom: {
            connection: false
        },
        left: {
            connection: true
        }
    },
    // VERTICAL LINE TILE
    {
        name: 'vertical-line',
        top: {
            connection: true
        },
        right: {
            connection: false
        },
        bottom: {
            connection: true
        },
        left: {
            connection: false
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