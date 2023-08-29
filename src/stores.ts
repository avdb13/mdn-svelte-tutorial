import { writable } from 'svelte/store';
import { localStore } from './localStore';

export const alert = writable("welcome to to-do list app! =3=");

const initialTodos = [
    {id: 1, name: "Create a Svelte starter app", completed: true},
    {id: 2, name: "Complete the rest of the tutorial", completed: false},
  ];

export const todos = localStore("mdn-svelte-todo", initialTodos);
