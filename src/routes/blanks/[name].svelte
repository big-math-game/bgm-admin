<script context="module">
  import { url } from '../../requestsUrl'
  import Id from '../../services/randomUID'

  export async function preload({ params }) {
    const { name } = params

    const resTheme = await this.fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        method: 'MathAdminAPI.GetThemeList',
        params: [{}],
        id: Id()
      })
    })

    const themesData = await resTheme.json()
    const themeId = themesData.result.find((item) => item.name === name)

    const res = await this.fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        method: 'MathAdminAPI.GetTheme',
        params: [{ theme_id: themeId.id }],
        id: Id()
      })
    })

    const blankData = await res.json()
    const urlName = name
    return { blankData, urlName }
  }
</script>

<script>
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  import { templateList, blank } from '../../store/store'
  import { getTemplateList, getThemeList, modifyTheme } from '../../services/api-requests/api-requests'
  import Modal from '../../components/common/modal/Modal.svelte'
  import CreateTemplate from '../../components/create-template/CreateTemplate.svelte'

  export let blankData = { result: {} }
  export let urlName
  let blanks = []
  // let helpMessage = false;
  // let helpText = '';
  let error = false

  const { id, name, description } = blankData.result ? blankData.result : {}

  // let selectedTask = {};
  let templateWindow = false
  let inputName = ''
  let inputDescription = ''

  /*
  const generateTasks = async () => {
    const res = await generateTasksForTheme(id);
    if (res.result) {
      error = false;
      helpText = `Сгенерировано ${res.result} задач`;
      helpMessage = true;
      setTimeout(() => {
        helpMessage = false;
      }, 2000);
      blank.set(await getTheme(id));
    } else {
      helpMessage = true;
      error = true;
      helpText = res.error;
    }
  };
   */

  onMount(async () => {
    templateList.set(await getTemplateList(id))
    blanks = await getThemeList()
    blank.set(blanks.find((item) => item.name === urlName))
    inputName = $blank.name
    inputDescription = $blank.description

    console.log($templateList)
  })
</script>

<a class="button is-link mb-3" href="blanks"> <span class="icon is-small"> <i class="fas fa-chevron-left"></i> </span> <span>Назад</span> </a>

{#if $blank.id}
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <h1 class="title">Бланк: {$blank.name}</h1>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item"><button class="button is-primary">Опубликовать</button></div>
      <div class="level-item">
        <button
          on:click="{() => {
            templateWindow = true
          }}"
          class="button is-primary">Создать шаблон задачи</button>
      </div>
    </div>
  </div>

  <form
    class="form-horizontal"
    enctype="multipart/form-data"
    on:submit|preventDefault="{async () => {
      if (blankData.id && inputName) {
        if (inputName !== $blank.name) {
          const res = await modifyTheme($blank.id, inputName)
          if (res) {
            goto(`blanks/${inputName}`)
            window.location.reload()
          }
        }
      }
    }}">
    <fieldset class="fieldset mr-2">
      <!-- Text input-->
      <div class="field mb-5">
        <label class="label" for="theme-name">Имя бланка</label>
        <div class="control">
          <input id="theme-name" name="answer" type="text" placeholder="Введите имя шаблона" class="input" bind:value="{inputName}" required />
        </div>
      </div>

      <!-- Textarea
      <div class="field mb-5">
        <label class="label" for="theme-description">Описание бланка</label>
        <div class="control">
          <textarea
            class="textarea"
            id="theme-description"
            name="task"
            placeholder="Введите описание бланка"
            bind:value="{inputDescription}"
            required></textarea>
        </div>
      </div>
      -->

      {#if inputName !== $blank.name || inputDescription !== $blank.description}
        <!-- Button -->
        <div class="field mb-5">
          <label class="label" for="submit"></label>
          <div class="control"><button id="submit" name="submit" type="submit" class="button is-success">Сохранить</button></div>
        </div>
      {/if}
    </fieldset>
  </form>
{:else}
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <h1 class="title is-size-3 has-text-danger">Добавьте шаблоны задач! для бланка {$blank.name}</h1>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button
          on:click="{() => {
            templateWindow = true
          }}"
          class="button is-primary">Создать шаблон задачи</button>
      </div>
    </div>
  </div>
{/if}

{#if $blank.id}
  <hr />

  <h3 class="title is-3">Шаблоны задач бланка</h3>

  <div class="table-container">
    <table class="table is-bordered">
      <thead>
        <tr>
          <!--        <th title="Task id"><abbr title="Id">Id</abbr></th>-->
          <!--        <th title="Theme"><abbr>Theme Id</abbr></th>-->
          <th title="Позиция"><abbr>Позиция</abbr></th>
          <th title="Содержание"><abbr>Содержание</abbr></th>
        </tr>
      </thead>

      {#if $templateList}
        <tbody>
          {#each $templateList as task, i (task.id)}
            <tr
              class="theme-link"
              on:click="{() => {
                goto(`blanks/${name}/${task.id}`)
              }}">
              <!--            <th><a class="theme-link" href="{`blanks/${id}/${task.id}`}">{task.id}</a></th>-->
              <!--            <th><a class="theme-link" href="{`blanks/${id}/${task.id}`}">{task.theme_id}</a></th>-->
              <th>{task.position}</th>
              <th>{task.template[0]}</th>
              <!--            <td-->
              <!--              class="button is-primary is-small ml-2 mt-1"-->
              <!--              on:click="{async () => {-->
              <!--                  selectedTask = await getTemplate(task.id)-->
              <!--                  editTaskWindow = true-->
              <!--                }}">-->
              <!--              <span class="icon"> <i class="fas fa-lg fa-edit"></i> </span>-->
              <!--            </td>-->
              <!--<td-->
              <!--class="button is-danger button-delete is-small ml-2 mt-1"-->
              <!--on:click="{() => {-->
              <!--deleteTaskWindow = true-->
              <!--}}">-->
              <!--<span class="icon"> <i class="fas fa-times"></i> </span>-->
              <!--</td>-->
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
{/if}

{#if templateWindow}
  <Modal bind:active="{templateWindow}">
    <CreateTemplate blank="{$blank}" />
  </Modal>
{/if}

<style>
  abbr {
    text-decoration: none;
  }

  .theme-link {
    cursor: pointer;
  }

  .theme-link:hover {
    background: #e3e3e3;
  }
</style>
