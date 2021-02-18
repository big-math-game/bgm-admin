<script lang="ts">
  import { onMount } from 'svelte'
  import Modal from '../../components/common/modal/Modal.svelte'
  import DeleteTaskWindow from '../../components/delete-task-window/DeleteTaskWindow.svelte'
  import EditTaskWindow from '../../components/edit-task-window/EditTaskWindow.svelte'
  import { getTemplateList, getTemplate, getThemeList } from '../../services/api-requests/api-requests'
  import { templateList } from '../../store/store'

  let themes = []
  let theme: string = 'all'
  let selectedTask = {}
  let deleteTaskWindow: boolean = false
  let editTaskWindow: boolean = false

  const getAllTasks = async () => {
    let tasksData = []
    for (let i = 0; i < themes.length; i++) {
      const res = await getTemplateList(themes[i].id)
      if (res) {
        tasksData = tasksData.concat(res)
      }
    }
    return tasksData
  }

  onMount(async () => {
    themes = await getThemeList()
    templateList.set(await getAllTasks())
  })
</script>

<svelte:head>
  <title>Tasks manager</title>
</svelte:head>

<div class="mr-2">
  <h3 class="title is-3">Tasks manager</h3>

  <div class="level">
    <div class="level-left">
      <div class="level-item">
        {#if themes}
          <div class="select">
            <label>
              <select bind:value="{theme}">
                <option value="all" selected>all</option>
                {#each themes as topic (topic.id)}
                  <option value="{topic.id}">{topic.name}</option>
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

  <h3 class="title is-3">Tasks</h3>

  <div class="table-container">
    <table class="table is-bordered">
      <thead>
        <tr>
          <th title="Task id"><abbr title="Id">Id</abbr></th>
          <th title="Theme"><abbr>Theme Id</abbr></th>
          <th title="Position"><abbr title="Position">Pos</abbr></th>
          <th title="Task description"><abbr title="Description">Description variants</abbr></th>
        </tr>
      </thead>

      {#if $templateList}
        <tbody>
          {#each $templateList as task, i (task.id)}
            {#if task.theme_id === theme || theme === 'all'}
              <tr>
                <th>{task.id}</th>
                <th>{task.theme_id}</th>
                <th>{task.position}</th>
                <th>{task.template.map((description, i) => `${i + 1}) ` + description).join('\n')}</th>
                <td
                  class="button is-primary is-small ml-2 mt-1"
                  on:click="{async () => {
                    selectedTask = await getTemplate(task.id)
                    editTaskWindow = true
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
            {/if}
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</div>

<Modal bind:active="{deleteTaskWindow}">
  <DeleteTaskWindow bind:close="{deleteTaskWindow}" />
</Modal>
{#if editTaskWindow}
  <Modal bind:active="{editTaskWindow}">
    <EditTaskWindow close="{editTaskWindow}" bind:selectedTask bind:themes />
  </Modal>
{/if}

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
</style>
