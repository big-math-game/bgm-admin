<script lang="ts">
  import { onMount } from 'svelte'
  import { getThemeList } from '../../services/api-requests/api-requests'
  import { themesList } from '../../store/store'
  import Modal from '../../components/common/modal/Modal.svelte'
  import EditThemeModalWindow from '../../components/edit-theme-modal-window/EditThemeModalWindow.svelte'

  let themes
  $: themes = $themesList
  let editThemeWindow: boolean = false
  let searchTerm: string = ''.toLowerCase()
  let themeData: string = ''
  let selectedIndex: number = 0
  let searchProperties: string[] = ['name', 'description']
  let selectedProperty: string = ''

  let filteredList
  $: filteredList = themes
    .filter((item) => item[selectedProperty ? selectedProperty : searchProperties[0]].indexOf(searchTerm) !== -1)
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
  <title>Темы и шаблоны задач</title>
</svelte:head>

<div class="level">
  <div class="level-left">
    <div class="level-item">
      <h1 class="title is-4">Темы и шаблоны задач</h1>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item"><a href="create-theme" class="button is-primary">Добавить тему</a></div>
  </div>
</div>

<div class="tabs">
  <ul>
    {#each searchProperties as property, i (i)}
      <li class:is-active="{i === selectedIndex}">
        <a
          href=":"
          on:click|preventDefault="{() => {
            selectedIndex = i
            selectedProperty = property
          }}">{property}</a>
      </li>
    {/each}
  </ul>
</div>

<p class="control has-icons-left mb-3">
  <label><input class="input is-primary" type="text" placeholder="Search" bind:value="{searchTerm}" /></label>
  <span class="icon is-left"> <i class="fas fa-search" aria-hidden="true"></i> </span>
</p>

<div class="table-container">
  <table class="table is-bordered">
    <thead>
      <tr>
        <!--        <th title="Theme id"><abbr title="Id">Id</abbr></th>-->
        <th title="Сложность темы"><abbr>Сложность темы</abbr></th>
        <th title="Имя темы"><abbr title="Position">Имя темы</abbr></th>
        <th title="Описание темы"><abbr title="Description">Описание темы</abbr></th>
      </tr>
    </thead>

    <tbody>
      {#each filteredList as theme, i (theme.id)}
        <tr>
          <!--          <th><a class="theme-link" href="{`themes-and-tasks/${theme.id}`}">{theme.id}</a></th>-->
          <th><a class="theme-link" href="{`themes-and-tasks/${theme.id}`}">{theme.level}</a></th>
          <th><a class="theme-link" href="{`themes-and-tasks/${theme.id}`}">{theme.name}</a></th>
          <th><a class="theme-link" href="{`themes-and-tasks/${theme.id}`}">{theme.description}</a></th>
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

  .theme-link {
    color: #333333;
  }
</style>
