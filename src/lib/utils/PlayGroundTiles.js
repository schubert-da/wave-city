export const TILE_SET = [
    // BLANK TILE
    {
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
    },
    // LEFT T TILE
    {
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
            connection: true
        }
    },
    // RIGHT T TILE
    {
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
            connection: false
        }
    },
    // TOP RIGHT L TILE
    {
        top: {
            connection: true
        },
        right: {
            connection: true
        },
        bottom: {
            connection: false
        },
        left: {
            connection: false
        }
    },
    // BOTTOM LEFT L TILE
    {
        top: {
            connection: false
        },
        right: {
            connection: false
        },
        bottom: {
            connection: true
        },
        left: {
            connection: true
        }
    },
]

export const TILE_SET_MAP = {
    0: 'BLANK',
    1: 'CROSS',
    2: 'HORIZONTAL LINE',
    3: 'VERTICAL LINE',
    4: 'LEFT T',
    5: 'RIGHT T',
    6: 'TOP RIGHT L',
}
