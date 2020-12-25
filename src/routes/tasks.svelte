<script lang="ts">
    import Complexity from '../mocks/_complexity';
    import {onMount} from 'svelte';

    let themeData = []
    let tasksData = []

    let difficulty = 0;
    let topic: string = 'all';

    onMount(() => {
        themeData = JSON.parse(localStorage.getItem('theme'));
        tasksData = JSON.parse(localStorage.getItem('task'));
    })
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<div class="mr-2">
  <h3 class="title is-3">Tasks topic</h3>

  <div class="level">
    <div class="level-left">
      <div class="level-item">

        {#if themeData}
          <div class="select">
            <label>
              <select bind:value={topic}>
                <option value='all' selected>all</option>
                {#each themeData as topic (topic.id)}
                  <option value={topic.id}>{topic.theme}</option>
                {/each}
              </select>
            </label>
          </div>
        {/if}

      </div>
    </div>
    <div class="level-right">
      <div class="level-item">

        <a href="add-task" class="button is-primary">add task</a>

      </div>
    </div>
  </div>

  <div class="tabs">
    <ul>
      {#each Complexity as item (item.id)}
        <li class={item.value === difficulty ? 'is-active' : '' } on:click={()=> difficulty = item.value}><a>{item.name}</a>
        </li>
      {/each}
    </ul>
  </div>

  <h3 class="title is-3">Tasks</h3>

  <div class="table-container">
    <table class="table is-bordered">
      <thead>
      <tr>
        <!-- <th><abbr title="Topic">Topic</abbr></th>-->
        <th><abbr title="Id">Id</abbr></th>
        <th><abbr title="Theme">Theme</abbr></th>
        <th><abbr title="Complexity">Difficulty</abbr></th>
        <th><abbr title="Position">Position</abbr></th>
        <th><abbr title="Description">Description</abbr></th>
        <th><abbr title="Image">Image</abbr></th>
        <th><abbr title="Answer">Answer</abbr></th>
      </tr>
      </thead>

      {#if tasksData }
        <tbody>
        {#each tasksData as task, i (task.id)}
          {#if (task.difficulty === difficulty && task.theme_id === topic) || (topic === 'all' && task.difficulty === difficulty)}
            <tr>
              <!--{#if task.topic}-->
              <!--  <th>{task.topic}</th>-->
              <!--{/if}-->
              <th>{task.id}</th>
              <th>{themeData.find(theme => theme.id === task.theme_id).theme}</th>
              <th>{task.difficulty}</th>
              <th>{task.position}</th>
              <th>{task.description}</th>
              {#if task.image !== undefined}
                <th>{task.image}</th>
              {/if}
              <th>{task.answer}</th>
              <td class="button is-danger button-delete is-small ml-2 mt-1"
                      on:click={
                  ()=>{
                    tasksData.splice(i, 1);
                    tasksData = [...tasksData];
                    localStorage.setItem('task', JSON.stringify(tasksData));
                  }
                  }
              >
                <span class="icon">
                <i class="fas fa-times"></i>
            </span>
              </td>
            </tr>
          {/if}
        {/each}
        </tbody>
      {/if}
    </table>
  </div>
</div>

<style>
    .table td, .table th {
        padding: 3px 5px;
        font-size: 11px;
    }

    @media (min-width: 1281px) {
        .table td, .table th {
            font-size: 15px;
        }
    }

    .table td {
        min-width: 40px;
    }

    abbr {
        text-decoration: none;
    }
</style>
