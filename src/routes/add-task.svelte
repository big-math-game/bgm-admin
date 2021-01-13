<script lang="ts">
  // import Complexity from '../mocks/_complexity'
  import { joinCssClasses } from '../utils/utils'
  import { onMount } from 'svelte'
  import Id from '../services/randomUID.ts'
  import type { taskTemplate } from '../types/tasks.type'
  import { fade } from 'svelte/transition'

  let themeData = []
  let tasksData = []
  let active: boolean = false
  let taskCreated: boolean = false
  let calculated: boolean = false

  let id: string = Id()
  let theme: string = ''
  let difficulty = 0
  let position: string = '0'
  let description: string[] = []
  let params: [{ name: string; min: number; max: number }] | null = [{ name: '', min: 1, max: 1 }]
  // let image: string = ''
  // let answerOptions = [];
  // let taskHint = '';
  let answer: string[] = []
  // let solution = '';

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

  let paramsFields = [{ id: Id() }]
  const addParamField = () => {
    paramsFields = [...paramsFields, { id: Id() }]
    params.push({ name: '', min: 1, max: 1 })
  }
  const removeParamField = () => {
    paramsFields.pop()
    paramsFields = [...paramsFields]
    params.pop()
    params = [...params]
  }

  const createTask = (theme: string, description: string[], params, difficulty: number, answer: string[], position: number): taskTemplate => {
    return {
      id: id,
      theme_id: theme,
      template: description,
      params: calculated ? params : null,
      answer: [answer.join(',')],
      difficulty: difficulty,
      position: position
    }
  }

  const submitHandler = () => {
    if (tasksData) {
      localStorage.setItem('task', JSON.stringify([...tasksData, createTask(theme, description, params, difficulty, answer, Number(position))]))
    } else {
      localStorage.setItem('task', JSON.stringify([createTask(theme, description, params, difficulty, answer, Number(position))]))
    }
    taskCreated = true
    theme = ''
    difficulty = 0
    position = '0'
    description = []
    answer = []
    fields = [{ id: Id() }]
    setTimeout(() => {
      taskCreated = false
    }, 2000)
  }

  onMount(() => {
    themeData = JSON.parse(localStorage.getItem('theme'))
    tasksData = JSON.parse(localStorage.getItem('task'))
  })
</script>

<svelte:head>
  <title>Add tasks</title>
</svelte:head>

<h3 class="title is-3">Added task</h3>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
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
                localStorage.setItem('theme', JSON.stringify(themeData === null ? [{ id: id, theme: theme }] : [...themeData, { id: id, theme: theme }]))
                active = !active
                themeData = JSON.parse(localStorage.getItem('theme'))
              }}">
              save
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    <hr />
     Select Basic
    <div class="field mb-5">
      <label class="label" for="complexity">Select complexity</label>
      <div class="control">
        <div class="select">
          <select id="complexity" name="complexity" bind:value="{difficulty}">
            {#each Complexity as ComplexityItem (ComplexityItem.id)}
              <option value="{ComplexityItem.value}">{ComplexityItem.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    -->

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
      {#each fields as field, i (field.id)}
        <!-- Textarea -->
        <div class="field mb-5">
          <label class="label" for="{`task-${i}`}">Enter description {i + 1}</label>
          <div class="control"><textarea class="textarea" id="{`task-${i}`}" name="task" bind:value="{description[i]}" required></textarea></div>
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

      <label class="label" for="params">Params</label>
      {#each paramsFields as paramsField, i (paramsField.id)}
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input id="params" class="input" type="text" placeholder="Param" bind:value="{params[i].name}" required />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded"><label> <input class="input" type="number" placeholder="Min" bind:value="{params[i].min}" /> </label></p>
            </div>
            <div class="field">
              <p class="control is-expanded"><label> <input class="input" type="number" placeholder="Max" bind:value="{params[i].max}" /> </label></p>
            </div>
          </div>
        </div>
      {/each}

      <!-- Button -->
      <div class="field is-grouped mb-5">
        <div class="control"><button class="button is-primary" on:click|preventDefault="{addParamField}">Add param</button></div>
        {#if paramsFields.length > 1}
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

    <!-- File Button
    <label class="label" for="imageFile">Added image</label>
    <div class="file">
      <label class="file-label">
        <input
          id="imageFile"
          class="file-input"
          type="file"
          name="imageFile"
          bind:files="{image}"
          onchange="if (this.files.length > 0) document.getElementById('filename-imageFile').innerHTML = this.files[0].name; image = this.files[0]" />
        <span class="file-cta">
          <span class="file-icon"> <i class="fa fa-upload"></i> </span>
          <span class="file-label" id="filename-imageFile"> Choose a file… </span>
        </span>
      </label>
    </div>
    -->

    <!-- Prepended text
    <label class="label" for="answerOptions">Answer options</label>
    {#each fields as field, i (field.id)}
      <div class="field has-addons">
        <div class="control">
          <input id="answerOptions" name="answerOptions" class="input " placeholder="placeholder" type="text" required
                 bind:value={answerOptions[i]}>
        </div>
        {#if fields.length > 2}
          <div class="control">
            <a class="button is-danger"
               on:click|preventDefault={()=>{if (fields.length > 2) fields.splice(i, 1); fields = fields}}>
              delete
            </a>
          </div>
        {/if}
      </div>
      <p class="help mb-3">Add answer options from two or more</p>
    {/each}
    <button class="button is-primary mb-5" on:click|preventDefault={handleClick}>Add answer option</button>
     -->

    <!-- Textarea
    <div class="field">
      <label class="label" for="taskHint">Task hint</label>
      <div class="control">
        <textarea class="textarea" id="taskHint" name="solution" bind:value={taskHint}></textarea>
      </div>
    </div>
    -->

    <!-- Textarea
    <div class="field mb-5">
      <label class="label" for="solution">Solution</label>
      <div class="control">
        <textarea class="textarea" id="solution" name="solution" bind:value={solution}></textarea>
      </div>
    </div>
    -->

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
          disabled="{disabled}">{themeData === null ? 'Add theme' : 'submit'}</button>
        {#if taskCreated}
          <p transition:fade="{{ duration: 250 }}" class="help has-text-success is-size-3">Task added!</p>
        {/if}
      </div>
    </div>
  </fieldset>
</form>

<style>
  .fieldset {
    padding: 0;
  }

  @media (min-width: 1025px) {
    .fieldset {
      padding: 0 300px 0 0;
    }
  }
</style>
