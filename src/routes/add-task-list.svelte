<script lang="ts">
  import SearchInput from '../components/common/searcInput/SearchInput.svelte'
  import Id from '../services/randomUID'
  import { onMount } from 'svelte'
  import Modal from '../components/common/modal/Modal.svelte'
  import { fade } from 'svelte/transition'

  let users = []
  let themeData = []
  let tasksData = []
  let addTaskWindow: boolean = false
  let taskCreated: boolean = false
  let disabled
  $: disabled = false

  let user = null
  let tasks = []

  const createUsers = (usersNames) => {
    const usersData = []
    for (let i = 0; i < usersNames.length; i++) {
      usersData.push({
        id: Id(),
        email: usersNames[i].toLowerCase() + '@user.ru',
        login: usersNames[i]
      })
    }
    return usersData
  }

  const submitHandler = () => {
    console.log('lol')
  }

  onMount(() => {
    users = JSON.parse(localStorage.getItem('users'))
    if (!users) {
      const jsonUsers: string = JSON.stringify(
        createUsers([
          'Антон',
          'Андрей',
          'Анастасия',
          'Саша',
          'Петя',
          'Маша',
          'Света',
          'Мария',
          'Кирил',
          'Вова',
          'Дима',
          'Рима',
          'Коля',
          'Павел',
          'Богдан',
          'Витя',
          'Слава',
          'Ерафим',
          'Женя',
          'Ира',
          'Катя',
          'Алексей',
          'Лора',
          'Наташа',
          'Оля',
          'Ярик',
          'Владимир',
          'Рома',
          'Толик',
          'Ян'
        ])
      )
      localStorage.setItem('users', jsonUsers)
    }
    themeData = JSON.parse(localStorage.getItem('theme'))
    tasksData = JSON.parse(localStorage.getItem('task'))
    console.log(tasksData)
  })
</script>

<svelte:head>
  <title>Add list</title>
</svelte:head>

<h3 class="title is-3">Added task list for player</h3>

{#if users}
  <form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
    <fieldset class="fieldset mr-2">
      {#if !user}
        <div class="field mb-5">
          <SearchInput items="{users}" searchProperties="{['login', 'email']}" title="Select a player" bind:returnedValue="{user}" />
        </div>
      {/if}

      <p class="mb-2">
        Selected player:
        {user ? user[0].login : 'Select player'}
        {#if user}
          <button
            class="delete"
            on:click="{() => {
              user = null
            }}"></button>
        {/if}
      </p>

      <h1 class="title is-4">Tasks</h1>

      <div class="field mb-5">
        <ul>
          {#each tasks as task, i (task.id)}
            <li>{`${i + 1}: id:${task.id} theme:${themeData.find((theme) => theme.id === task.theme_id).theme} description:${task.description}`}</li>
          {/each}
        </ul>
      </div>

      {#if tasks.length < 8}
        <div class="field mb-5">
          <button
            class="button is-primary"
            on:click="{() => {
              addTaskWindow = true
            }}">Add task</button>
        </div>
      {/if}

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button id="submit" name="submit" type="submit" class="button is-success" disabled="{disabled}">Submit</button>
          {#if taskCreated}
            <p transition:fade="{{ duration: 250 }}" class="help has-text-success is-size-3">Li added!</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
{/if}

<Modal bind:active="{addTaskWindow}">
  <SearchInput items="{tasksData}" searchProperties="{['id', 'description', 'theme_id']}" title="Select a player" bind:returnedValue="{tasks}" />
</Modal>
