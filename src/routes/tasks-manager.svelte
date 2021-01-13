<script lang="ts">
  // import Complexity from '../mocks/_complexity'
  import { onMount } from 'svelte'
  import Modal from '../components/common/modal/Modal.svelte'
  import DeleteTaskWindow from '../components/delete-task-window/DeleteTaskWindow.svelte'

  let themeData = []
  let tasksData = []

  // let difficulty = 0
  let topic: string = 'all'

  let taskIndex = 0
  let deleteTaskWindow: boolean = false
  let editTaskWindow: boolean = true

  onMount(() => {
    themeData = JSON.parse(localStorage.getItem('theme'))
    tasksData = JSON.parse(localStorage.getItem('task'))
  })
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<div class="mr-2">
  <h3 class="title is-3">Tasks topic</h3>

  <div class="level">
    <div class="level-left">
      <div class="level-item">
        {#if themeData}
          <div class="select">
            <label>
              <select bind:value="{topic}">
                <option value="all" selected>all</option>
                {#each themeData as topic (topic.id)}
                  <option value="{topic.id}">{topic.theme}</option>
                {/each}
              </select>
            </label>
          </div>
        {/if}
      </div>
    </div>
    <div class="level-right">
      <div class="level-item"><a href="add-task" class="button is-primary">add task</a></div>
    </div>
  </div>

  <!--  <div class="tabs">-->
  <!--    <ul>-->
  <!--      {#each Complexity as item (item.id)}-->
  <!--        <li class="{item.value === difficulty ? 'is-active' : ''}" on:click|preventDefault="{() => (difficulty = item.value)}">-->
  <!--          <a href=".">{item.name}</a>-->
  <!--        </li>-->
  <!--      {/each}-->
  <!--    </ul>-->
  <!--  </div>-->

  <h3 class="title is-3">Tasks</h3>

  <div class="table-container">
    <table class="table is-bordered">
      <thead>
        <tr>
          <!-- <th><abbr title="Topic">Topic</abbr></th>-->
          <th title="Task id"><abbr title="Id">Id</abbr></th>
          <th title="Theme"><abbr>Theme</abbr></th>
          <!--<th><abbr title="Complexity">Difficulty</abbr></th>-->
          <th title="Position"><abbr title="Position">Pos</abbr></th>
          <th title="Task description"><abbr title="Description">Description variants</abbr></th>
          <!--<th><abbr title="Image">Image</abbr></th>-->
          <th title="Params"><abbr title="Answer">Params</abbr></th>
          <th title="Answer"><abbr title="Answer">Answers</abbr></th>
        </tr>
      </thead>

      {#if tasksData}
        <tbody>
          {#each tasksData as task, i (task.id)}
            {#if task.theme_id === topic || topic === 'all'}
              <tr>
                <!--{#if task.topic}-->
                <!--  <th>{task.topic}</th>-->
                <!--{/if}-->
                <th>{task.id}</th>
                <th>{'theme: ' + themeData.find((theme) => theme.id === task.theme_id).theme + ` | theme_id: ${task.theme_id}`}</th>
                <!--<th>{task.difficulty}</th>-->
                <th>{task.position}</th>
                <th>{task.template.map((description, i) => `${i + 1}) ` + description).join('\n')}</th>
                <!--{#if task.image !== undefined}-->
                <!--  <th>{task.image}</th>-->
                <!--{/if}-->
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
                  class="button is-primary is-small ml-2 mt-1"
                  on:click="{() => {
                    taskIndex = i
                    editTaskWindow = true
                  }}">
                  <span class="icon"> <i class="fas fa-lg fa-edit"></i> </span>
                </td>
                <td
                  class="button is-danger button-delete is-small ml-2 mt-1"
                  on:click="{() => {
                    taskIndex = i
                    deleteTaskWindow = true
                  }}">
                  <span class="icon"> <i class="fas fa-times"></i> </span>
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</div>

<Modal bind:active="{deleteTaskWindow}">
  <DeleteTaskWindow bind:close="{deleteTaskWindow}" bind:tasksData bind:taskIndex />
</Modal>

<Modal bind:active="{editTaskWindow}" />

<style>
  .table td,
  .table th {
    padding: 3px 5px;
    font-size: 11px;
    white-space: pre-wrap;
  }

  @media (min-width: 1281px) {
    .table td,
    .table th {
      font-size: 15px;
    }
  }

  .table td {
    min-width: 40px;
  }

  abbr {
    text-decoration: none;
  }

  .answer {
    min-width: 210px;
  }

  .params {
    min-width: 100px;
  }
</style>
