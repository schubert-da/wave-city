<script>
	import { collapseTiles, computeEntropy } from '$lib/utils/playgroundWaveFunction';
	import { TILE_SET } from '$lib/utils/playGroundTiles';
	import { onMount } from 'svelte';

	const NUM_ROWS = 5;
	const NUM_COLS = 10;

	const DIRECTIONS = ['left', 'right', 'top', 'bottom'];
	const COLOR_LIST = ['red', 'goldenrod', 'orange', 'aliceblue'];

	let startAnimation = false;

	let tiles = [];
	let computedGrid = Array.from({ length: NUM_ROWS }, () =>
		Array.from({ length: NUM_COLS }, () => ({}))
	);

	initTiles();
	tiles = collapseTiles(tiles, NUM_ROWS, NUM_COLS);

	tiles.forEach((tile, index) => {
		computedGrid[Math.floor(index / NUM_COLS)][index % NUM_COLS] = tile;
	});

	onMount(() => {
		setTimeout(() => {
			startAnimation = true;
		}, 1000);
	});

	function initTiles() {
		tiles = Array.from({ length: NUM_ROWS * NUM_COLS }, () => ({}));

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
	{#key tiles}
		<div class="grid">
			{#each computedGrid as row, row_index}
				<div class="row">
					{#each row as tile, col_index}
						<div
							class="tile collapsed-{tile.collapsed}"
							style="transition-delay: {tile.order * 0.075}s"
							class:animate={startAnimation}
							class:collapsed={tile.collapsed}
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
	{/key}
{/if}

<style lang="scss">
	.grid {
		--tile-width: 75px;
		--border-width: 1px;
		--line-width: 3px;
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
				border: var(--border-width) solid rgba(0, 0, 0, 0.2);
				display: flex;
				justify-content: center;
				align-items: center;

				position: relative;
				opacity: 0;
				transition: opacity 0.5s ease-in;

				&:not(.collapsed) {
					opacity: 0 !important;
				}

				&.animate {
					opacity: 1;
				}

				.dot {
					width: 3px;
					height: 3px;
					border-radius: 6px;
					background-color: #666;
					z-index: 10;
				}

				&:before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50;
					width: 100%;
					height: var(--line-width);
					transform: translate(0, -50%);
					background-color: #666;
					pointer-events: none;
					z-index: 2;

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
					width: var(--line-width);
					height: 100%;
					transform: translate(-50%, 0);
					background-color: #666;
					pointer-events: none;
					z-index: 2;

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
