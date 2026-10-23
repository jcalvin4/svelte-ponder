<script lang="ts">
let {
    label,
    value = $bindable(),
    type = "text"
  }: {
    label: string;
    value: string;
    type?: "text" | "email" | "textarea";
  } = $props();

let isEditing: boolean = $state(false);
let originalValue: string = value;
let buttonRef: HTMLButtonElement | undefined = $state();

 function startEdit() {
    originalValue = value;
    isEditing = true;
  }

  function commitEdit() {
    isEditing = false;
    buttonRef?.focus();
  }

  function cancelEdit() {
    value = originalValue;
    isEditing = false;
    buttonRef?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitEdit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit();
    }
  }
</script>

<div class="field">
    <div class="label">{label}</div>
    {#if isEditing}
      {#if type === "textarea"}
        <textarea bind:value aria-label={label} autofocus onblur={commitEdit} onkeydown={handleKeyDown}></textarea>
      {:else}
        <input {type} bind:value aria-label={label} autofocus onblur={commitEdit} onkeydown={handleKeyDown} />
    {/if}
    {:else}
      <button class="value" aria-label={`Edit ${label}`} onclick={startEdit} bind:this={buttonRef}>{value}</button>
    {/if}
</div>

<style>
  .field {
    margin-bottom: 1rem;
  }

  .label {
    font-size: 0.75rem;
    color: #666;
  }

  .value {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    text-align: left;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .value:hover {
    background: #f5f5f5;
    text-decoration: underline;
  }
</style>