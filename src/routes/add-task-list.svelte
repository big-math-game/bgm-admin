<script lang="ts">
  import SearchInput from '../components/common/searcInput/SearchInput.svelte'
  import users from '../mocks/_users.js'
  const submitHandler = () => {
    console.log('lol')
  }
</script>

<svelte:head>
  <title>Add list</title>
</svelte:head>

<h3 class="title is-3">Added task list for player</h3>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault="{submitHandler}">
  <fieldset class="fieldset mr-2">
    <div class="field mb-5">
      <SearchInput items="{users}" searchProperties="{['login', 'email']}" />
    </div>
  </fieldset>
</form>
