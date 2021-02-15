<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createTheme } from '../services/api-requests/api-requests'

  let name: string = ''
  let description: string = ''
  let themeCreated: boolean = false
</script>

<svelte:head>
  <title>Добавить тему</title>
</svelte:head>

<h3 class="title is-3">Добавить тему</h3>

<div class="theme-edit-window">
  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit|preventDefault="{async () => {
      if (name && description) {
        const res = await createTheme(name, description)
        if (res) {
          themeCreated = true
          name = ''
          description = ''
          setTimeout(() => {
            themeCreated = false
          }, 2000)
        }
      }
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="theme-name">Имя темы</label>
        <div class="control">
          <input id="theme-name" name="answer" type="text" placeholder="Имя темы" class="input" bind:value="{name}" required />
        </div>
      </div>

      <hr />

      <!-- Textarea -->
      <div class="field mb-5">
        <label class="label" for="theme-description">Описание темы</label>
        <div class="control">
          <textarea class="textarea" id="theme-description" name="task" placeholder="Описание темы" bind:value="{description}" required></textarea>
        </div>
      </div>

      <hr />

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button id="submit" name="submit" type="submit" class="button is-success">Добавить тему</button>
          {#if themeCreated}
            <p transition:fade="{{ duration: 250 }}" class="help has-text-success is-size-3">Theme created!</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
</div>
