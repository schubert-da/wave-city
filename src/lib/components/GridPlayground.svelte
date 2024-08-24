<script>
	const NUM_ROWS = 3;
	const NUM_COLS = 3;
</script>

<div class="grid">
	{#each Array(NUM_ROWS) as row, row_index}
		<div class="row">
			{#each Array(NUM_COLS) as col, col_index}
				<div class="tile">
					{row_index * NUM_COLS + col_index}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-direction: column;

		.row {
			display: flex;
			flex-direction: row;
		}
	}
</style>
