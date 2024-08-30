<script>
	import { onMount } from 'svelte';
	import { matchTile, TILE_SET } from '$lib/utils/cityTiles';
	import { collapseTiles } from '$lib/utils/cityWaveFunction';

	// The number of rows and columns must be odd
	const NUM_ROWS = 9;
	const NUM_COLS = 9;
	const SIDE = 100;
	const HEIGHT = 100;

	let vertical_distance = SIDE / Math.cos(Math.PI / 3) / 2;
	let horizontal_distance = SIDE / Math.sin(Math.PI / 3);

	let visibleTileList = [];

	$: sortedVisibleTileList = visibleTileList.sort(visibleTileListSort);

	function visibleTileListSort(a, b) {
		let aSum = a.row + a.col;
		let bSum = b.row + b.col;
		if (aSum < bSum) {
			return -1;
		} else if (aSum > bSum) {
			return 1;
		} else {
			if (a.col < b.col) {
				return -1;
			}
		}
	}

	function computeTileHidden(row_num, col_num) {
		let horizontal = Math.abs(Math.floor(NUM_COLS / 2) - row_num);
		let vertical = Math.abs(Math.floor(NUM_ROWS / 2) - col_num);

		if (horizontal + vertical > Math.floor(NUM_COLS / 2)) {
			return true;
		}

		if ((row_num + col_num) % 2 !== 0) {
			return true;
		}

		visibleTileList.push({ row: row_num, col: col_num });
		visibleTileList = visibleTileList;
		return false;
	}

	let tiles = [];
	let computedGrid = Array.from({ length: NUM_ROWS }, () =>
		Array.from({ length: NUM_COLS }, () => ({}))
	);

	onMount(() => {
		initTiles();
		tiles = collapseTiles(tiles, Math.ceil(NUM_ROWS / 2), Math.ceil(NUM_COLS / 2));
		tiles.forEach((tile, index) => {
			let chosenTile = sortedVisibleTileList[index];
			computedGrid[chosenTile.row][chosenTile.col] = tile;
		});
	});

	function randomInitTiles() {
		tiles = Array.from({ length: Math.ceil(NUM_ROWS / 2) * Math.ceil(NUM_COLS / 2) }, () => ({}));

		for (let i = 0; i < tiles.length; i++) {
			let tile = tiles[i];

			tile.collapsed = false;

			let randomTile = TILE_SET[Math.floor(Math.random() * TILE_SET.length)];

			tile.connections = {
				top: randomTile.connections.top,
				right: randomTile.connections.right,
				bottom: randomTile.connections.bottom,
				left: randomTile.connections.left
			};
			tile.entropy = 100;

			let chosenTile = sortedVisibleTileList[i];
			computedGrid[chosenTile.row][chosenTile.col] = tile;
			computedGrid[chosenTile.row][chosenTile.col].name = randomTile.name;
		}

		console.log('computedGrid: ', computedGrid);
	}

	function initTiles() {
		tiles = Array.from({ length: Math.ceil(NUM_ROWS / 2) * Math.ceil(NUM_COLS / 2) }, () => ({}));

		for (let i = 0; i < tiles.length; i++) {
			let tile = tiles[i];

			tile.collapsed = false;
			tile.order = 0;
			tile.connections = {
				top: false,
				bottom: false,
				left: false,
				right: false
			};

			tile.entropy = Math.log2(TILE_SET.length);

			let chosenTile = sortedVisibleTileList[i];
			computedGrid[chosenTile.row][chosenTile.col] = tile;
			computedGrid[chosenTile.row][chosenTile.col].name = 'blank';
		}
	}
</script>

<div
	class="grid"
	style="--vertical-distance: {vertical_distance /
		2}px; --horizontal-distance: {horizontal_distance}px; --side: {SIDE}px; --height: {HEIGHT}px;"
>
	{#each computedGrid as row, row_num}
		<div class="row">
			{#each row as tile, col_num}
				<div
					class="tile"
					style="--background-image: {tile.name ? `url(./cube-${tile.name}.png)` : 'none'};"
					class:hidden={computeTileHidden(row_num, col_num)}
				>
					<div class="dot"></div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-direction: column;
		margin-top: 250px;
		// margin-left: calc(var(--horizontal-distance) * 1);
		margin: 250px auto;
		width: fit-content;

		.row {
			display: flex;
			flex-direction: row;

			.tile {
				width: var(--horizontal-distance);
				height: var(--vertical-distance);
				position: relative;

				&.hidden {
					opacity: 0;
				}

				.dot {
					display: none;
					width: 5px;
					height: 5px;
					background-color: #999;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}

				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
					height: calc(2 * var(--horizontal-distance));
					width: calc(2 * var(--horizontal-distance));
					// background-color: #999;
					// opacity: 0.5;
					// background-image: url('./cube-cross.png');
					// clip-path: polygon(0 22%, 50% 0, 100% 22%, 100% 78%, 50% 100%, 0 78%);
					background-image: var(--background-image);
					background-size: 100% 100%;
				}
			}
		}
	}
</style>
