<script lang="ts">
  import { onMount } from 'svelte'
  import Id from '../services/randomUID.ts'
  import type { themeList } from '../types/tasks.type'
  import { fade } from 'svelte/transition'
  import { createTemplate, getThemeList } from '../services/api-requests/api-requests'

  let themeData: themeList[] = []
  let taskCreated: boolean = false
  let id: string = Id()
  let theme: string = ''
  let description: string[] = []
  let image: string = ''
  let answer: string[] = []
  let helpText: string = ''
  let error = false
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

  const submitHandler = async () => {
    const res = await createTemplate(theme, description, answer, image)
    if (res.result) {
      taskCreated = true
      error = false
      helpText = 'Task added!'
      theme = ''
      description = []
      answer = []
      fields = [{ id: Id() }]
      setTimeout(() => {
        taskCreated = false
        helpText = ''
      }, 2000)
    } else {
      taskCreated = true
      error = true
      helpText = res.error
    }
  }

  onMount(async () => {
    themeData = await getThemeList()
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

    {#each fields as field, i (field.id)}
      <!-- Textarea -->
      <div class="field mb-5">
        <label class="label" for="{`task-${i}`}">Enter description {i + 1}</label>
        <div class="control">
          <textarea class="textarea" id="{`task-${i}`}" name="task" bind:value="{description[i]}" required placeholder="description"></textarea>
        </div>
      </div>

      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="{`answer-${i}`}">Answer {i + 1}</label>
        <div class="control">
          <input id="{`answer-${i}`}" name="answer" type="text" placeholder="answer" class="input" bind:value="{answer[i]}" required />
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
          disabled="{disabled}">{themeData === null ? 'Add theme' : 'submit'}</button>
        {#if taskCreated}
          <p transition:fade="{{ duration: 250 }}" class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">{helpText}</p>
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
