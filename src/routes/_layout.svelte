<script lang="ts">
	import 'bulma/css/bulma.css';

	export let segment: string;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<main>
	<slot></slot>
</main>
