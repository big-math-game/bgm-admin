<script lang="ts">
    import Complexity from '../mocks/_complexity';
    import {onMount} from 'svelte';

    let topicsData = []
    let tasksData = []

    onMount(() => {
        tasksData = JSON.parse(localStorage.getItem('task'));
        topicsData = JSON.parse(localStorage.getItem('topic'));
    })

    let active = false;

    const handleChange = () => {
        active = !active;
    };

    let complexity = 'easy';
    let topic;

    // import Tasks from '../../mocks/_tasks';
    // import Topic from '../../mocks/_topics';
    //
    // localStorage.setItem('task', JSON.stringify(Tasks));
    // localStorage.setItem('topic', JSON.stringify(Topic));

</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<div class="mr-2">
  <h3 class="title is-3">Tasks topic</h3>

  <div class="level">
    <div class="level-left">
      <div class="level-item">

        {#if topicsData}
          <div class="select">
            <label>
              <select bind:value={topic}>
                <option value='all' selected>all</option>
                {#each topicsData as topic (topic.id)}
                  <option value={topic.topic}>{topic.topic}</option>
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
        <li class={item.id === complexity ? 'is-active' : '' } on:click={()=> complexity = item.id}><a>{item.name}</a>
        </li>
      {/each}
    </ul>
  </div>

  <h3 class="title is-3">Tasks</h3>

  <div class="table-container">
    <table class="table is-bordered">
      <thead>
      <tr>
        <th><abbr title="Topic">Topic</abbr></th>
        <th><abbr title="Complexity">Complexity</abbr></th>
        <th><abbr title="List Number">LN</abbr></th>
        <th><abbr title="Task">Task</abbr></th>
        <th><abbr title="Image">Image</abbr></th>
        <th><abbr title="Video">Video</abbr></th>
        <th><abbr title="Answer options">Answer options</abbr></th>
        <th><abbr title="Task hint">Task hint</abbr></th>
        <th><abbr title="Answer">Answer</abbr></th>
        <th><abbr title="Solution">Solution</abbr></th>
      </tr>
      </thead>

      {#if tasksData }
        <tbody>
        {#each tasksData as task, i (task.id)}
          {#if task.complexity === complexity && task.topic === topic || topic === 'all' && task.complexity ===
          complexity}
            <tr>
              {#if task.topic}
                <th>{task.topic}</th>
              {/if}
              {#if task.complexity}
                <th>{task.complexity}</th>
              {/if}
              {#if task.listNumber}
                <th>{task.listNumber}</th>
              {/if}
              {#if task.task}
                <th>{task.task}</th>
              {/if}
              {#if task.image}
                <th>{task.image}</th>
              {:else}
                <th></th>
              {/if}
              {#if task.video}
                <th>{task.video}</th>
              {:else}
                <th></th>
              {/if}
              {#if task.answerOptions.length > 0}
                <th>{task.answerOptions}</th>
              {/if}
              {#if task.taskHint}
                <th>{task.taskHint}</th>
              {:else}
                <th></th>
              {/if}
              {#if task.answer}
                <th>{task.answer}</th>
              {/if}
              {#if task.solution}
                <th>{task.solution}</th>
              {:else}
                <th></th>
              {/if}
              <span class="button is-danger button-delete is-small ml-2 mt-1"
                      on:click={
                  ()=>{
                    tasksData.splice(i, 1);
                    tasksData=tasksData;
                    localStorage.setItem('task', JSON.stringify(tasksData));
                  }
                  }
              >
                <span class="icon">
                <i class="fas fa-times"></i>
            </span>
              </span>
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
</style>
