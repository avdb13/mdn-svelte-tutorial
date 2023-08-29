<script lang="ts">
  import type { TodoType } from "../types/todo.type";

  export let todos: TodoType[];
  let headingElem: HTMLElement;

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter(e => e.completed).length;

  export const focus = () => {
    headingElem.focus();
  }
</script>

<h2 id="list-heading" bind:this={headingElem} tabindex="-1">
  {completedTodos} out of {totalTodos} items completed
</h2>
