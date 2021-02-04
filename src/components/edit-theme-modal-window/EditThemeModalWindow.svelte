<script lang="ts">
  import { modifyTheme } from '../../services/api-requests/api-requests'

  export let close: boolean = false
  export let themeData = { id: '', name: '', description: '' }
  let name = themeData.name
  let description = themeData.description
</script>

<div class="theme-edit-window">
  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit="{async () => {
      if (themeData.id && name && description) {
        const res = await modifyTheme(themeData.id, name, description)
        console.log(res)
        close = false
      }
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="theme-name">Theme name</label>
        <div class="control">
          <input id="theme-name" name="answer" type="text" placeholder="theme name" class="input" bind:value="{name}" required />
        </div>
      </div>

      <hr />

      <!-- Textarea -->
      <div class="field mb-5">
        <label class="label" for="theme-description">Enter description</label>
        <div class="control">
          <textarea
            class="textarea"
            id="theme-description"
            name="task"
            placeholder="theme description"
            bind:value="{description}"
            required></textarea>
        </div>
      </div>

      <hr />

      <!-- Button -->
      <div class="field mb-5">
        <label class="label" for="submit"></label>
        <div class="control"><button id="submit" name="submit" type="submit" class="button is-success">Save </button></div>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .theme-edit-window {
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
