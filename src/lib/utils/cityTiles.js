export const TILE_SET = [
    // BLANK TILE
    // {
    //     name: 'blank',
    //     elevation: 2,
    //     connections: {
    //         top: false,
    //         right: false,
    //         bottom: false,
    //         left: false
    //     }
    // },
    // CROSS TILE
    {
        name: 'cross-tall',
        elevation: 2,
        connections: {
            top: true,
            right: true,
            bottom: true,
            left: true
        }
    },
    // HORIZONTAL LINE TILE
    // {
    //     name: 'horizontal-line',
    //     elevation: 2,
    //     connections: {
    //         top: false,
    //         right: true,
    //         bottom: false,
    //         left: true
    //     }
    // },
    // VERTICAL LINE TILE
    // {
    //     name: 'vertical-line',
    //     elevation: 2,
    //     connections: {
    //         top: true,
    //         right: false,
    //         bottom: true,
    //         left: false
    //     }
    // },

    // LEFT T TILE
    {
        name: 'bottom-left-t',
        elevation: 2,
        connections: {
            top: true,
            right: false,
            bottom: true,
            left: true
        }
    },
    // RIGHT T TILE
    {
        name: 'top-right-t',
        elevation: 2,
        connections: {
            top: true,
            right: true,
            bottom: true,
            left: false
        }
    },
    // TOP T TILE
    {
        name: 'top-left-t',
        elevation: 2,
        connections: {
            top: true,
            right: true,
            bottom: false,
            left: true
        }
    },
    // BOTTOM T TILE
    {
        name: 'bottom-right-t',
        elevation: 2,
        connections: {
            top: false,
            right: true,
            bottom: true,
            left: true
        }
    },
    // TOP L TILE
    {
        name: 'top-l',
        elevation: 2,
        connections: {
            top: true,
            right: true,
            bottom: false,
            left: false
        }
    },
    // BLANK TILE ELEVATION 1
    {
        name: 'blank-e1',
        elevation: 1,
        connections: {
            top: false,
            right: false,
            bottom: false,
            left: false
        }
    },
    /*
    // CROSS TILE ELEVATION 1
    {
        name: 'cross-e1',
        elevation: 1,
        connections: {
            top: true,
            right: true,
            bottom: true,
            left: true
        }
    },
    // HORIZONTAL LINE TILE ELEVATION 1
    {
        name: 'horizontal-line-e1',
        elevation: 1,
        connections: {
            top: false,
            right: true,
            bottom: false,
            left: true
        }
    },
    // VERTICAL LINE TILE ELEVATION 1
    {
        name: 'vertical-line-e1',
        elevation: 1,
        connections: {
            top: true,
            right: false,
            bottom: true,
            left: false
        }
    },
    // LEFT T TILE ELEVATION 1
    {
        name: 'left-t-e1',
        elevation: 1,
        connections: {
            top: true,
            right: false,
            bottom: true,
            left: true
        }
    },
    // RIGHT T TILE ELEVATION 1
    {
        name: 'right-t-e1',
        elevation: 1,
        connections: {
            top: true,
            right: true,
            bottom: true,
            left: false
        }
    },
    */
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