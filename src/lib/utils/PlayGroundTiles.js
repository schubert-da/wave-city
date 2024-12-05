export const TILE_SET = [
    // BLANK TILE
    {
        name: 'BLANK',
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
    // {
    //     name: 'LEFT T',
    //     top: {
    //         connection: true
    //     },
    //     right: {
    //         connection: false
    //     },
    //     bottom: {
    //         connection: true
    //     },
    //     left: {
    //         connection: true
    //     }
    // },
    // RIGHT T TILE
    // {
    //     name: 'RIGHT T',
    //     top: {
    //         connection: true
    //     },
    //     right: {
    //         connection: true
    //     },
    //     bottom: {
    //         connection: true
    //     },
    //     left: {
    //         connection: false
    //     }
    // },
    // TOP T TILE
    // {
    //     name: 'TOP T',
    //     top: {
    //         connection: true
    //     },
    //     right: {
    //         connection: true
    //     },
    //     bottom: {
    //         connection: false
    //     },
    //     left: {
    //         connection: true
    //     }
    // },
    // BoTTOM T TILE
    // {
    //     name: 'BOTTOM T',
    //     top: {
    //         connection: false
    //     },
    //     right: {
    //         connection: true
    //     },
    //     bottom: {
    //         connection: true
    //     },
    //     left: {
    //         connection: true
    //     }
    // },
    // TOP RIGHT L TILE
    {
        name: 'TOP RIGHT L',
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

export const TILE_SET_MAP = {
    0: 'BLANK',
    1: 'CROSS',
    2: 'HORIZONTAL LINE',
    3: 'VERTICAL LINE',
    4: 'LEFT T',
    5: 'RIGHT T',
    6: 'TOP RIGHT L',
    7: 'BOTTOM LEFT L',
}
