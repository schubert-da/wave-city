<script>
	import { collapseTiles } from '$lib/components/DrawnGrid/DrawnWaveFunction';
	import { TILE_SET } from '$lib/utils/playGroundTiles';
	import { onMount } from 'svelte';

	const NUM_ROWS = 6;
	const NUM_COLS = 12;

	const DIRECTIONS = ['left', 'right', 'top', 'bottom'];
	const COLOR_LIST = ['red', 'goldenrod', 'orange', 'aliceblue'];

	let startAnimation = false;

	let tiles = [];
	let computedGrid = Array.from({ length: NUM_ROWS }, () =>
		Array.from({ length: NUM_COLS }, () => ({}))
	);

	initTiles();
	tiles = collapseTiles(tiles, NUM_ROWS, NUM_COLS);
	console.log('tiles', tiles);

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
							<!-- select random path from tile.image.path -->
							{#if tile.image}
								{@const randomImageIndex = Math.floor(Math.random() * tile.image.paths.length)}
								{@const randomRotationIndex = Math.floor(
									Math.random() * tile.image.rotation.length
								)}
								<img
									class="tile-image"
									style="--tile-rotation: {tile.image.rotation[randomRotationIndex]}deg"
									src="drawn-images/{tile.image.paths[randomImageIndex]}"
									alt="tile"
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/key}
{/if}

<style lang="scss">
	.grid {
		--tile-width: 150px;
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
				// border: var(--border-width) solid rgba(0, 0, 0, 0.2);
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

				.tile-image {
					width: 100%;
					height: 100%;

					transform: rotate(var(--tile-rotation));
				}
			}
		}
	}
</style>
