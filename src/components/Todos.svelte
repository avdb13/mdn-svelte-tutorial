<script lang="ts">
  import type { TodoType } from '../types/todo.type';
  import type { SvelteComponent } from 'svelte';

  import MoreActions from './MoreActions.svelte';
  import FilterButton from './FilterButton.svelte';
  import Todo from './Todo.svelte';
  import NewTodo from './NewTodo.svelte';
  import TodosStatus from './TodosStatus.svelte';
  import { alert } from '../stores';

  export let todos: TodoType[];

  let todosStatus: SvelteComponent;
  let newTodoId: number;
  let filter: string = "all";

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  const removeTodo = (todo: Todo) => {
    todos = todos.filter(t => t.id !== todo.id)
    todosStatus.focus();
  }

  const addTodo = (name: string) => {
    todos = [{ id: newTodoId, name, completed: false }, ...todos];
    $alert = `Todo '${name}' has been added ^-^`;
  }

  const filterTodos = (filter: string, todos: TodoType[]): TodoType[] => {
    if (filter === "active") {
      return todos.filter(t => !t.completed)
    } else if (filter === "completed") {
      return todos.filter(t => t.completed)
    }
    return todos
  }

  const updateTodo = (todo: TodoType) => {
    const i = todos.findIndex(t => t.id === todo.id);
    todos[i] = {...todos[i], ...todo};
  }

  const checkAllTodos = (completed: boolean) => {
    todos = todos.map(t => ({...t, completed }));
  }

  const removeCompletedTodos = () => {
    todos = todos.filter(t => !t.completed);
  }
</script>

<h1>Svelte to-do list</h1>

<div class="todoapp stack-large">
  <NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />
  <FilterButton bind:filter />
  <TodosStatus {todos} bind:this={todosStatus} />

  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
    <li class="todo">
      <Todo
        {todo}
        on:remove={(e) => removeTodo(e.detail)}
        on:update={(e) => updateTodo(e.detail)}
      />
    </li>
    {:else}
      <li>Nothing to do here!</li>
    {/each}
  </ul>
  <hr />

  <MoreActions
    {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />
</div>
