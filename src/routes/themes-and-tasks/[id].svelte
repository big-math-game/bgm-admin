<script context="module">
  import { url } from '../../requestsUrl'
  import Id from '../../services/randomUID'

  export async function preload({ params }) {
    const { id } = params

    const res = await this.fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        method: 'MathAdminAPI.GetTheme',
        params: [{ theme_id: id }],
        id: Id()
      })
    })

    const themeData = await res.json()
    return { themeData }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { templateList, theme } from '../../store/store'
  import { generateTasksForTheme, getTemplate, getTemplateList, getTheme, getThemeList } from '../../services/api-requests/api-requests'
  import Modal from '../../components/common/modal/Modal.svelte'
  import EditTaskWindow from '../../components/edit-task-window/EditTaskWindow.svelte'

  export let themeData = { result: {} }
  let themes = []
  let helpMessage = false
  let helpText = ''
  let error = false

  const { id } = themeData.result ? themeData.result : {}

  let selectedTask = {}
  let editTaskWindow = false

  const generateTasks = async () => {
    const res = await generateTasksForTheme(id)
    if (res.result) {
      error = false
      helpText = `Сгенерировано ${res.result} задач`
      helpMessage = true
      setTimeout(() => {
        helpMessage = false
      }, 2000)
      theme.set(await getTheme(id))
    } else {
      helpMessage = true
      error = true
      helpText = res.error
    }
  }

  onMount(async () => {
    templateList.set(await getTemplateList(id))
    theme.set(themeData.result ? themeData.result : {})
    themes = await getThemeList()
  })
</script>

<a class="button is-link mb-3" href="themes-and-tasks">
  <span class="icon is-small"> <i class="fas fa-chevron-left"></i> </span>
  <span>Назад</span>
</a>

<div class="level">
  <div class="level-left">
    <div class="level-item">
      <h1 class="title">Описание темы</h1>
    </div>
    {#if $theme.id}
      <div class="level-item">
        <button type="button" class="button is-primary" on:click="{generateTasks}">Сгенерировать задачи</button>
        {#if helpMessage}
          <p class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">&nbsp; {helpText}</p>
        {/if}
      </div>
    {/if}
  </div>
</div>

<hr />

<ul>
  {#if $theme.id}
    <li>id темы - {$theme.id}</li>
    <li>Имя темы - {$theme.name}</li>
    <li>Описание темы - {$theme.description}</li>
    <li>Уровень темы - {$theme.level}</li>
    <li>Количество шаблонов в теме - {$theme.template_count}</li>
    <li>Количество задач по шаблонам (должно быть сгенерировано) - {$theme.template_task_count}</li>
    <li>Количество реально сгенерированных задач - {$theme.real_task_count}</li>
  {:else}
    <li>Добавьте шаблоны задач</li>
  {/if}
</ul>

<hr />

<div class="level">
  <div class="level-left">
    <div class="level-item">
      <h3 class="title is-3">Шаблоны темы</h3>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item"><a href="add-task" class="button is-primary">Добавить шаблон задачи</a></div>
  </div>
</div>

<div class="table-container">
  <table class="table is-bordered">
    <thead>
      <tr>
        <!--        <th title="Task id"><abbr title="Id">Id</abbr></th>-->
        <!--        <th title="Theme"><abbr>Theme Id</abbr></th>-->
        <th title="Позиция"><abbr title="Position">Позиция</abbr></th>
        <th title="Содержание"><abbr title="Description">Содержание</abbr></th>
      </tr>
    </thead>

    {#if $templateList}
      <tbody>
        {#each $templateList as task, i (task.id)}
          <tr>
            <!--            <th><a class="theme-link" href="{`themes-and-tasks/${id}/${task.id}`}">{task.id}</a></th>-->
            <!--            <th><a class="theme-link" href="{`themes-and-tasks/${id}/${task.id}`}">{task.theme_id}</a></th>-->
            <th><a class="theme-link" href="{`themes-and-tasks/${id}/${task.id}`}">{task.position}</a></th>
            <th><a class="theme-link" href="{`themes-and-tasks/${id}/${task.id}`}">{task.template[0]}</a></th>
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
        {/each}
      </tbody>
    {/if}
  </table>
</div>

{#if editTaskWindow}
  <Modal bind:active="{editTaskWindow}">
    <EditTaskWindow close="{editTaskWindow}" bind:selectedTask bind:themes />
  </Modal>
{/if}

<style>
  .theme-link {
    color: #333333;
  }
</style>
