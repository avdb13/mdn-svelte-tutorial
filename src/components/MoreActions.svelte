<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TodoType } from "../types/todo.type";

  const dispatch = createEventDispatcher();

  export let todos: TodoType[];
  let completed = true;

  $: completedTodos = todos.filter(e => e.completed).length;

  const checkAll = () => {
    dispatch("checkAll", completed);
    completed = !completed;
  }

  const removeCompleted = () => {
    dispatch("removeCompleted");
  }
</script>

<div class="btn-group">
  <button
    type="button"
    class="btn btn__primary"
    on:click={checkAll}
    disabled={todos.length === 0}
  >
    {completed ? "Check" : "Uncheck"} all
  </button>
  <button
    type="button"
    class="btn btn__primary"
    on:click={removeCompleted}
    disabled={completedTodos === 0}
  >
    Remove completed
  </button>
</div>
