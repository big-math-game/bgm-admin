<script lang="ts">
  import type { taskTemplate } from '../../types/tasks.type'
  import Id from '../../services/randomUID'
  import { fade } from 'svelte/transition'
  import { modifyTemplate } from '../../services/api-requests/api-requests'

  export let close: boolean = false
  export let themes = []
  export let selectedTask: taskTemplate = { theme_id: '', template: [''], answer: [''] }

  let taskSaved: boolean = false
  $: positionNumber = selectedTask.position.toString()
  $: themeId = selectedTask.theme_id
  $: theme = themeId
  $: position = positionNumber
  $: description = selectedTask.template
  $: params = selectedTask.params ? selectedTask.params : null
  $: answer = selectedTask.answer
  let image = selectedTask.image

  let disabled
  $: disabled = !theme && !description.length > 0 && !answer.length > 0

  let fields = [{ id: Id() }]
  const addField = () => {
    fields = [...fields, { id: Id() }]
    selectedTask.template = [...selectedTask.template, '']
  }

  const removeField = () => {
    fields.pop()
    fields = [...fields]
    selectedTask.template.pop()
    selectedTask.answer.pop()
    selectedTask.template = [...selectedTask.template]
  }
</script>

<div class="edit-window">
  <h3 class="title is-3">Edit task</h3>

  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit|preventDefault="{async () => {
      if (selectedTask.id && theme && description && answer && position) {
        const res = await modifyTemplate(selectedTask.id, theme, description, answer, Number(position))
        console.log(res)
        close = false
      }
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Select Basic -->
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="topic">Select theme</label>
          <div class="control">
            <div class="select">
              <select id="topic" name="topic" bind:value="{theme}" required>
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

      <!-- Button -->
      <div class="field is-grouped mb-5">
        <div class="control"><button class="button is-primary" on:click|preventDefault="{addField}">Add variant</button></div>
        {#if fields.length > 1}
          <div class="control"><button class="button is-danger" on:click|preventDefault="{removeField}">Remove variant</button></div>
        {/if}
      </div>

      <hr />

      <div class="field mb-5">
        <label class="label" for="image">Image url</label>
        <div class="control">
          <input id="image" name="answer" type="text" placeholder="image url" class="input" bind:value="{image}" />
          <p class="help">Add image url</p>
        </div>
      </div>

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
            disabled="{disabled}">{themes === null ? 'Add theme' : 'save'}</button>
          {#if taskSaved}
            <p transition:fade="{{ duration: 250 }}" class="help has-text-success is-size-3">Task saved!</p>
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
