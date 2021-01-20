<script lang="ts">
  import SearchInput from '../components/common/searcInput/SearchInput.svelte'
  import { onMount } from 'svelte'
  import Modal from '../components/common/modal/Modal.svelte'
  import { fade } from 'svelte/transition'
  import Id from '../services/randomUID'

  let themeData = []
  let tasksData = []
  let addTaskWindow: boolean = false
  let taskCreated: boolean = false

  let disabled
  $: disabled = false
  $: tasks = []
  let taskListTitle: string = ''

  const submitHandler = () => {
    localStorage.setItem(
      'blanks',
      JSON.stringify({
        id: Id(),
        taskListTitle: taskListTitle,
        tasks: tasks
      })
    )
    tasks = []
    taskListTitle = ''
  }

  onMount(() => {
    themeData = JSON.parse(localStorage.getItem('theme'))
    tasksData = JSON.parse(localStorage.getItem('task'))
  })
</script>

<svelte:head>
  <title>Add task list</title>
</svelte:head>

<h3 class="title is-3">Added task list for players</h3>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
  <fieldset class="fieldset mr-2">
    <!-- Text input-->
    <div class="field mb-5">
      <label class="label" for="task-list-name">Task list title</label>
      <div class="control">
        <input
          id="task-list-name"
          name="task-list-name"
          type="text"
          placeholder="Enter task list name"
          class="input"
          bind:value="{taskListTitle}"
          required />
        <p class="help">Add answer</p>
      </div>
    </div>

    <h1 class="title is-4">Tasks</h1>

    <div class="field mb-5">
      <div class="table-container">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th title="Task id"><abbr title="Id">Id</abbr></th>
              <th title="Theme"><abbr>Theme</abbr></th>
              <th title="Position"><abbr title="Position">Pos</abbr></th>
              <th title="Task description"><abbr title="Description">Description variants</abbr></th>
              <th title="Params"><abbr title="Answer">Params</abbr></th>
              <th title="Answer"><abbr title="Answer">Answers</abbr></th>
            </tr>
          </thead>

          <tbody>
            {#each tasks.sort((a, b) => (a.position > b.position ? 1 : -1)) as task, i (task.id)}
              <tr>
                <th>{task.id}</th>
                <th>{'theme: ' + themeData.find((theme) => theme.id === task.theme_id).theme + ` | theme_id: ${task.theme_id}`}</th>
                <th>{task.position}</th>
                <th>{task.template.map((description, i) => `${i + 1}) ` + description).join('\n')}</th>
                <th class="params">
                  {task.params ? task.params.map((answer, i) => `${i + 1}) Param: ${answer.name},\n Min: ${answer.min},\n Max: ${answer.max}\n`) : 'none'}
                </th>
                <th class="answer">
                  {task.answer[0]
                    .split(',')
                    .map((answer, i) => `${i + 1}) ` + answer)
                    .join('\n')}
                </th>
                <td
                  class="button is-danger button-delete is-small ml-2 mt-1"
                  on:click="{() => {
                    tasks.splice(i, 1)
                  }}">
                  <span class="icon"> <i class="fas fa-times"></i> </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
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

<Modal bind:active="{addTaskWindow}">
  <div class="addTaskWindow">
    <SearchInput items="{tasksData}" searchProperties="{['id', 'theme_id', 'template']}" title="Select a player" bind:returnedValue="{tasks}" />
  </div>
</Modal>

<style>
  .addTaskWindow {
    background: #ffffff;
  }

  abbr {
    text-decoration: none;
  }
</style>
