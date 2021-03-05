<script context="module">
  import Id from '../../../services/randomUID'

  export async function preload({ params }) {
    const { task_id } = params

    const taskId = task_id
    return { taskId }
  }
</script>

<script>
  import { getTemplate, getTheme, modifyTemplate } from '../../../services/api-requests/api-requests'
  import { task, blank } from '../../../store/store'
  import { onMount } from 'svelte'

  export let taskId = ''
  //let helpMessage = false
  //let helpText = ''
  //let error = false

  // let taskSaved = false
  let theme = ''
  let position = '0'
  let description = []
  let params = []
  let answer = []
  let image = ''
  let disabled = false

  const getFieldsNumber = () => {
    const fields = []
    for (let i = 0; i < description.length; i++) {
      fields.push({ id: Id() })
    }
    return fields
  }

  let fields = [{ id: Id() }]
  const addField = () => {
    fields = [...fields, { id: Id() }]
    description = [...$task.template, '']
    answer = [...$task.answer, '']
  }

  const removeField = () => {
    fields.pop()
    fields = [...fields]
    description.pop()
    description = [...description]
    answer.pop()
    answer = [...answer]
  }

  /*
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
   */

  onMount(async () => {
    task.set(await getTemplate(taskId))
    blank.set(await getTheme($task.theme_id))

    theme = $task.theme_id
    position = $task.position
    description = $task.template
    params = $task.params ? $task.params : null
    answer = $task.answer
    image = $task.image
    disabled = !!params
    fields = getFieldsNumber()
  })
</script>

<a class="button is-link mb-3" href="{`blanks/${$blank.name}`}">
  <span class="icon is-small"> <i class="fas fa-chevron-left"></i> </span>
  <span>Назад</span>
</a>

<div class="level">
  <div class="level-left">
    <div class="level-item">
      <h1 class="title">Шаблон задачи №{$task.position} бланка {$blank.name}</h1>
    </div>
  </div>
</div>

<form
  class="form-horizontal"
  enctype="multipart/form-data"
  on:submit|preventDefault="{async () => {
    const res = await modifyTemplate($task.id, theme, description, answer, Number(position), image)
    console.log(res)
    // window.location.reload()
  }}">
  <fieldset class="fieldset mr-2">
    <!-- Select Basic
    <div class="field is-horizontal">
      <div class="field">
        <label class="label" for="topic">Select theme</label>
        <div class="control">
          <div class="select">
            <select id="topic" name="topic" bind:value="{theme}" required disabled="{params !== null}">
              {#if themes}
                <option selected disabled></option>
                {#each themes as theme (theme.id)}
                  <option value="{theme.id}">{theme.name}</option>
                {/each}
              {:else}
                <option disabled>add theme</option>
              {/if}
            </select>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- Select Basic -->
    <div class="field mb-5">
      <label class="label" for="listNumber">Позиция задачи</label>
      <div class="control">
        <div class="select">
          <select id="listNumber" name="listNumber" bind:value="{position}" disabled="{disabled}">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
      </div>
    </div>

    {#each fields as field, i (i)}
      <!-- Textarea -->
      <div class="field mb-5">
        <label class="label" for="{`task-${i}`}">Описание {i + 1}</label>
        <div class="control">
          <textarea
            class="textarea"
            id="{`task-${i}`}"
            name="task"
            placeholder="Введите описание"
            bind:value="{description[i]}"
            required
            disabled="{disabled}"></textarea>
        </div>
      </div>

      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="{`answer-${i}`}">Ответ {i + 1}</label>
        <div class="control">
          <input
            id="{`answer-${i}`}"
            name="answer"
            type="text"
            placeholder="Введите ответ"
            class="input"
            bind:value="{answer[i]}"
            required
            disabled="{disabled}" />
        </div>
      </div>

      {#if !!params && params.length > 0}
        <div class="field mb-5">
          <p class="has-text-grey">Имя параметра - {params[i].name}</p>
          <p class="has-text-grey">Минимальное значение - {params[i].min}</p>
          <p class="has-text-grey">Максимальное значение - {params[i].max}</p>
        </div>
      {/if}
    {/each}

    <!-- Button -->
    {#if params === null}
      <div class="field is-grouped mb-5">
        <div class="control"><button class="button is-primary" on:click|preventDefault="{addField}">Добавить вариант</button></div>
        {#if fields.length > 1}
          <div class="control"><button class="button is-danger" on:click|preventDefault="{removeField}">Удалить вариант</button></div>
        {/if}
      </div>
    {/if}

    <div class="field mb-5">
      <label class="label" for="image">Ссылка на изображение</label>
      <div class="control">
        <input
          id="image"
          name="answer"
          type="text"
          placeholder="Введите ссылку на изображение"
          class="input"
          bind:value="{image}"
          disabled="{disabled}" />
      </div>
    </div>

    <!-- Button -->
    {#if params === null}
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control"><button id="submit" name="submit" type="submit" class="button is-success">Сохранить </button></div>
      </div>
    {/if}
  </fieldset>
</form>
