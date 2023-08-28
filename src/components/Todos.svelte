<script lang="ts">
  import type { Todo } from '../types/todo.type';
  export let todos: Todo[];

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter(e => e.completed).length;

  function removeTodo(todo: Todo) {
    todos = todos.filter(t => t.id !== todo.id)
  }

  let newTodo: string = "";
  let newTodoId: number;

  $: {
    if (totalTodos === 0) {
      newTodoId = 1;
    } else {
      newTodoId = Math.max(...todos.map(t => t.id)) + 1;
    }
  }

  function addTodo() {
    todos = [...todos, { id: newTodoId, name: newTodo, completed: false }];
    newTodo = "";
  }

  let filter = "all";
  function filterTodos(filter: string, todos: Todo[]): Todo[] {
    if (filter === "active") {
      return todos.filter(t => !t.completed)
    }
    if (filter === "completed") {
      return todos.filter(t => t.completed)
    }

    return todos
  }


</script>

<h1>Svelte to-do list</h1>
<div class="todoapp stack-large">
  <form on:submit|preventDefault={addTodo}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg">What needs to be done?</label>
    </h2>
    <input bind:value={newTodo} type="text" id="todo-0" autocomplete="off" class="input input__lg" />
    <button type="submit" class="btn btn__lg btn__primary">
      Add
    </button>
  </form>

<div class="filters btn-group stack-exception">
  <button class="btn toggle-btn" class:btn__primary={filter === "all"} aria-pressed={filter === "all"} on:click={() => filter = "all"}>
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === "active"} aria-pressed={filter === "active"} on:click={() => filter = "active"}>
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  <button class="btn toggle-btn" class:btn__primary={filter === "completed"} aria-pressed={filter === "completed"} on:click={() => filter = "completed"}>
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>

<h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

<ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
  {#each filterTodos(filter, todos) as todo (todo.id)}
  <li class="todo">

    <div class="stack-small">
      <div class="c-cb">
        <input
          type="checkbox"
          id="todo-{todo.id}"
          on:click={() => todo.completed = !todo.completed} checked={todo.completed}
        />
        <label for="todo-{todo.id}" class="todo-label">
          {todo.name}
        </label>
      </div>

      <div class="btn-group">
        <!-- {#if todo. -->
        <button type="button" class="btn">
          Edit
          <span class="visually-hidden">{todo.name}</span>
        </button>
        <button type="button" class="btn btn__danger" on:click={() => removeTodo(todo)}>
          Delete
          <span class="visually-hidden">{todo.name}</span>
        </button>

        <!-- <button class="btn todo-cancel" type="button">
          Cancel
          <span class="visually-hidden">renaming 'Create a Svelte starter app'</span>
        </button>
        <button class="btn btn__primary todo-edit" type="submit">
          Save
          <span class="visually-hidden">new name for 'Create a Svelte starter app'</span>
        </button> -->

      </div>
    </div>
  </li>
  {:else}
    <li>Nothing to do here!</li>
  {/each}
</ul>

<hr />

  <!-- MoreActions -->
  <div class="btn-group">
    <button type="button" class="btn btn__primary">Check all</button>
    <button type="button" class="btn btn__primary">Remove completed</button>
  </div>
</div>
