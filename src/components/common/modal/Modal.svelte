<script lang="ts">
  export let active: boolean = false
  const close = () => {
    active = false
  }
</script>

<div class="{`modal ${active ? 'is-active' : ''}`}">
  <div class="modal-background" on:click="{close}"></div>
  <div class="modal-content">
    <slot />
  </div>
  <button class="modal-close is-large" aria-label="close" on:click="{close}"></button>
</div>
