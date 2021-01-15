<script lang="ts">
  import type { taskTemplate } from '../../types/tasks.type'
  import Id from '../../services/randomUID'
  import { joinCssClasses } from '../../utils/utils'
  import { fade } from 'svelte/transition'

  export let close: boolean = false
  export let taskIndex: number = 0
  export let tasksData: taskTemplate[] = []
  export let themeData

  let active: boolean = false
  let taskCreated: boolean = false
  $: availabilityOfParams = !!tasksData[taskIndex].params
  $: calculated = availabilityOfParams

  $: positionNumber = tasksData[taskIndex].position.toString()
  $: themeId = tasksData[taskIndex].theme_id

  $: theme = themeId
  $: position = positionNumber
  $: description = tasksData[taskIndex].template
  $: params = tasksData[taskIndex].params ? tasksData[taskIndex].params : null
  $: answer = tasksData[taskIndex].answer

  $: console.log(tasksData[taskIndex].params)

  let disabled
  $: disabled = !theme && !description.length > 0 && !answer.length > 0

  let fields = [{ id: Id() }]
  const addField = () => {
    fields = [...fields, { id: Id() }]
  }

  const removeField = () => {
    fields.pop()
    fields = [...fields]
  }

  const addParamField = () => {
    if (tasksData[taskIndex].params) {
      params = [...params, { name: '', min: 1, max: 1 }]
    } else {
      tasksData[taskIndex].params = [{ name: '', min: 1, max: 1 }]
    }
  }
  const removeParamField = () => {
    params.pop()
    params = [...params]
  }

  //const submitHandler = () => {

  // }
</script>

<div class="edit-window">
  <h3 class="title is-3">Edit task</h3>

  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit="{() => {
      const { id, difficulty } = tasksData[taskIndex]
      tasksData[taskIndex] = { id, theme_id: theme, template: description, params: calculated ? (params.length > 0 ? params : null) : null, answer: answer, difficulty, position: Number(position) }
      localStorage.setItem('task', JSON.stringify(tasksData))
      close = false
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Select Basic -->
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="topic">Select theme</label>
          <div class="control">
            <div class="select">
              <select id="topic" name="topic" bind:value="{theme}" required>
                {#if themeData}
                  <option selected disabled></option>
                  {#each themeData as theme (theme.id)}
                    <option value="{theme.id}">{theme.theme}</option>
                  {/each}
                {:else}
                  <option disabled>add theme</option>
                {/if}
              </select>
            </div>
            {#if !active}<button class="button is-primary" on:click|preventDefault="{() => (active = !active)}">Add theme</button>{/if}
          </div>
        </div>

        <div class="{joinCssClasses('field', !active ? 'is-invisible' : '')}">
          <label class="label" for="addTopic">Add theme</label>
          <div class="field has-addons">
            <div class="control">
              <input id="addTopic" name="answerOptions" class="input " placeholder="placeholder" type="text" bind:value="{theme}" />
            </div>
            <div class="control">
              <div
                class="button is-success"
                on:click|preventDefault="{() => {
                  localStorage.setItem('theme', JSON.stringify(themeData === null ? [{ id: Id(), theme: theme }] : [...themeData, { id: Id(), theme: theme }]))
                  active = !active
                  themeData = JSON.parse(localStorage.getItem('theme'))
                }}">
                save
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <!-- Select Basic -->
      <div class="field mb-5">
        <label class="label" for="listNumber">Select list task position</label>
        <div class="control">
          <div class="select">
            <select id="listNumber" name="listNumber" bind:value="{position}">
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

      <hr />
      <!-- checkbox Basic -->
      <div class="field mb-5"><label class="checkbox"> <input type="checkbox" bind:checked="{calculated}" /> Calculated</label></div>

      {#if !calculated}
        {#each description as description, i (i)}
          <!-- Textarea -->
          <div class="field mb-5">
            <label class="label" for="{`task-${i}`}">Enter description {i + 1}</label>
            <div class="control"><textarea class="textarea" id="{`task-${i}`}" name="task" bind:value="{description}" required></textarea></div>
          </div>

          <!-- Text input-->
          <div class="field mb-5">
            <label class="label" for="{`answer-${i}`}">Answer {i + 1}</label>
            <div class="control">
              <input id="{`answer-${i}`}" name="answer" type="text" placeholder="placeholder" class="input" bind:value="{answer[i]}" required />
              <p class="help">Add answer {i + 1}</p>
            </div>
          </div>
        {/each}
      {:else}
        <div class="field mb-5">
          <label class="label" for="task">Enter description</label>
          <div class="control"><textarea class="textarea" id="task" name="task" bind:value="{description[0]}" required></textarea></div>
        </div>

        <h1 class="title is-5">Params</h1>
        {#if params !== null && params}
          {#each params as param, i (i)}
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <label for="{`params-${i}`}"></label>
                    <input id="{`params-${i}`}" class="input" type="text" placeholder="Param" bind:value="{param.name}" required />
                  </p>
                </div>
                <div class="field">
                  <p class="control is-expanded"><label> <input class="input" type="number" placeholder="Min" bind:value="{param.min}" /> </label></p>
                </div>
                <div class="field">
                  <p class="control is-expanded"><label> <input class="input" type="number" placeholder="Max" bind:value="{param.max}" /> </label></p>
                </div>
              </div>
            </div>
          {/each}
        {/if}

        <!-- Button -->
        <div class="field is-grouped mb-5">
          <div class="control"><button class="button is-primary" on:click|preventDefault="{addParamField}">Add param</button></div>
          {#if params}
            <div class="control"><button class="button is-danger" on:click|preventDefault="{removeParamField}">Remove param</button></div>
          {/if}
        </div>

        <!-- Text input-->
        <div class="field mb-5">
          <label class="label" for="answer">Answer</label>
          <div class="control">
            <input id="answer" name="answer" type="text" placeholder="placeholder" class="input" bind:value="{answer[0]}" required />
            <p class="help">Add answer</p>
          </div>
        </div>
      {/if}

      {#if !calculated}
        <!-- Button -->
        <div class="field is-grouped mb-5">
          <div class="control"><button class="button is-primary" on:click|preventDefault="{addField}">Add variant</button></div>
          {#if fields.length > 1}
            <div class="control"><button class="button is-danger" on:click|preventDefault="{removeField}">Remove variant</button></div>
          {/if}
        </div>
      {/if}

      <hr />
      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button
            id="submit"
            name="submit"
            type="submit"
            class="button is-success"
            disabled="{disabled}">{themeData === null ? 'Add theme' : 'save'}</button>
          {#if taskCreated}
            <p transition:fade="{{ duration: 250 }}" class="help has-text-success is-size-3">Task added!</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .edit-window {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-height: 800px;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
  }

  form {
    overflow-y: scroll;
    width: 100%;
    padding: 0 0 0 10px;
  }
</style>
