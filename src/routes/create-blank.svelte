<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createTheme } from '../services/api-requests/api-requests'
  import { goto } from '@sapper/app'

  let name: string = ''
  let description: string = ''
  let error: boolean = false
</script>

<svelte:head>
  <title>Добавить тему</title>
</svelte:head>

<h3 class="title is-3">Добавить бланк</h3>

<div class="theme-edit-window">
  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit|preventDefault="{async () => {
      if (name && description) {
        const res = await createTheme(name, description)
        if (res.result) {
          name = ''
          description = ''
          goto(`blanks/${res.result.name}`)
        } else {
          error = true
        }
      }
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="theme-name">Имя бланка</label>
        <div class="control">
          <input id="theme-name" name="answer" type="text" placeholder="Введите имя бланка" class="input" bind:value="{name}" required />
        </div>
      </div>

      <!-- Textarea -->
      <div class="field mb-5">
        <label class="label" for="theme-description">Описание бланка</label>
        <div class="control">
          <textarea
            class="textarea"
            id="theme-description"
            name="task"
            placeholder="Введите описание бланка"
            bind:value="{description}"
            required></textarea>
        </div>
      </div>

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button id="submit" name="submit" type="submit" class="button is-success">Добавить бланк</button>
          {#if error}
            <p transition:fade="{{ duration: 250 }}" class="help has-text-danger is-size-3">Ошибка при создании нового бланка. Попробуйте ещё раз.</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
</div>
