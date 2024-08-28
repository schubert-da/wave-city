<script>
	// The number of rows and columns must be odd
	const NUM_ROWS = 5;
	const NUM_COLS = 5;
	const SIDE = 100;
	const HEIGHT = 100;

	let vertical_distance = SIDE / Math.cos(Math.PI / 3) / 2;
	let horizontal_distance = SIDE / Math.sin(Math.PI / 3);

	function computeTileVisible(row_num, col_num) {
		let horizontal = Math.abs(Math.floor(NUM_COLS / 2) - row_num);
		let vertical = Math.abs(Math.floor(NUM_ROWS / 2) - col_num);

		if (horizontal + vertical > Math.floor(NUM_COLS / 2)) {
			return true;
		}

		if ((row_num + col_num) % 2 !== 0) {
			return true;
		}

		console.log('visible');
		return false;
	}
</script>

<div
	class="grid"
	style="--vertical-distance: {vertical_distance /
		2}px; --horizontal-distance: {horizontal_distance}px; --side: {SIDE}px; --height: {HEIGHT}px;"
>
	{#each Array.from({ length: NUM_ROWS }) as _, row_num}
		<div class="row">
			{#each Array.from({ length: NUM_COLS }) as _, col_num}
				<div class="tile" class:hidden={computeTileVisible(row_num, col_num)}>
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
		margin-left: 100px;

		.row {
			display: flex;
			flex-direction: row;

			.tile {
				width: var(--horizontal-distance);
				height: var(--vertical-distance);
				position: relative;

				border: 1px solid #ddd;

				&.hidden {
					opacity: 0;
				}

				.dot {
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
					// height: calc(var(--height) + 2 * var(--vertical-distance));
					height: calc(2 * var(--horizontal-distance));
					width: calc(2 * var(--horizontal-distance));
					background-color: #999;
					opacity: 0.5;
					clip-path: polygon(0 22%, 50% 0, 100% 22%, 100% 78%, 50% 100%, 0 78%);
				}
			}
		}
	}
</style>
