<script lang="ts">
  import { onMount } from 'svelte'
  import { getThemeList } from '../services/api-requests/api-requests'

  let tasksData = []
  let themeData = []

  onMount(async () => {
    themeData = await getThemeList()
  })
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="dashboard mr-3">
  <h3 class="title is-3">Статистика</h3>

  <div class="columns is-multiline">
    {#if themeData !== null}
      <div class="column is-3">
        <div class="box notification" style="height: 100%">
          <div class="heading">Всего бланков</div>
          <div class="title">{themeData.length}</div>
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
