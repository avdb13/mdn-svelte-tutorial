<script lang="ts">
  import { selectOnFocus } from '../actions';

  import type { TodoType } from '../types/todo.type';
  import { createEventDispatcher } from 'svelte';

  export let todo: TodoType;

  const dispatch = createEventDispatcher();

  let editing = false;
  let name = todo.name;
  let nameElem: HTMLElement;
  let editButtonPressed = false;

  const update = (updatedTodo: Partial<TodoType>) => {
    todo = {...todo, ...updatedTodo};
    dispatch("update", todo);
  }

  const onCancel = () => {
    name = todo.name;
    editing = false;
  }

  const onSave = () =>{
    update({ name });
    editing = false;
  }

  const onRemove = () => {
    dispatch("remove", todo);
    editing = false;
  }

  const onEdit = () => {
    editButtonPressed = true;
    editing = true;
  }

  const focusEditingButton = (node: HTMLElement) => {
    editButtonPressed && node.focus();
  }

  const onToggle = () => {
    update({ completed: !todo.completed });
  }
</script>

<div class="stack-small">
  {#if editing}
    <form
      on:submit|preventDefault={onSave}
      class="stack-small"
      on:keydown={(e) => e.key === 'Escape' && onCancel()}
    >
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label">
          New name for '{todo.name}'
        </label>
        <input
          use:selectOnFocus
          bind:value={name}
          bind:this={nameElem}
          type="text"
          id="todo-{todo.id}"
          autocomplete="off"
          class="todo-text"
        />
      </div>
    </form>
    <div class="btn-group">
      <button
        class="btn todo-cancel"
        type="button"
        on:click={onCancel}
      >
        Cancel
        <span class="visually-hidden">{todo.name}</span>
      </button>
      <button
        class="btn btn__primary todo-edit"
        type="submit"
        disabled={!name}
        on:click={onSave}
      >
        Save
        <span class="visually-hidden">{todo.name}</span>
      </button>
    </div>
  {:else}
    <div class="c-cb">
      <input
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed}
      />
      <label for="todo-{todo.id}" class="todo-label">
        {todo.name}
      </label>
    </div>
    <div class="btn-group">
      <button
        type="button"
        class="btn"
        on:click={onEdit}
        use:selectOnFocus
        use:focusEditingButton
      >
        Edit
        <span class="visually-hidden">{todo.name}</span>
      </button>
      <button type="button" class="btn btn__danger" on:click={onRemove}>
        Delete
        <span class="visually-hidden">{todo.name}</span>
      </button>
    </div>
  {/if}
</div>
