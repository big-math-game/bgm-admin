<script lang="ts">
  import 'bulma/css/bulma.css'
  import Menu from '../../components/menu/Menu.svelte'

  export let segment: string
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" />
</svelte:head>
<div class="columns">
  <Menu segment="{segment}" />

  <main class="column">
    <slot />
  </main>
</div>

<style>
  main {
    padding: 2em 1em 0;
  }
</style>
