<script lang="ts">
  export let items = []
  export let searchProperties = []
  export let title = ''
  export let returnedValue
  let searchTerm: string = ''
  let selectedIndex = 0
  let selectedProperty = ''
  $: filteredList = items.filter((item) => item[selectedProperty ? selectedProperty : searchProperties[0]].indexOf(searchTerm) !== -1)
</script>

<article class="panel is-primary">
  <p class="panel-heading">{title}</p>
  <p class="panel-tabs">
    {#each searchProperties as property, i (i)}
      <a
        class:is-active="{i === selectedIndex}"
        on:click="{() => {
          selectedIndex = i
          selectedProperty = property
        }}">{property}</a>
    {/each}
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <label for="search-input"></label>
      <input id="search-input" class="input is-primary" type="text" placeholder="Search" bind:value="{searchTerm}" />
      <span class="icon is-left"> <i class="fas fa-search" aria-hidden="true"></i> </span>
    </p>
  </div>
  {#if searchTerm}
    {#each filteredList as list, i (list.id)}
      <a
        class="panel-block is-active"
        on:click="{() => {
          returnedValue = list
        }}">
        <span class="panel-icon"> <i class="fas fa-user" aria-hidden="true"></i> </span>
        {#each searchProperties as properties}{list[properties] + ' '}{/each}
      </a>
    {/each}
  {/if}
</article>
