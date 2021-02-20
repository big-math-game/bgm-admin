<script lang="ts">
  import { onMount } from 'svelte'

  let tasksData = []
  let themeData = []

  let date = new Date().toISOString().split('T')[1].split('.')[0]

  onMount(() => {
    tasksData = JSON.parse(localStorage.getItem('task'))
    themeData = JSON.parse(localStorage.getItem('theme'))

    console.log(location.host)

    setInterval(() => {
      date = new Date().toISOString().split('T')[1].split('.')[0]
    }, 1000)
  })
  // let topic = ''
  // let filteredTasks = []
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="dashboard mr-3">
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <div class="title has-text-primary">Dashboard</div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item"><button type="button" class="button is-small">{date}</button></div>
    </div>
  </div>

  <div class="columns is-multiline">
    {#if tasksData !== null}
      <div class="column is-3">
        <div class="box notification" style="height: 100%">
          <div class="heading">Total tasks</div>
          <div class="title">{tasksData.length}</div>
        </div>
      </div>

      <!--      <div class="column">-->
      <!--        <div class="box notification">-->
      <!--          <div class="title">Topic</div>-->
      <!--          {#if themeData !== null}-->
      <!--            <div class="select mb-3">-->
      <!--              <label>-->
      <!--                <select-->
      <!--                  bind:value="{topic}"-->
      <!--                  on:change="{() => {-->
      <!--                    filteredTasks = [...tasksData.filter((task) => task.theme_id === topic)]-->
      <!--                  }}">-->
      <!--                  <option selected disabled></option>-->
      <!--                  {#each themeData as topic (topic.id)}-->
      <!--                    <option value="{topic.id}">{topic.theme}</option>-->
      <!--                  {/each}-->
      <!--                </select>-->
      <!--              </label>-->
      <!--            </div>-->
      <!--          {/if}-->

      <!--          <div class="level">-->
      <!--            <div class="level-item">-->
      <!--              <div>-->
      <!--                <div class="heading">Total tasks</div>-->
      <!--                <div class="title is-5">{filteredTasks.length}</div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="level-item">-->
      <!--              <div>-->
      <!--                <div class="heading">Easy task</div>-->
      <!--                <div class="title is-5">{filteredTasks.filter((task) => task.difficulty === 0).length}</div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="level-item">-->
      <!--              <div>-->
      <!--                <div class="heading">Normal task</div>-->
      <!--                <div class="title is-5">{filteredTasks.filter((task) => task.difficulty === 1).length}</div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="level-item">-->
      <!--              <div>-->
      <!--                <div class="heading">Hard task</div>-->
      <!--                <div class="title is-5">{filteredTasks.filter((task) => task.difficulty === 2).length}</div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    {/if}
  </div>
</div>
