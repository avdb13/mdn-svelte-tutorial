<script lang="ts">
  import { selectOnFocus } from '../actions';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let autofocus = false;
  let name = '';
  let nameElem: HTMLElement;

  const addTodo = () => {
    dispatch('addTodo', name);
    name = '';
    nameElem.focus();
  }

  const onCancel = () => {
    name = ''
    nameElem.focus();
  };

  onMount(() => {
    autofocus && nameElem.focus()
  });

</script>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === 'Escape' && onCancel()}
>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">
      What needs to be done?
    </label>
  </h2>
  <input
    bind:value={name}
    bind:this={nameElem}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
  />
  <button
    type="submit"
    disabled={!name}
    class="btn btn__primary btn__lg"
  >
    Add
  </button>
</form>
