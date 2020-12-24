<script lang="ts">
  import { goto } from '@sapper/app.mjs';
  import Complexity from '../mocks/_complexity';
  import { joinCssClasses } from '../utils/utils';
  import {onMount} from "svelte";

  let topicsData = []
  let tasksData = []

  onMount(() => {
      tasksData = JSON.parse(localStorage.getItem('task'));
      topicsData = JSON.parse(localStorage.getItem('topic'));
  })

  let active = false;

  function getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const randomID = `${getRandomIntInclusive(1, 10000000)}-${getRandomIntInclusive(1, 100000000)}`;

  let id = randomID;
  let topic = '';
  let complexity = 'easy';
  let listNumber = '1';
  let task = '';
  let image = '';
  let video = '';
  let answerOptions = [];
  let taskHint = '';
  let answer = '';
  let solution = '';

  const submitHandler = () => {
    if (tasksData) {
      localStorage.setItem('task', JSON.stringify([
        ...tasksData,
        { id, topic, complexity, listNumber, task, image, video, answerOptions, taskHint, answer, solution }]));
    } else (
      localStorage.setItem('task', JSON.stringify([
        {
          id: id,
          topic: topic,
          complexity: complexity,
          listNumber: listNumber,
          task: task,
          image: image,
          video: video,
          answerOptions: answerOptions,
          taskHint: taskHint,
          answer: answer,
          solution: solution,
        }]))
    );
    goto('/tasks');
  };

  let fields = [{ id: '1' }, { id: '2' }];
  const handleClick = () => {
    fields = [...fields, { id: randomID }];
  };
</script>

<svelte:head>
  <title>Add tasks</title>
</svelte:head>

<form class="form-horizontal" enctype="multipart/form-data" on:submit|preventDefault={submitHandler}>
  <fieldset class="fieldset mr-2">

    <!-- Select Basic -->
    <div class="field is-horizontal">
      <div class="field">
        <label class="label" for="topic">Select topic</label>
        <div class="control">
          <div class="select">
            <select id="topic" name="topic" bind:value={topic} required>
              {#if topicsData}
                <option selected disabled></option>
                {#each topicsData as topic (topic.id)}
                  <option value={topic.topic}>{topic.topic}</option>
                {/each}
              {:else}
                <option disabled>add topic</option>
              {/if}
            </select>
          </div>
          {#if !active}
            <button class="button is-primary" on:click|preventDefault={()=> active = !active}>Add topic</button>
          {/if}
        </div>
      </div>

      <div class={ joinCssClasses("field", !active ? "is-invisible" : "") }>
        <label class="label" for="addTopic">Add topic</label>
        <div class="field has-addons">
          <div class="control">
            <input id="addTopic" name="answerOptions" class="input " placeholder="placeholder" type="text"
                   bind:value={topic}>
          </div>
          <div class="control">
            <a class="button is-success"
               on:click|preventDefault={()=>{localStorage.setItem('topic', JSON.stringify(
                 topicsData === null ? [{ id: randomID, topic: topic }] :
                  [...topicsData, { id: randomID, topic: topic }])); active=!active; topicsData = JSON.parse(localStorage.getItem('topic'))}}>
              save
            </a>
          </div>
        </div>
      </div>
    </div>


    <!-- Select Basic -->
    <div class="field mb-5">
      <label class="label" for="complexity">Select complexity</label>
      <div class="control">
        <div class="select">
          <select id="complexity" name="complexity" bind:value={complexity}>
            {#each Complexity as ComplexityItem (ComplexityItem.id)}
              <option value={ComplexityItem.id}>{ComplexityItem.id}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Select Basic -->
    <div class="field mb-5">
      <label class="label" for="listNumber">Select list number</label>
      <div class="control">
        <div class="select">
          <select id="listNumber" name="listNumber" bind:value={listNumber}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Textarea -->
    <div class="field mb-5">
      <label class="label" for="task">Enter task</label>
      <div class="control">
        <textarea class="textarea" id="task" name="task" bind:value={task} required></textarea>
      </div>
    </div>

    <!-- File Button -->

    <label class="label" for="imageFile">Added image</label>
    <div class="file">
      <label class="file-label">
        <input id="imageFile" class="file-input" type="file" name="imageFile" bind:files={image}
               onchange="if (this.files.length > 0) document.getElementById('filename-imageFile').innerHTML = this.files[0].name; image = this.files[0]">
        <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label" id="filename-imageFile">
        Choose a file…
      </span>
    </span>
      </label>
    </div>
    <!-- File Button -->

    <label class="label">Added video</label>
    <div class="file mb-5">
      <label class="file-label">
        <input class="file-input" type="file" name="videoFile" bind:files={video}
               onchange="if (this.files.length > 0) document.getElementById('filename-videoFile').innerHTML = this.files[0].name; video = this.files[0]">
        <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label" id="filename-videoFile">
        Choose a file…
      </span>
    </span>
      </label>
    </div>

    <!-- Prepended text-->
    <label class="label" for="answerOptions">Answer options</label>
    {#each fields as field, i (field.id)}
      <div class="field has-addons">
        <div class="control">
          <input id="answerOptions" name="answerOptions" class="input " placeholder="placeholder" type="text" required
                 bind:value={answerOptions[i]}>
        </div>
        {#if fields.length > 2}
          <div class="control">
            <a class="button is-danger"
               on:click|preventDefault={()=>{if (fields.length > 2) fields.splice(i, 1); fields = fields}}>
              delete
            </a>
          </div>
        {/if}
      </div>
      <p class="help mb-3">Add answer options from two or more</p>
    {/each}
    <button class="button is-primary mb-5" on:click|preventDefault={handleClick}>Add answer option</button>

    <!-- Textarea -->
    <div class="field">
      <label class="label" for="taskHint">Task hint</label>
      <div class="control">
        <textarea class="textarea" id="taskHint" name="solution" bind:value={taskHint}></textarea>
      </div>
    </div>

    <!-- Text input-->
    <div class="field mb-5">
      <label class="label" for="answer">Answer</label>
      <div class="control">
        <input id="answer" name="answer" type="text" placeholder="placeholder" class="input" bind:value={answer}
               required>
        <p class="help">Add answer</p>
      </div>
    </div>

    <!-- Textarea -->
    <div class="field mb-5">
      <label class="label" for="solution">Solution</label>
      <div class="control">
        <textarea class="textarea" id="solution" name="solution" bind:value={solution}></textarea>
      </div>
    </div>

    <!-- Button -->
    <div class="field mb-5">
      <label class="label" for="submit"></label>
      <div class="control">
        <button id="submit" name="submit" type="submit" class="button is-success"
                disabled={topicsData === null}>{ topicsData === null ? "Add topic" : "submit"}</button>
      </div>
    </div>

  </fieldset>
</form>

<style>
    .fieldset {
        padding: 0;
    }

    @media (min-width: 1025px) {
        .fieldset {
            padding: 0 300px 0 0;
        }
    }
</style>
