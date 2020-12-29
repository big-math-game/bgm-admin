<script lang="ts">
  import SearchInput from '../components/common/searcInput/SearchInput.svelte'
  import Id from '../services/randomUID'
  import { onMount } from 'svelte'
  const submitHandler = () => {
    console.log('lol')
  }

  let users = []
  let tasksData = []

  let userId

  const createUsers = (usersNames) => {
    const usersData = []
    for (let i = 0; i < usersNames.length; i++) {
      usersData.push({
        id: Id(),
        email: usersNames[i].toLowerCase() + '@user.ru',
        login: usersNames[i]
      })
    }
    console.log(usersData)
    return usersData
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
    tasksData = JSON.parse(localStorage.getItem('task'))
  })
</script>

<svelte:head>
  <title>Add list</title>
</svelte:head>

<h3 class="title is-3">Added task list for player</h3>

{#if users}
  <form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
    <fieldset class="fieldset mr-2">
      <div class="field mb-5">
        <SearchInput items="{users}" searchProperties="{['login', 'email']}" title="Select a player" bind:returnedValue="{userId}" />
      </div>

      <p class="mb-2">Selected player: {userId ? userId.login : 'Select player'}</p>

      <h1 class="title is-4">Tasks</h1>
      <!--    <div class="field mb-5">-->
      <!--      <SearchInput items="{tasksData}" searchProperties="{['id', 'difficulty', '']}" title='Select a task' bind:returnedValue={userId} />-->
      <!--    </div>-->

      <button class="button is-primary">Add task</button>
    </fieldset>
  </form>
{/if}
