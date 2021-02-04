<script lang="ts">
  import { onMount } from 'svelte'
  import { getThemeList } from '../services/api-requests/api-requests'
  import { themesList } from '../store/store'
  import Modal from '../components/common/modal/Modal.svelte'
  import EditThemeModalWindow from '../components/edit-theme-modal-window/EditThemeModalWindow.svelte'

  $: themes = $themesList
  let editThemeWindow: boolean = false
  let searchTerm: string = ''
  let themeData: string = ''

  $: filteredList = themes
    .filter((item) => item.name.indexOf(searchTerm) !== -1)
    .sort((a, b) => {
      if (a.name > b.name) return 1
      if (b.name < a.name) return -1
      return a.name - b.name
    })

  onMount(async () => {
    themesList.set(await getThemeList())
  })
</script>

<svelte:head>
  <title>Themes manager</title>
</svelte:head>

<h1 class="title is-4">Themes manager</h1>

<p class="control has-icons-left mb-3">
  <label><input class="input is-primary" type="text" placeholder="Search" bind:value="{searchTerm}" /></label>
  <span class="icon is-left"> <i class="fas fa-search" aria-hidden="true"></i> </span>
</p>

<div class="table-container">
  <table class="table is-bordered">
    <thead>
      <tr>
        <th title="Theme id"><abbr title="Id">Id</abbr></th>
        <th title="Theme level"><abbr>Level</abbr></th>
        <th title="Name"><abbr title="Position">Name</abbr></th>
        <th title="Theme description"><abbr title="Description">Description</abbr></th>
      </tr>
    </thead>

    <tbody>
      {#each filteredList as theme, i (theme.id)}
        <tr>
          <th>{theme.id}</th>
          <th>{theme.level}</th>
          <th>{theme.name}</th>
          <th>{theme.description}</th>
          <td
            class="button is-primary is-small ml-2 mt-1"
            on:click="{() => {
              themeData = theme
              editThemeWindow = true
            }}">
            <span class="icon"> <i class="fas fa-lg fa-edit"></i> </span>
          </td>
          <!--<td-->
          <!--class="button is-danger button-delete is-small ml-2 mt-1"-->
          <!--on:click="{() => {-->
          <!--deleteTaskWindow = true-->
          <!--}}">-->
          <!--<span class="icon"> <i class="fas fa-times"></i> </span>-->
          <!--</td>-->
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if editThemeWindow}
  <Modal bind:active="{editThemeWindow}">
    <EditThemeModalWindow bind:close="{editThemeWindow}" bind:themeData />
  </Modal>
{/if}

<style>
  abbr {
    text-decoration: none;
  }
</style>
