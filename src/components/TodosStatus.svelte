<script lang="ts">
  import type { TodoType } from "../types/todo.type";

  export let todos: TodoType[];

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter(e => e.completed).length;

  let headingElem: HTMLElement;

  export const focus = () => {
    headingElem.focus();
  }
</script>

<h2 id="list-heading" bind:this={headingElem} tabindex="-1">
  {completedTodos} out of {totalTodos} items completed
</h2>
