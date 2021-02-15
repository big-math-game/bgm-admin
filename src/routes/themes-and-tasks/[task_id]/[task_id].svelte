<script context="module">
  import { url } from '../../../requestsUrl'
  import Id from '../../../services/randomUID'

  export async function preload({ params }) {
    const { task_id } = params

    const res = await this.fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        method: 'MathAdminAPI.GetTemplate',
        params: [{ id: task_id }],
        id: Id()
      })
    })

    const taskData = await res.json()
    return { taskData }
  }
</script>

<script>
  import { generateTasksFromTemplate, getTemplate } from '../../../services/api-requests/api-requests'
  import { task, theme } from '../../../store/store'
  import { onMount } from 'svelte'

  export let taskData = { result: {} }
  const { id } = taskData.result
  let helpMessage = false
  let helpText = ''
  let error = false

  const generateTasks = async () => {
    const res = await generateTasksFromTemplate(id)
    if (res.result) {
      error = false
      helpText = `Сгенерировано ${res.result} задач`
      helpMessage = true
      setTimeout(() => {
        helpMessage = false
      }, 2000)
      task.set(await getTemplate(id))
    } else {
      helpMessage = true
      error = true
      helpText = res.error
    }
  }

  onMount(async () => {
    task.set(taskData.result)
    console.log($task)
  })
</script>

<a class="button is-link mb-3" href="{`themes-and-tasks/${$task.theme_id}`}">
  <span class="icon is-small"> <i class="fas fa-chevron-left"></i> </span>
  <span>Назад</span>
</a>

<div class="level">
  <div class="level-left">
    <div class="level-item">
      <h1 class="title">Описание темы</h1>
    </div>
    <div class="level-item">
      <button type="button" class="button is-primary" on:click="{generateTasks}">Сгенерировать шаблон задачи</button>
      {#if helpMessage}
        <p class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">&nbsp; {helpText}</p>
      {/if}
    </div>
  </div>
</div>

<hr />

<ul>
  {#if $task}
    <li>id шаблона задачи - {$task.id}</li>
    <hr />
    <li>id темы - {$task.theme_id}</li>
    <hr />
    <li class="description">
      Шаблоны задачи:
      <br />
      {$task.template ? $task.template.map((description, i) => `${i + 1}) ` + description + '\n').join('\n') : ''}
    </li>
    <hr />
    <li>
      Параметры -
      {$task.params ? $task.params.map((p, i) => `${i + 1}) ` + `Имя - ${p.name}, мин-${p.min}, макс-${p.max}` + '\n').join('\n') : 'нет'}
    </li>
    <hr />
    <li class="description">Ответы: <br /> {$task.answer ? $task.answer.map((t, i) => `${i + 1}) ` + t + '\n').join('\n') : ''}</li>
    <hr />
    <li>Сложность - {$task.difficulty}</li>
    <hr />
    <li>Позиция - {$task.position}</li>
    <hr />
    <li>Ссылка на изображение - {$task.image ? $task.image : 'нет'}</li>
    <hr />
    <li>Количестве сгенерированных задач - {$task.generated_task_count}</li>
  {/if}
</ul>

<br />

<article class="message is-danger">
  <div class="message-header">
    <p>Внимание</p>
  </div>
  <div class="message-body">
    Количестве сгенерированных задач из этого шаблона. Это число должно быть либо 0, либо равняться числу элементов в массиве "template". Если число
    отлично от 0, то генерировать задачи из этого шаблона больше нельзя.
  </div>
</article>

<br />

<style>
  .description {
    white-space: pre-wrap;
  }
</style>
