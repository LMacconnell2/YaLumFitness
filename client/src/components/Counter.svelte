<script>
	let count = $state(0);
</script>

<button onclick={() => count++}>
	Count is {count}
</button>

<style>
	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
</style>