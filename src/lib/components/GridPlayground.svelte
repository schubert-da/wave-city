<script>
	import { collapseTiles, computeEntropy } from '$lib/utils/waveFunction';
	import { TILE_SET } from '$lib/utils/PlayGroundTiles';

	const NUM_ROWS = 5;
	const NUM_COLS = 10;

	const DIRECTIONS = ['left', 'right', 'top', 'bottom'];
	const COLOR_LIST = ['red', 'goldenrod', 'orange', 'aliceblue'];

	let tiles = [];
	let computedGrid = Array.from({ length: NUM_ROWS }, () =>
		Array.from({ length: NUM_COLS }, () => ({}))
	);

	initTiles();
	tiles = collapseTiles(tiles, NUM_ROWS, NUM_COLS);

	tiles.forEach((tile, index) => {
		computedGrid[Math.floor(index / NUM_COLS)][index % NUM_COLS] = tile;
	});

	function initTiles() {
		tiles = Array.from({ length: NUM_ROWS * NUM_COLS }, () => ({}));

		for (let i = 0; i < tiles.length; i++) {
			let tile = tiles[i];

			tile.collapsed = false;
			tile.connections = {
				top: false,
				bottom: false,
				left: false,
				right: false
			};

			tile.entropy = Math.log2(TILE_SET.length);
			tile.color = 'none';

			computedGrid[Math.floor(i / NUM_COLS)][i % NUM_COLS] = tile;
		}
	}

	function randomInitTiles() {
		tiles = Array.from({ length: NUM_ROWS * NUM_COLS }, () => ({}));

		for (let i = 0; i < tiles.length; i++) {
			let tile = tiles[i];

			tile.collapsed = false;
			tile.connections = {
				top: Math.random() > 0.5,
				bottom: Math.random() > 0.5,
				left: Math.random() > 0.5,
				right: Math.random() > 0.5
			};
			tile.entropy = 100;
			tile.color = COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];

			computedGrid[Math.floor(i / NUM_COLS)][i % NUM_COLS] = tile;
		}
	}
</script>

{#if computedGrid.length === 0}
	<p>Loading...</p>
{:else}
	<div class="grid">
		{#each computedGrid as row, row_index}
			<div class="row">
				{#each row as tile, col_index}
					<div
						class="tile"
						class:left={tile.connections.left}
						class:right={tile.connections.right}
						class:top={tile.connections.top}
						class:bottom={tile.connections.bottom}
					>
						<div class="dot"></div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.grid {
		--tile-width: 150px;
		--tile-gap: 0px;

		display: flex;
		flex-direction: column;
		gap: var(--tile-gap);

		.row {
			display: flex;
			flex-direction: row;
			gap: var(--tile-gap);

			.tile {
				width: var(--tile-width);
				height: var(--tile-width);
				border: 1px solid #999;

				display: flex;
				justify-content: center;
				align-items: center;

				position: relative;

				.dot {
					width: 8px;
					height: 8px;
					border-radius: 10px;
					background-color: #333;
					z-index: 10;
				}

				&:before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50;
					width: 100%;
					height: 5px;
					transform: translate(0, -50%);
					background-color: #666;
					pointer-events: none;

					display: none;
				}

				&.left:before,
				&.right:before,
				&.top:after,
				&.bottom:after {
					display: block;
				}

				&.left.right:before {
					width: 100%;
					top: 50%;
					left: 0;
					transform: translate(0, -50%);
				}

				&.left:before {
					top: 50%;
					left: 0;
					width: 50%;
					transform: translate(0, -50%);
				}

				&.right:before {
					top: 50%;
					left: 50%;
					width: 50%;
					transform: translate(0, -50%);
				}

				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 50%;
					width: 5px;
					height: 100%;
					transform: translate(-50%, 0);
					background-color: #666;
					pointer-events: none;

					display: none;
				}

				&.top.bottom:after {
					height: 100%;
					left: 50%;
					top: 0;
					transform: translate(-50%, 0);
				}

				&.top:after {
					height: 50%;
					left: 50%;
					top: 0;
					transform: translate(-50%, 0);
				}

				&.bottom:after {
					height: 50%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, 0);
				}
			}
		}
	}
</style>
