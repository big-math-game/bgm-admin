<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { generateTasksForTheme, getThemeList } from '../services/api-requests/api-requests'
  import { themesList } from '../store/store'

  let theme: string = ''
  let helpMessage: boolean = false
  let helpText: string = ''
  let error = false

  const submitHandler = async () => {
    const res = await generateTasksForTheme(theme)
    if (res.result) {
      error = false
      helpText = `Generated ${res.result} Tasks`
      theme = ''
      helpMessage = true
      setTimeout(() => {
        helpMessage = false
      }, 2000)
    } else {
      helpMessage = true
      error = true
      helpText = res.error
    }
  }

  onMount(async () => {
    themesList.set(await getThemeList())
  })
</script>

<svelte:head>
  <title>Generate tasks</title>
</svelte:head>

<h3 class="title is-3">Generate tasks</h3>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
  <fieldset class="fieldset mr-2">
    <!-- Select Basic -->
    <div class="field is-horizontal">
      <div class="field">
        <label class="label" for="topic">Select theme</label>
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

    <!-- Button -->
    <div class="field mb-5">
      <label class="label" for="submit"></label>
      <div class="control">
        <button id="submit" name="submit" type="submit" class="button is-success">Submit</button>
        {#if helpMessage}
          <p transition:fade="{{ duration: 250 }}" class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">{helpText}</p>
        {/if}
      </div>
    </div>
  </fieldset>
</form>
