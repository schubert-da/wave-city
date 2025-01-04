export const TILE_SET = [
    // BLANK TILE
    {
        name: 'BLANK',
        image: {
            paths: ['tile-blank.png'],
            rotation: [0]
        },
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
        name: 'CROSS',
        image: {
            paths: ['tile-cross.png', 'tile-cross-2.png'],
            rotation: [0, 90, 180, 270]
        },
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
        name: 'HORIZONTAL LINE',
        image: {
            paths: ['tile-horizontal.png', 'tile-horizontal-2.png'],
            rotation: [0, 180]
        },
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
        name: 'VERTICAL LINE',
        image: {
            paths: ['tile-horizontal.png', 'tile-horizontal-2.png'],
            rotation: [90, 270]
        },
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
        name: 'LEFT T',
        image: {
            paths: ['tile-t.png'],
            rotation: [0]
        },
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
        name: 'RIGHT T',
        image: {
            paths: ['tile-t.png'],
            rotation: [180]
        },
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
    // TOP T TILE
    {
        name: 'TOP T',
        image: {
            paths: ['tile-t.png'],
            rotation: [90]
        },
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
            connection: true
        }
    },
    // BoTTOM T TILE
    {
        name: 'BOTTOM T',
        image: {
            paths: ['tile-t.png'],
            rotation: [270]
        },
        top: {
            connection: false
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
    // TOP RIGHT L TILE
    {
        name: 'TOP RIGHT L',
        image: {
            paths: ['tile-l.png', 'tile-l-2.png'],
            rotation: [180]
        },
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
        name: 'BOTTOM LEFT L',
        image: {
            paths: ['tile-l.png', 'tile-l-2.png'],
            rotation: [0]
        },
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
    // TOP LEFT L TILE
    {
        name: 'TOP LEFT L',
        image: {
            paths: ['tile-l.png', 'tile-l-2.png'],
            rotation: [90]
        },
        top: {
            connection: true
        },
        right: {
            connection: false
        },
        bottom: {
            connection: false
        },
        left: {
            connection: true
        }
    },
    // BOTTOM RIGHT L TILE
    {
        name: 'BOTTOM RIGHT L',
        image: {
            paths: ['tile-l.png', 'tile-l-2.png'],
            rotation: [270]
        },
        top: {
            connection: false
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
    }
]
