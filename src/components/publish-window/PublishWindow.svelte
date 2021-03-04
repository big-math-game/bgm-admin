<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createListsForAll, generateTasksForTheme } from '../../services/api-requests/api-requests'

  export let themeID: string = ''
  let listName: string = ''
  let helpMessage: boolean = false
  let helpText: string = ''
  let error = false

  const submitHandler = async () => {
    const genRes = await generateTasksForTheme(themeID)
    console.log(genRes.result)
    const res = await createListsForAll(themeID, listName)
    if (res.result) {
      console.log(res.result)
      window.location.reload()
    } else {
      helpMessage = true
      error = true
      helpText = res.error
    }
  }
</script>

<div class="publish-modal">
  <h3 class="title is-3">Опубликовать бланк</h3>

  <form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
    <fieldset class="fieldset mr-2">
      <!-- Select Basic
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="topic">Выберите тему</label>
          <div class="control">
            <div class="select">
              <select id="topic" name="topic" bind:value="{theme}" required>
                {#if $themesList}
                  <option selected disabled></option>
                  {#each $themesList as theme (theme.id)}
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

      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="task-list-name">Заголовок бланка</label>
        <div class="control">
          <input id="task-list-name" name="task-list-name" type="text" placeholder="заголовок" class="input" bind:value="{listName}" required />
        </div>
      </div>

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button id="submit" name="submit" type="submit" class="button is-success">Опубликовать</button>
          {#if helpMessage}
            <p transition:fade="{{ duration: 250 }}" class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">{helpText}</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .publish-modal {
    background: #ffffff;
    padding: 10px;
    border-radius: 10px;
    width: 500px;
  }
</style>
