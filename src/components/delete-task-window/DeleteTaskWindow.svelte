<script lang="ts">
  export let close: boolean = false
  //export let tasksData
  //export let taskIndex: number
</script>

<div class="delete-window">
  <h1 class="title-text">Delete task?</h1>
  <div class="buttons">
    <button
      class="button is-danger"
      on:click="{() => {
        console.log('del')
        close = false
      }}">Yes</button>
    <button
      class="button is-primary"
      on:click="{() => {
        close = false
      }}">No</button>
  </div>
</div>

<style>
  .delete-window {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    background: #ffffff;
    border-radius: 10px;
  }

  .title-text {
    font-size: 25px;
    font-family: sans-serif;
    margin: 0 0 10px 0;
  }
</style>
