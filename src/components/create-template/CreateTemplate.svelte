<script lang="ts">
  import Id from '../../services/randomUID.ts'
  // import type {themeList} from '../../types/tasks.type'
  import { fade } from 'svelte/transition'
  import { createTemplate } from '../../services/api-requests/api-requests'

  export let blank = false

  // let themeData: themeList[] = []
  let taskCreated: boolean = false
  let id: string = Id()
  // let theme: string = ''
  let description: string[] = []
  let image: string = ''
  let answer: string[] = []
  let helpText: string = ''
  let error = false

  let fields = [{ id: Id() }]
  const addField = () => {
    fields = [...fields, { id: Id() }]
  }

  const removeField = () => {
    fields.pop()
    fields = [...fields]
    description.pop()
    description = [...description]
    answer.pop()
    answer = [...answer]
  }

  const submitHandler = async () => {
    const res = await createTemplate(blank.id, description, answer, image)
    if (res.result) {
      window.location.reload()
    } else {
      taskCreated = true
      error = true
      helpText = res.error
    }
  }
</script>

<div class="create-template">
  {#if blank.name}
    <h3 class="title is-3">Создать шаблон задачи для бланка {blank.name}</h3>
  {:else}
    <h3 class="title is-3">Создать шаблон задачи</h3>
  {/if}

  <form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
    <fieldset class="fieldset">
      <!-- Select Basic
      <div class="field is-horizontal">
        <div class="field">
          <label class="label" for="topic">Выберите тему</label>
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
      -->

      <hr />

      {#each fields as field, i (field.id)}
        <!-- Textarea -->
        <div class="field mb-5">
          <label class="label" for="{`task-${i}`}">Описание задачи {i + 1}</label>
          <div class="control">
            <textarea class="textarea" id="{`task-${i}`}" name="task" bind:value="{description[i]}" required placeholder="Описание"></textarea>
          </div>
        </div>

        <!-- Text input-->
        <div class="field mb-5">
          <label class="label" for="{`answer-${i}`}">Ответ {i + 1}</label>
          <div class="control">
            <input id="{`answer-${i}`}" name="answer" type="text" placeholder="Ответ" class="input" bind:value="{answer[i]}" required />
          </div>
        </div>
      {/each}

      <!-- Button -->
      <div class="field is-grouped mb-5">
        <div class="control"><button class="button is-primary" on:click|preventDefault="{addField}">Добавить вариант</button></div>
        {#if fields.length > 1}
          <div class="control"><button class="button is-danger" on:click|preventDefault="{removeField}">Удалить вариант</button></div>
        {/if}
      </div>

      <hr />

      <div class="field mb-5">
        <label class="label" for="image">Ссылка на картинку</label>
        <div class="control"><input id="image" name="answer" type="text" placeholder="ссылка" class="input" bind:value="{image}" /></div>
      </div>

      <hr />

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control">
          <button id="submit" name="submit" type="submit" class="button is-success">Создать</button>
          {#if taskCreated}
            <p transition:fade="{{ duration: 250 }}" class="{`help ${error ? 'has-text-danger' : 'has-text-success'} is-size-3`}">{helpText}</p>
          {/if}
        </div>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .create-template {
    width: 600px;
    background: #ffffff;
    margin: 0 0 0 20px;
    border-radius: 10px;
    padding: 10px;
    overflow-y: scroll;
  }
</style>
