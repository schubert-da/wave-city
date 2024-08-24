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


]
